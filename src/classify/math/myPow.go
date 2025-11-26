// 快速幂（幂有负数的情况）
package main

func myPow(x float64, n int) float64 {
	ans := 1.0
	if n < 0 { // x^-n = (1/x)^n
		n = -n
		x = 1 / x
	}
	for n > 0 { // 从低到高枚举 n 的每个比特位
		if n&1 > 0 { // 这个比特位是 1
			ans *= x // 把 x 乘到 ans 中
		}
		x *= x  // x 自身平方
		n >>= 1 // 继续枚举下一个比特位
	}
	return ans
}
