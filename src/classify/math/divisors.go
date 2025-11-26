// 预处理每个数的所有因子
package main

const mx = 1_000_001 // **根据题目调整**

var divisors [mx][]int // 如果 mx 很大可能会 MLE，可以改成 int32

func init() {
	for i := 1; i < mx; i++ {
		for j := i; j < mx; j += i { // 枚举 i 的倍数 j
			divisors[j] = append(divisors[j], i) // i 是 j 的因子
		}
	}
}
