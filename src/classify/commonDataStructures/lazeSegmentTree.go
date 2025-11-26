// 懒惰线段树
package main

import "math/bits"

// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
// 懒标记初始值
const todoInit int = 0 // **根据题目修改**

type lazySeg []struct {
	val  int // **根据题目修改**
	todo int
}

// 合并两个 val
func (lazySeg) mergeVal(a, b int) int {
	return a + b // **根据题目修改**
}

// 合并两个懒标记
func (lazySeg) mergeTodo(a, b int) int {
	return a + b // **根据题目修改**
}

// 把懒标记作用到 node 子树（本例为区间加）
func (t lazySeg) apply(node, l, r int, todo int) {
	cur := &t[node]
	// 计算 tree[node] 区间的整体变化
	cur.val += todo * (r - l + 1) // **根据题目修改**
	cur.todo = t.mergeTodo(todo, cur.todo)
}

// 线段树维护一个长为 n 的数组（下标从 0 到 n-1），元素初始值为 initVal
func newLazySegmentTree(n int, initVal int) lazySeg {
	a := make([]int, n)
	for i := range a {
		a[i] = initVal
	}
	return newLazySegmentTreeWithArray(a)
}

// 线段树维护数组 a
func newLazySegmentTreeWithArray(a []int) lazySeg {
	n := len(a)
	t := make(lazySeg, 2<<bits.Len(uint(n-1)))
	t.build(a, 1, 0, n-1)
	return t
}

// 把当前节点的懒标记下传给左右儿子
func (t lazySeg) spread(node, l, r int) {
	// 类似「断点续传」，接着完成之前没完成的下传任务
	todo := t[node].todo
	if todo == todoInit { // 没有需要下传的信息
		return
	}
	m := (l + r) / 2
	t.apply(node*2, l, m, todo)
	t.apply(node*2+1, m+1, r, todo)
	t[node].todo = todoInit // 下传完毕
}

// 合并左右儿子的 val 到当前节点的 val
func (t lazySeg) maintain(node int) {
	t[node].val = t.mergeVal(t[node*2].val, t[node*2+1].val)
}

// 用 a 初始化线段树
// 时间复杂度 O(n)
func (t lazySeg) build(a []int, node, l, r int) {
	t[node].todo = todoInit
	if l == r { // 叶子
		t[node].val = a[l] // 初始化叶节点的值
		return
	}
	m := (l + r) / 2
	t.build(a, node*2, l, m)     // 初始化左子树
	t.build(a, node*2+1, m+1, r) // 初始化右子树
	t.maintain(node)
}

// 用 f 更新 [ql, qr] 中的每个 a[i]
// 调用 t.update(1, 0, n-1, ql, qr, f)
// 0 <= ql <= qr <= n-1
// 时间复杂度 O(log n)
func (t lazySeg) update(node, l, r, ql, qr int, f int) {
	if ql <= l && r <= qr { // 当前子树完全在 [ql, qr] 内
		t.apply(node, l, r, f)
		return
	}
	t.spread(node, l, r)
	m := (l + r) / 2
	if ql <= m { // 更新左子树
		t.update(node*2, l, m, ql, qr, f)
	}
	if qr > m { // 更新右子树
		t.update(node*2+1, m+1, r, ql, qr, f)
	}
	t.maintain(node)
}

// 返回用 mergeVal 合并所有 a[i] 的计算结果，其中 i 在闭区间 [ql, qr] 中
// 调用 t.query(1, 0, n-1, ql, qr)
// 0 <= ql <= qr <= n-1
// 时间复杂度 O(log n)
func (t lazySeg) query(node, l, r, ql, qr int) int {
	if ql <= l && r <= qr { // 当前子树完全在 [ql, qr] 内
		return t[node].val
	}
	t.spread(node, l, r)
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
