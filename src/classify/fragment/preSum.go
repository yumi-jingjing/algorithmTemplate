// 前缀和
package main

n := len(nums)
prefix := make([]int, n+1)
for i, x := range nums {
	prefix[i+1] = prefix[i] + x
}