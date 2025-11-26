// 判断质数
package main

// 时间复杂度 O(sqrt(n))
func isPrime(n int) bool {
	for i := 2; i*i <= n; i++ {
		if n%i == 0 {
			return false
		}
	}
	return n >= 2 // 1 不是质数
}
