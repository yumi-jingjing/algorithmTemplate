// 质因子预处理
package main

const mx = 1_000_001

var primeFactors = [mx][]int{}

func init() {
	for i := 2; i < mx; i++ {
		if primeFactors[i] == nil { // i 是质数
			for j := i; j < mx; j += i { // i 的倍数 j 有质因子 i
				primeFactors[j] = append(primeFactors[j], i)
			}
		}
	}
}
