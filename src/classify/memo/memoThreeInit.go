// 三维记忆化搜索初始化
package main
memo := make([][][]int, n)
for i := range memo {
	memo[i] = make([][]int, m)
	for j := range memo[i] {
		memo[i][j] = make([]int, k)
		for l := range memo[i][j] {
			memo[i][j][l] = -1
		}
	}
}