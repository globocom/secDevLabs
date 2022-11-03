package api

import (
	"fmt"
	"io"
	"net"
	"net/http"
	"net/url"
	"strings"

	"github.com/labstack/echo"
)

type missingSecurityHeaders struct {
	ContentSecurityPolicy bool
	XFrameOptions         bool
	XContentTypeOptions   bool
	ReferrerPolicy        bool
	PermissionsPolicy     bool
}

// Index renders the home page.
func Index(c echo.Context) error {
	return c.Render(http.StatusOK, "index.html", map[string]interface{}{})
}

// SiteCheckPage renders page with results about headers check.
func SiteCheckPage(c echo.Context) error {
	target := c.FormValue("target")
	if !strings.Contains(target, "http") {
		target = "http://" + target
	}

	domain, ips := lookupIPDomain(target)
	headers, missing, body := httpGet(target)
	return c.Render(http.StatusOK, "check.html", map[string]interface{}{
		"target":     target,
		"domain":     domain,
		"ips":        ips,
		"headers":    headers,
		"secHeaders": missing,
		"body":       body,
	})
}

func lookupIPDomain(target string) (string, string) {
	domain, err := url.Parse(target)
	if err != nil {
		fmt.Println("URL parser error:", err)
	}

	iprecords, err := net.LookupIP(domain.Hostname())
	if err != nil {
		fmt.Println("LookupIP error:", err)
	}

	var ips string
	for i, ip := range iprecords {
		if i != 0 {
			ips = ips + ", "
		}
		ips = ips + ip.String()
	}

	return domain.Hostname(), ips
}

func verifySecurityHeaders(rawHeaders map[string]string) missingSecurityHeaders {
	var missing missingSecurityHeaders

	if _, ok := rawHeaders["Content-Security-Policy"]; !ok {
		missing.ContentSecurityPolicy = true
	}

	if _, ok := rawHeaders["X-Frame-Options"]; !ok {
		missing.XFrameOptions = true
	}

	if _, ok := rawHeaders["X-Content-Type-Options"]; !ok {
		missing.XContentTypeOptions = true
	}

	if _, ok := rawHeaders["Referrer-Policy"]; !ok {
		missing.ReferrerPolicy = true
	}

	if _, ok := rawHeaders["Permissions-Policy"]; !ok {
		missing.PermissionsPolicy = true
	}

	return missing
}

func httpGet(url string) (map[string]string, missingSecurityHeaders, string) {
	rawHeader := make(map[string]string)

	res, err := http.Get(url)
	if err != nil {
		fmt.Println("HTTP: HTTP GET request error:", err)
		return nil, missingSecurityHeaders{}, ""
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		fmt.Println("HTTP: Unexpect response status:", res.Status)
	}

	for k, v := range res.Header {
		rawHeader[k] = strings.Join(v, ", ")
	}

	missing := verifySecurityHeaders(rawHeader)

	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println("HTTP: Read body error:", err)
	}

	return rawHeader, missing, string(bodyBytes)
}
