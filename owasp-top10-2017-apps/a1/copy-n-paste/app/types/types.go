package types

import (
	"errors"
	"regexp"
)

//LoginAttempt is the struct for users attempting to login
type LoginAttempt struct {
	ID   string `json:"id"`
	User string `json:"user"`
	Pass string `json:"pass"`
}

//Validate LoginAttempt  struct
func (la *LoginAttempt) Validate() error {
	match, _ := regexp.Match("[^[:alnum:].]+", []byte(la.User))
	if match != false {
		return errors.New("username must contain only dot(.) and alphanumerics")
	}
	return nil
}

//RegisterAttempt is the struct for users attempting to register
type RegisterAttempt struct {
	User      string `json:"user"`
	Pass      string `json:"pass"`
	PassCheck string `json:"passcheck"`
}

//Validate RegisterAttempt struct
func (ra *RegisterAttempt) Validate() error {
	match, _ := regexp.Match("[^[:alnum:].]+", []byte(ra.User))
	if match != false {
		return errors.New("username must contain only dot(.) and alphanumerics(.)")
	}
	return nil
}
