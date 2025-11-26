// 线段树
package main

import "math/bits"

// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
// 线段树有两个下标，一个是线段树节点的下标，另一个是线段树维护的区间的下标
// 节点的下标：从 1 开始，如果你想改成从 0 开始，需要把左右儿子下标分别改成 node*2+1 和 node*2+2
// 区间的下标：从 0 开始
type seg []struct {
	val int // **根据题目修改**
}

// 合并两个 val
func (seg) mergeVal(a, b int) int {
	return max(a, b) // **根据题目修改**
}

// 线段树维护一个长为 n 的数组（下标从 0 到 n-1），元素初始值为 initVal
func newSegmentTree(n int, initVal int) seg {
	a := make([]int, n)
	for i := range a {
		a[i] = initVal
	}
	return newSegmentTreeWithArray(a)
}

// 线段树维护数组 a
func newSegmentTreeWithArray(a []int) seg {
	n := len(a)
	t := make(seg, 2<<bits.Len(uint(n-1)))
	t.build(a, 1, 0, n-1)
	return t
}

// 合并左右儿子的 val 到当前节点的 val
func (t seg) maintain(node int) {
	t[node].val = t.mergeVal(t[node*2].val, t[node*2+1].val)
}

// 用 a 初始化线段树
// 时间复杂度 O(n)
func (t seg) build(a []int, node, l, r int) {
	if l == r { // 叶子
		t[node].val = a[l] // 初始化叶节点的值
		return
	}
	m := (l + r) / 2
	t.build(a, node*2, l, m)     // 初始化左子树
	t.build(a, node*2+1, m+1, r) // 初始化右子树
	t.maintain(node)
}

// 更新 a[i] 为 mergeVal(a[i], val)
// 调用 t.update(1, 0, n-1, i, val)
// 0 <= i <= n-1
// 时间复杂度 O(log n)
func (t seg) update(node, l, r, i int, val int) {
	if l == r { // 叶子（到达目标）
		// 如果想直接替换的话，可以写 t[o].val = val
		t[node].val = t.mergeVal(t[node].val, val)
		return
	}
	m := (l + r) / 2
	if i <= m { // i 在左子树
		t.update(node*2, l, m, i, val)
	} else { // i 在右子树
		t.update(node*2+1, m+1, r, i, val)
	}
	t.maintain(node)
}

// 返回用 mergeVal 合并所有 a[i] 的计算结果，其中 i 在闭区间 [ql, qr] 中
// 调用 t.query(1, 0, n-1, ql, qr)
// 如果只想获取 a[i]，可以调用 t.query(1, 0, n-1, i, i)
// 0 <= ql <= qr <= n-1
// 时间复杂度 O(log n)
func (t seg) query(node, l, r, ql, qr int) int {
	if ql <= l && r <= qr { // 当前子树完全在 [ql, qr] 内
		return t[node].val
	}
	m := (l + r) / 2
	if qr <= m { // [ql, qr] 在左子树
		return t.query(node*2, l, m, ql, qr)
	}
	if ql > m { // [ql, qr] 在右子树
		return t.query(node*2+1, m+1, r, ql, qr)
	}
	lRes := t.query(node*2, l, m, ql, qr)
	rRes := t.query(node*2+1, m+1, r, ql, qr)
	return t.mergeVal(lRes, rRes)
}
