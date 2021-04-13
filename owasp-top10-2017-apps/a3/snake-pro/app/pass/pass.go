package pass

// CheckPass checks a password
func CheckPass(truePassword, attemptPassword string) bool {
	return truePassword == attemptPassword
}
