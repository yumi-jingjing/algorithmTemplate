package test

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func lcm(a int, b int) int {
	return a / gcd(a, b) * b
}
