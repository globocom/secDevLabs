
package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"fmt"
	"math/big"
	"net"
	"os"
	"path/filepath"
	"time"
)

// generate-certs.go generates a self-signed TLS certificate and its private key
// for local development.
//
// AUTOMATIC SETUP:
// The Makefile's "install" target runs this program before starting Docker.
// You do not need to run this program manually when using "make install".
//
// GENERATION FLOW:
// 1. Create deployments/tls-files/ if it does not exist.
// 2. If both server.crt and server.key exist, keep them unchanged.
// 3. If neither file exists, generate a new certificate and private key.
// 4. If only one file exists, regenerate the complete pair.
//
// SECURITY NOTES:
// - deployments/tls-files/ should be ignored by Git.
// - Each person cloning the project generates their own certificate and key.
// - Never publish or commit server.key.
// - Browsers may show a trust warning because the certificate is self-signed.
// - This certificate is intended for local development, not production.

func main() {
	certDir := filepath.Join("deployments", "tls-files")
	certPath := filepath.Join(certDir, "server.crt")
	keyPath := filepath.Join(certDir, "server.key")

	_, certErr := os.Stat(certPath)
	_, keyErr := os.Stat(keyPath)

	certExists := certErr == nil
	keyExists := keyErr == nil

	if certErr != nil && !os.IsNotExist(certErr) {
		fmt.Fprintf(os.Stderr, "Could not check certificate: %v\n", certErr)
		os.Exit(1)
	}

	if keyErr != nil && !os.IsNotExist(keyErr) {
		fmt.Fprintf(os.Stderr, "Could not check private key: %v\n", keyErr)
		os.Exit(1)
	}

	if certExists && keyExists {
		fmt.Println("TLS certificate and private key already exist; keeping them.")
		return
	}

	if certExists != keyExists {
		fmt.Println("Only one TLS file exists; regenerating the certificate and private key.")
	}

	if err := os.MkdirAll(certDir, 0700); err != nil {
		fmt.Fprintf(os.Stderr, "Could not create certificate directory: %v\n", err)
		os.Exit(1)
	}

	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not generate private key: %v\n", err)
		os.Exit(1)
	}

	serialLimit := new(big.Int).Lsh(big.NewInt(1), 128)
	serialNumber, err := rand.Int(rand.Reader, serialLimit)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not generate certificate serial number: %v\n", err)
		os.Exit(1)
	}

	now := time.Now()
	template := x509.Certificate{
		SerialNumber: serialNumber,
		Subject: pkix.Name{
			CommonName: "localhost",
		},
		NotBefore:             now.Add(-5 * time.Minute),
		NotAfter:              now.AddDate(1, 0, 0),
		KeyUsage:              x509.KeyUsageDigitalSignature | x509.KeyUsageKeyEncipherment,
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageServerAuth},
		BasicConstraintsValid: true,
		DNSNames:              []string{"localhost"},
		IPAddresses: []net.IP{
			net.ParseIP("127.0.0.1"),
			net.ParseIP("::1"),
		},
	}

	certificateDER, err := x509.CreateCertificate(
		rand.Reader,
		&template,
		&template,
		&privateKey.PublicKey,
		privateKey,
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not create certificate: %v\n", err)
		os.Exit(1)
	}

	certFile, err := os.OpenFile(
		certPath,
		os.O_WRONLY|os.O_CREATE|os.O_TRUNC,
		0644,
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not create certificate file: %v\n", err)
		os.Exit(1)
	}

	if err := pem.Encode(certFile, &pem.Block{
		Type:  "CERTIFICATE",
		Bytes: certificateDER,
	}); err != nil {
		_ = certFile.Close()
		fmt.Fprintf(os.Stderr, "Could not write certificate: %v\n", err)
		os.Exit(1)
	}

	if err := certFile.Close(); err != nil {
		fmt.Fprintf(os.Stderr, "Could not close certificate file: %v\n", err)
		os.Exit(1)
	}

	keyFile, err := os.OpenFile(
		keyPath,
		os.O_WRONLY|os.O_CREATE|os.O_TRUNC,
		0600,
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not create private key file: %v\n", err)
		os.Exit(1)
	}

	if err := pem.Encode(keyFile, &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(privateKey),
	}); err != nil {
		_ = keyFile.Close()
		fmt.Fprintf(os.Stderr, "Could not write private key: %v\n", err)
		os.Exit(1)
	}

	if err := keyFile.Close(); err != nil {
		fmt.Fprintf(os.Stderr, "Could not close private key file: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("TLS certificate created: %s\n", certPath)
	fmt.Printf("TLS private key created: %s\n", keyPath)
	fmt.Println("Keep the private key secret; do not commit it to Git.")
}
