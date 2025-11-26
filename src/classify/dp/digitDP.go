// 数位DP
package main

import "strconv"

// 代码示例：返回 [low, high] 中的恰好包含 target 个 0 的数字个数
// 比如 digitDP(0, 10, 1) == 2
// 要点：我们统计的是 0 的个数，需要区分【前导零】和【数字中的零】，前导零不能计入，而数字中的零需要计入
func digitDP(low, high int, target int) int {
	lowS := strconv.Itoa(low)
	highS := strconv.Itoa(high)
	n := len(highS)
	diffLH := n - len(lowS)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, target+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}

	var dfs func(int, int, bool, bool) int
	dfs = func(i, cnt0 int, limitLow, limitHigh bool) (res int) {
		// 不合法
		if cnt0 > target {
			return 0
		}
		if i == n {
			// 不合法
			if cnt0 < target {
				return 0
			}
			// 合法
			return 1
		}
		if !limitLow && !limitHigh {
			p := &memo[i][cnt0]
			if *p >= 0 {
				return *p
			}
			defer func() { *p = res }()
		}

		lo := 0
		if limitLow && i >= diffLH {
			lo = int(lowS[i-diffLH] - '0')
		}
		hi := 9
		if limitHigh {
			hi = int(highS[i] - '0')
		}

		d := lo
		// 通过 limitLow 和 i 可以判断能否不填数字，无需 isNum 参数
		// 如果前导零不影响答案，去掉这个 if block
		if limitLow && i < diffLH {
			// 不填数字，上界不受约束
			res = dfs(i+1, 0, true, false)
			d = 1
		}

		for ; d <= hi; d++ {
			c0 := cnt0
			if d == 0 {
				c0++ // 统计 0 的个数
			}
			res += dfs(i+1, c0, limitLow && d == lo, limitHigh && d == hi)
			// res %= mod
		}
		return
	}

	return dfs(0, 0, true, true)
}
