// 预处理回文数
package main

const mx = 10_000_000_000 // 根据题目调整

var palindromes []int

// 预处理 [1,mx] 中的回文数
func init() {
	for base := 1; ; base *= 10 {
		// 生成奇数长度回文数，例如 base = 10，生成的范围是 101 ~ 999
		for i := base; i < base*10; i++ {
			x := i
			for t := i / 10; t > 0; t /= 10 {
				x = x*10 + t%10
			}
			if x > mx {
				return
			}
			palindromes = append(palindromes, x)
		}

		// 生成偶数长度回文数，例如 base = 10，生成的范围是 1001 ~ 9999
		for i := base; i < base*10; i++ {
			x := i
			for t := i; t > 0; t /= 10 {
				x = x*10 + t%10
			}
			if x > mx {
				return
			}
			palindromes = append(palindromes, x)
		}
	}
}
