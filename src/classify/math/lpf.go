// 最小质因子预处理
package main

const mx = 1_000_001

var lpf = [mx]int{}

func init() {
	for i := 2; i < mx; i++ {
		if lpf[i] == 0 { // i 是质数
			for j := i; j < mx; j += i {
				if lpf[j] == 0 { // 首次访问 j
					lpf[j] = i
				}
			}
		}
	}
}

// 质因数分解
// 例如 primeFactorization(45) = [[3, 2], [5, 1]]，表示 45 = 3^2 * 5^1
// 时间复杂度 O(log x)
func primeFactorization(x int) (res [][2]int) {
	for x > 1 {
		p := lpf[x]
		e := 1
		for x /= p; x%p == 0; x /= p {
			e++
		}
		res = append(res, [2]int{p, e})
	}
	return
}
