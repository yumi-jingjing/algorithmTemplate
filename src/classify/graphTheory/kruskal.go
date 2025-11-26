// 用kruskal求最小生成树
package main

import (
	"math"
	"slices"
)

type unionFind struct {
	fa []int // 代表元
	cc int   // 连通块个数
}

func newUnionFind(n int) unionFind {
	fa := make([]int, n)
	// 一开始有 n 个集合 {0}, {1}, ..., {n-1}
	// 集合 i 的代表元是自己
	for i := range fa {
		fa[i] = i
	}
	return unionFind{fa, n}
}

// 返回 x 所在集合的代表元
// 同时做路径压缩，也就是把 x 所在集合中的所有元素的 fa 都改成代表元
func (u unionFind) find(x int) int {
	// 如果 fa[x] == x，则表示 x 是代表元
	if u.fa[x] != x {
		u.fa[x] = u.find(u.fa[x]) // fa 改成代表元
	}
	return u.fa[x]
}

// 把 from 所在集合合并到 to 所在集合中
// 返回是否合并成功
func (u *unionFind) merge(from, to int) bool {
	x, y := u.find(from), u.find(to)
	if x == y { // from 和 to 在同一个集合，不做合并
		return false
	}
	u.fa[x] = y // 合并集合。修改后就可以认为 from 和 to 在同一个集合了
	u.cc--      // 成功合并，连通块个数减一
	return true
}

// 计算图的最小生成树的边权之和
// 如果图不连通，返回 math.MaxInt
// 节点编号从 0 到 n-1
// 时间复杂度 O(n + mlogm)，其中 m 是 edges 的长度
func mstKruskal(n int, edges [][]int) int {
	slices.SortFunc(edges, func(a, b []int) int { return a[2] - b[2] })

	uf := newUnionFind(n)
	sumWt := 0
	for _, e := range edges {
		x, y, wt := e[0], e[1], e[2]
		if uf.merge(x, y) {
			sumWt += wt
		}
	}

	if uf.cc > 1 { // 图不连通
		return math.MaxInt
	}
	return sumWt
}
