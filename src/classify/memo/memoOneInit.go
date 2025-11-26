// 一维记忆化搜索初始化
package main

memo := make([]int, n)
for i := range memo {
	memo[i] = -1
}