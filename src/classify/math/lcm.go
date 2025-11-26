// 预处理两个数的最大公约数和最小公倍数
package main

func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}

// 推荐先除后乘，尽量避免溢出
func lcm(a, b int) int {
	return a / gcd(a, b) * b
}
