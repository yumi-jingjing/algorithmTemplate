// 自定义排序
package main

import (
	"cmp"
	"slices"
)

type pair struct {
	v int
	i int
}

// 按照值从小到大排序，如果值相等则按照下标从小到大排序
func sortPairs(a []pair) {
	slices.SortFunc(a, func(x, y pair) int {
		if x.v != y.v {
			return cmp.Compare(x.v, y.v)
		}
		return cmp.Compare(x.i, y.i)
	})
	// 按照v从大到小排序
	slices.SortFunc(a, func(x, y pair) int { return y.v - x.v })
}
