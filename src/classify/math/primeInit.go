// 质数预处理
package main

// 时间复杂度 O(mx * log log mx)
const mx = 1_000_001

var np = [mx]bool{true, true} // 0 和 1 不是质数
var primes []int

func init() {
	for i := 2; i < mx; i++ {
		if !np[i] {
			primes = append(primes, i)
			for j := i * i; j < mx; j += i {
				np[j] = true
			}
		}
	}
}
