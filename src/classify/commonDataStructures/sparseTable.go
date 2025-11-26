// 稀疏表（ST表）
package main

import "math/bits"

type sparseTable[T any] struct {
	st [][]T
	op func(T, T) T
}

// 时间复杂度 O(n * log n)
func newSparseTable[T any](nums []T, op func(T, T) T) sparseTable[T] {
	n := len(nums)
	w := bits.Len(uint(n))
	st := make([][]T, w)
	for i := range st {
		st[i] = make([]T, n)
	}
	copy(st[0], nums)
	for i := 1; i < w; i++ {
		for j := range n - 1<<i + 1 {
			st[i][j] = op(st[i-1][j], st[i-1][j+1<<(i-1)])
		}
	}
	return sparseTable[T]{st, op}
}

// [l, r) 左闭右开，下标从 0 开始
// 返回 op(nums[l:r])
// 时间复杂度 O(1)
func (s sparseTable[T]) query(l, r int) T {
	k := bits.Len(uint(r-l)) - 1
	return s.op(s.st[k][l], s.st[k][r-1<<k])
}
