// 算法模板类型定义
export interface Template {
  code: string;
  description: string;
}

// 算法模板映射表（由 scripts/generate-templates.js 自动生成）
export const algorithmTemplates: { [key: string]: Template } = {
  'abs': {
    description: '计算绝对值',
    code: `func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}`
  },

  'aeiou': {
    description: '判断是否为元音字母',
    code: `// const aeiouMask = 1065233
const aeiouMask = 1<<0 | 1<<4 | 1<<8 | 1<<14 | 1<<20
aeiouMask>>(ch-'a')&1 == 1`
  },

  'arrToLink': {
    description: '数组转链表',
    code: `type ListNode struct {
	Val  int
	Next *ListNode
}

// 辅助函数：数组转链表
func arrToLink(nums []int) *ListNode {
	dummy := &ListNode{}
	cur := dummy
	for _, n := range nums {
		cur.Next = &ListNode{Val: n}
		cur = cur.Next
	}
	return dummy.Next
}`
  },

  'atoi': {
    description: '字符串转整数',
    code: `// 手动转 int 快一些
func atoi(s []byte) (res int) {
	for _, b := range s {
		res = res*10 + int(b&15)
	}
	return
}`
  },

  'b2i': {
    description: '布尔值转整数（true→1, false→0）',
    code: `func b2i(b bool) int {
	if b {
		return 1
	}
	return 0
}`
  },

  'bfs': {
    description: '用bfs求最短路',
    code: `// 计算从 start 到各个节点的最短路长度
// 如果节点不可达，则最短路长度为 -1
// 节点编号从 0 到 n-1，边权均为 1
func bfs(n int, edges [][]int, start int) []int {
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x) // 无向图
	}

	dis := make([]int, n)
	for i := range dis {
		dis[i] = -1 // -1 表示尚未访问到
	}
	dis[start] = 0
	q := []int{start}
	for len(q) > 0 {
		x := q[0]
		q = q[1:]
		for _, y := range g[x] {
			if dis[y] < 0 {
				dis[y] = dis[x] + 1
				q = append(q, y)
			}
		}
	}
	return dis
}`
  },

  'bfs01': {
    description: '01bfs',
    code: `// 两个 slice 头对头，模拟 deque
q0 := []pair{{}}
q1 := []pair{}
for len(q0) > 0 || len(q1) > 0 {
	// 弹出队首
	var p pair
	if len(q0) > 0 {
		p, q0 = q0[len(q0)-1], q0[:len(q0)-1]
	} else {
		p, q1 = q1[0], q1[1:]
	}
}`
  },

  'binaryMax': {
    description: '二分最大值',
    code: `// 计算满足 check(x) == true 的最大整数 x{
check := func(mid int) bool {
	// 二分猜答案：判断 mid 是否满足题目要求
		
}

left :=  // 循环不变量：check(left) 恒为 true
right :=  // 循环不变量：check(right) 恒为 false
for left+1 < right {
		mid := left + (right-left)/2
		if check(mid) {
				left = mid // 注意这里更新的是 left，和上面的模板反过来
		} else {
				right = mid
		}
}
// 循环结束后 left+1 = right
// 此时 check(left) == true 而 check(left+1) == check(right) == false
// 所以 left 就是最大的满足 check 的值
return left // check 更新的是谁，最终就返回谁`
  },

  'binaryMin': {
    description: '二分最小值',
    code: `// 计算满足 check(x) == true 的最小整数 x
check := func(mid int) bool {
	// 二分猜答案：判断 mid 是否满足题目要求
		
}

left :=  // 循环不变量：check(left) 恒为 false
right :=  // 循环不变量：check(right) 恒为 true
for left+1 < right { // 开区间不为空
		mid := left + (right-left)/2
if check(mid) { // 说明 check(>= mid 的数) 均为 true
				right = mid // 接下来在 (left, mid) 中二分答案
		} else { // 说明 check(<= mid 的数) 均为 false
				left = mid // 接下来在 (mid, right) 中二分答案
		}
}
// 循环结束后 left+1 = right
// 此时 check(left) == false 而 check(left+1) == check(right) == true
// 所以 right 就是最小的满足 check 的值
return right`
  },

  'bipart': {
    description: '判断二分图',
    code: `// 返回图的二染色
// 如果是二分图，返回每个节点的颜色，用 1 和 2 表示两种颜色
// 如果不是二分图，返回空列表
// 时间复杂度 O(n+m)，n 是点数，m 是边数
func colorBipartite(n int, edges [][]int) []int8 {
	// 建图（节点编号从 0 到 n-1）
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}

	// colors[i] = 0 表示未访问节点 i
	// colors[i] = 1 表示节点 i 为红色
	// colors[i] = 2 表示节点 i 为蓝色
	colors := make([]int8, n)

	var dfs func(int, int8) bool
	dfs = func(x int, c int8) bool {
		colors[x] = c // 节点 x 染成颜色 c
		for _, y := range g[x] {
			// 邻居 y 的颜色与 x 的相同，说明不是二分图，返回 false
			// 或者继续递归，发现不是二分图，返回 false
			if colors[y] == c ||
				colors[y] == 0 && !dfs(y, 3-c) { // 1 和 2 交替染色
				return false
			}
		}
		return true
	}

	// 可能有多个连通块
	for i, c := range colors {
		if c == 0 && !dfs(i, 1) {
			// 从节点 i 开始递归，发现 i 所在连通块不是二分图
			return nil
		}
	}
	return colors
}`
  },

  'buildTree': {
    description: '构建二叉树',
    code: `type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func buildTree(nums []any) *TreeNode {
	if len(nums) == 0 || nums[0] == nil {
		return nil
	}
	root := &TreeNode{Val: nums[0].(int)}
	queue := []*TreeNode{root}
	i := 1
	for i < len(nums) {
		node := queue[0]
		queue = queue[1:]

		if i < len(nums) && nums[i] != nil {
			node.Left = &TreeNode{Val: nums[i].(int)}
			queue = append(queue, node.Left)
		}
		i++

		if i < len(nums) && nums[i] != nil {
			node.Right = &TreeNode{Val: nums[i].(int)}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}`
  },

  'cnt': {
    description: '计数',
    code: `cnt := map[int]int{}`
  },

  'dfs': {
    description: '用dfs找连通块、判断是否有环',
    code: `func solve(n int, edges [][]int) (ans []int) {
	// 节点编号从 0 到 n-1
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x) // 无向图
	}

	vis := make([]bool, n)

	var dfs func(int) int
	dfs = func(x int) int {
		vis[x] = true // 避免重复访问节点
		size := 1
		for _, y := range g[x] {
			if !vis[y] {
				size += dfs(y)
			}
		}
		return size
	}

	// 计算每个连通块的大小
	for i, b := range vis {
		if !b { // i 没有访问过
			size := dfs(i)
			ans = append(ans, size)
		}
	}
	return
}`
  },

  'dfsTree': {
    description: '递归遍历树',
    code: `var dfs func(*TreeNode)
dfs = func(node *TreeNode) {
	if node == nil {
			return
	}
	dfs(node.Left)
	dfs(node.Right)
}
dfs(root)`
  },

  'digitDP': {
    description: '数位DP',
    code: `// 代码示例：返回 [low, high] 中的恰好包含 target 个 0 的数字个数
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
}`
  },

  'dijkstra': {
    description: '用dijkstra求最短路',
    code: `// 返回从起点 start 到每个点的最短路长度 dis，如果节点 x 不可达，则 dis[x] = math.MaxInt
// 要求：没有负数边权
// 时间复杂度 O(n + mlogm)，注意堆中有 O(m) 个元素
func shortestPathDijkstra(n int, edges [][]int, start int) []int {
	// 注：如果节点编号从 1 开始（而不是从 0 开始），可以把 n 加一
	type edge struct{ to, wt int }
	g := make([][]edge, n) // 邻接表
	for _, e := range edges {
		x, y, wt := e[0], e[1], e[2]
		g[x] = append(g[x], edge{y, wt})
		// g[y] = append(g[y], edge{x, wt}) // 无向图加上这行
	}

	dis := make([]int, n)
	for i := range dis {
		dis[i] = math.MaxInt
	}
	dis[start] = 0 // 起点到自己的距离是 0
	// 堆中保存 (起点到节点 x 的最短路长度，节点 x)
	h := &hp{{0, start}}

	for h.Len() > 0 {
		p := heap.Pop(h).(pair)
		disX, x := p.dis, p.x
		if disX > dis[x] { // x 之前出堆过
			continue
		}
		for _, e := range g[x] {
			y := e.to
			newDisY := disX + e.wt
			if newDisY < dis[y] {
				dis[y] = newDisY // 更新 x 的邻居的最短路
				// 懒更新堆：只插入数据，不更新堆中数据
				// 相同节点可能有多个不同的 newDisY，除了最小的 newDisY，其余值都会触发上面的 continue
				heap.Push(h, pair{newDisY, y})
			}
		}
	}

	return dis
}

type pair struct{ dis, x int }
type hp []pair

func (h hp) Len() int           { return len(h) }
func (h hp) Less(i, j int) bool { return h[i].dis < h[j].dis }
func (h hp) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *hp) Push(v any)        { *h = append(*h, v.(pair)) }
func (h *hp) Pop() (v any)      { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }`
  },

  'dir4': {
    description: '四方向数组（上下左右）',
    code: `type pair struct{ x, y int }

var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}`
  },

  'dir8': {
    description: '八方向数组',
    code: `type pair struct{ x, y int }

var dir8 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, 1}, {1, -1}, {1, 1}, {-1, -1}}`
  },

  'dis': {
    description: '初始化距离数组，初始值为无穷大',
    code: `// 初始化距离数组，初始值为无穷大
dis := make([][]int, m)
for i := range dis {
	dis[i] = make([]int, n)
	for j := range dis[i] {
		dis[i][j] = math.MaxInt
	}
}`
  },

  'divisors': {
    description: '预处理每个数的所有因子',
    code: `const mx = 1_000_001 // **根据题目调整**

var divisors [mx][]int // 如果 mx 很大可能会 MLE，可以改成 int32

func init() {
	for i := 1; i < mx; i++ {
		for j := i; j < mx; j += i { // 枚举 i 的倍数 j
			divisors[j] = append(divisors[j], i) // i 是 j 的因子
		}
	}
}`
  },

  'f': {
    description: 'dp 递推需要的二维数组',
    code: `f := make([][]int, m+1)
for i := range f {
	f[i] = make([]int, n+1)
}`
  },

  'fenwick': {
    description: '树状数组',
    code: `// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
type fenwick []int

func newFenwickTree(n int) fenwick {
	return make(fenwick, n+1) // 使用下标 1 到 n
}

// a[i] 增加 val
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) update(i int, val int) {
	for ; i < len(f); i += i & -i {
		f[i] += val
	}
}

// 求前缀和 a[1] + ... + a[i]
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) pre(i int) (res int) {
	for ; i > 0; i &= i - 1 {
		res += f[i]
	}
	return
}

// 求区间和 a[l] + ... + a[r]
// 1 <= l <= r <= n
// 时间复杂度 O(log n)
func (f fenwick) query(l, r int) int {
	if r < l {
		return 0
	}
	return f.pre(r) - f.pre(l-1)
}`
  },

  'floyd': {
    description: '用floyd求所有点对之间的最短路',
    code: `// 返回一个二维列表，其中 (i,j) 这一项表示从 i 到 j 的最短路长度
// 如果无法从 i 到 j，则最短路长度为 math.MaxInt / 2
// 允许负数边权
// 如果计算完毕后，存在 i，使得从 i 到 i 的最短路长度小于 0，说明图中有负环
// 节点编号从 0 到 n-1
// 时间复杂度 O(n^3 + m)，其中 m 是 edges 的长度
func shortestPathFloyd(n int, edges [][]int) [][]int {
	const inf = math.MaxInt / 2 // 防止加法溢出
	f := make([][]int, n)
	for i := range f {
		f[i] = make([]int, n)
		for j := range f[i] {
			f[i][j] = inf
		}
		f[i][i] = 0
	}

	for _, e := range edges {
		x, y, wt := e[0], e[1], e[2]
		f[x][y] = min(f[x][y], wt) // 如果有重边，取边权最小值
		f[y][x] = min(f[y][x], wt) // 无向图
	}

	for k := range n {
		for i := range n {
			if f[i][k] == inf { // 针对稀疏图的优化
				continue
			}
			for j := range n {
				f[i][j] = min(f[i][j], f[i][k]+f[k][j])
			}
		}
	}
	return f
}`
  },

  'hpCommon': {
    description: '整数堆（通用）',
    code: `type pair struct {
	ch   byte
	freq int
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []pair

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照概率从大到小排序
func (h hp) Less(i, j int) bool { return h[i].freq > h[j].freq }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(pair)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }`
  },

  'hpLess': {
    description: '整数堆（从小到大，基于 sort.IntSlice）',
    code: `type hp struct{ sort.IntSlice }

func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}`
  },

  'hpMore': {
    description: '整数堆（从大到小，基于 sort.IntSlice）',
    code: `type hp struct{ sort.IntSlice }

// 从大到小
func (h hp) Less(i, j int) bool  { return h.IntSlice[i] > h.IntSlice[j] }
func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}`
  },

  'isPrime': {
    description: '判断质数',
    code: `// 时间复杂度 O(sqrt(n))
func isPrime(n int) bool {
	for i := 2; i*i <= n; i++ {
		if n%i == 0 {
			return false
		}
	}
	return n >= 2 // 1 不是质数
}`
  },

  'kruskal': {
    description: '用kruskal求最小生成树',
    code: `type unionFind struct {
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
}`
  },

  'lazeSegmentTree': {
    description: '懒惰线段树',
    code: `// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
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
}`
  },

  'lazyHeap': {
    description: '懒删除堆',
    code: `// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
func newLazyHeap() *lazyHeap {
	return &lazyHeap{removeCnt: map[int]int{}}
}

// 懒删除堆（默认是最小堆）
type lazyHeap struct {
	sort.IntSlice
	removeCnt map[int]int // 每个元素剩余需要删除的次数
	size      int         // 堆的实际大小
}

// 必须实现的两个接口
func (h *lazyHeap) Push(v any) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *lazyHeap) Pop() any   { a := h.IntSlice; v := a[len(a)-1]; h.IntSlice = a[:len(a)-1]; return v }

// 加上这行变成最大堆
// func (h *lazyHeap) Less(i, j int) bool { return h.IntSlice[i] > h.IntSlice[j] }

// 删除
func (h *lazyHeap) remove(v int) {
	h.removeCnt[v]++ // 懒删除
	h.size--
}

// 正式执行删除操作
func (h *lazyHeap) applyRemove() {
	for h.removeCnt[h.IntSlice[0]] > 0 {
		h.removeCnt[h.IntSlice[0]]--
		heap.Pop(h)
	}
}

// 查看堆顶
func (h *lazyHeap) top() int {
	h.applyRemove()
	return h.IntSlice[0] // 真正的堆顶
}

// 出堆
func (h *lazyHeap) pop() int {
	h.applyRemove()
	h.size--
	return heap.Pop(h).(int)
}

// 入堆
func (h *lazyHeap) push(v int) {
	if h.removeCnt[v] > 0 {
		h.removeCnt[v]-- // 抵消之前的删除
	} else {
		heap.Push(h, v)
	}
	h.size++
}`
  },

  'lca': {
    description: '最近公共祖先',
    code: `func minimumWeight(edges [][]int, queries [][]int) []int {
	n := len(edges) + 1
	type edge struct{ to, wt int }
	g := make([][]edge, n)
	for _, e := range edges {
		// 如果题目的节点编号从 1 开始，改成 x=e[0]-1 和 y=e[1]-1
		x, y, wt := e[0], e[1], e[2]
		g[x] = append(g[x], edge{y, wt})
		g[y] = append(g[y], edge{x, wt})
	}

	const mx = 17 // bits.Len(uint(n))
	pa := make([][mx]int, n)
	dep := make([]int, n)
	dis := make([]int, n) // 如果是无权树（边权为 1），dis 可以去掉，用 dep 代替

	var dfs func(int, int)
	dfs = func(x, p int) {
		pa[x][0] = p
		for _, e := range g[x] {
			y := e.to
			if y == p {
				continue
			}
			dep[y] = dep[x] + 1
			dis[y] = dis[x] + e.wt
			dfs(y, x)
		}
	}
	dfs(0, -1)

	for i := range mx - 1 {
		for x := range pa {
			p := pa[x][i]
			if p != -1 {
				pa[x][i+1] = pa[p][i]
			} else {
				pa[x][i+1] = -1
			}
		}
	}

	uptoDep := func(x, d int) int {
		for k := uint32(dep[x] - d); k > 0; k &= k - 1 {
			x = pa[x][bits.TrailingZeros32(k)]
		}
		return x
	}

	// 返回 x 和 y 的最近公共祖先（节点编号从 0 开始）
	getLCA := func(x, y int) int {
		if dep[x] > dep[y] {
			x, y = y, x
		}
		y = uptoDep(y, dep[x]) // 使 y 和 x 在同一深度
		if y == x {
			return x
		}
		for i := mx - 1; i >= 0; i-- {
			px, py := pa[x][i], pa[y][i]
			if px != py {
				x, y = px, py // 同时往上跳 2^i 步
			}
		}
		return pa[x][0]
	}

	// 返回 x 到 y 的距离（最短路长度）
	getDis := func(x, y int) int { return dis[x] + dis[y] - dis[getLCA(x, y)]*2 }

	// 以上是 LCA 模板

	ans := make([]int, len(queries))
	for i, q := range queries {
		// ...
	}
	return ans
}`
  },

  'lcm': {
    description: '预处理两个数的最大公约数和最小公倍数',
    code: `func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}

// 推荐先除后乘，尽量避免溢出
func lcm(a, b int) int {
	return a / gcd(a, b) * b
}`
  },

  'linkToArr': {
    description: '链表转数组',
    code: `func linkToArr(head *ListNode) []int {
	arr := []int{}
	for head != nil {
		arr = append(arr, head.Val)
		head = head.Next
	}
	return arr
}`
  },

  'logTrick': {
    description: '位运算的log trick技巧',
    code: `// 对于每个右端点 i，计算所有子数组的或值，打印这些或值的分布范围（子数组左端点范围）
// 时间复杂度 O(nlogU)，其中 U = max(nums)
func logTrick(nums []int) {
	type pair struct{ or, left int } // 子数组或值，最小左端点
	orLeft := []pair{}
	for i, x := range nums {
		// 计算以 i 为右端点的子数组或值
		for j := range orLeft {
			orLeft[j].or |= x // **根据题目修改**
		}
		// x 单独一个数作为子数组
		orLeft = append(orLeft, pair{x, i})

		// 原地去重（相同或值只保留最左边的）
		idx := 1
		for j := 1; j < len(orLeft); j++ {
			if orLeft[j].or != orLeft[j-1].or {
				orLeft[idx] = orLeft[j]
				idx++
			}
		}
		orLeft = orLeft[:idx]

		fmt.Println(i, x)
		for k, p := range orLeft {
			orVal := p.or
			left := p.left
			right := i
			if k < len(orLeft)-1 {
				right = orLeft[k+1].left - 1
			}
			// 对于左端点在 [left, right]，右端点为 i 的子数组，OR 值都是 orVal
			fmt.Println(left, right, orVal)
		}
	}
}`
  },

  'loopGrid': {
    description: '遍历网格',
    code: `for i, rows := range grid {
	for j, col := range rows {
		
	}
}`
  },

  'lpf': {
    description: '最小质因子预处理',
    code: `const mx = 1_000_001

var lpf = [mx]int{}

func init() {
	for i := 2; i < mx; i++ {
		if lpf[i] == 0 { // i 是质数
			for j := i; j < mx; j += i {
				if lpf[j] == 0 { // 首次访问 j
					lpf[j] = i
				}
			}
		}
	}
}

// 质因数分解
// 例如 primeFactorization(45) = [[3, 2], [5, 1]]，表示 45 = 3^2 * 5^1
// 时间复杂度 O(log x)
func primeFactorization(x int) (res [][2]int) {
	for x > 1 {
		p := lpf[x]
		e := 1
		for x /= p; x%p == 0; x /= p {
			e++
		}
		res = append(res, [2]int{p, e})
	}
	return
}`
  },

  'maxSlidingWindow': {
    description: '单调双端队列',
    code: `// 计算 nums 的每个长为 k 的窗口的最大值
// 时间复杂度 O(n)，其中 n 是 nums 的长度
func maxSlidingWindow(nums []int, k int) []int {
	ans := make([]int, len(nums)-k+1) // 窗口个数
	q := []int{}

	for i, x := range nums {
		// 1. 右边入
		for len(q) > 0 && nums[q[len(q)-1]] <= x {
			q = q[:len(q)-1] // 维护 q 的单调性
		}
		q = append(q, i) // 注意保存的是下标，这样下面可以判断队首是否离开窗口

		// 2. 左边出
		left := i - k + 1 // 窗口左端点
		if q[0] < left {  // 队首离开窗口
			q = q[1:] // Go 的切片是 O(1) 的
		}

		// 3. 在窗口左端点处记录答案
		if left >= 0 {
			// 由于队首到队尾单调递减，所以窗口最大值就在队首
			ans[left] = nums[q[0]]
		}
	}

	return ans
}`
  },

  'memoOne': {
    description: '一维记忆化搜索',
    code: `p := &memo[i]
if *p != -1 {
  return *p
}
defer func() {
  *p = res
}()`
  },

  'memoOneInit': {
    description: '一维记忆化搜索初始化',
    code: `memo := make([]int, n)
for i := range memo {
	memo[i] = -1
}`
  },

  'memoThree': {
    description: '三维记忆化搜索',
    code: `p := &memo[i][j][k]
if *p != -1 {
  return *p
}
defer func() {
  *p = res
}()`
  },

  'memoThreeInit': {
    description: '三维记忆化搜索初始化',
    code: `memo := make([][][]int, n)
for i := range memo {
	memo[i] = make([][]int, m)
	for j := range memo[i] {
		memo[i][j] = make([]int, k)
		for l := range memo[i][j] {
			memo[i][j][l] = -1
		}
	}
}`
  },

  'memoTwo': {
    description: '二维记忆化搜索',
    code: `p := &memo[i][j]
if *p != -1 {
  return *p
}
defer func() {
  *p = res
}()`
  },

  'memoTwoInit': {
    description: '二维记忆化搜索初始化',
    code: `memo := make([][]int, n)
for i := range memo {
	memo[i] = make([]int, m)
	for j := range memo[i] {
		memo[i][j] = -1
	}
}`
  },

  'mn': {
    description: '声明行列',
    code: `m, n := len(grid), len(grid[0])`
  },

  'mod': {
    description: '声明取余',
    code: `const mod = 1_000_000_007`
  },

  'myPow': {
    description: '快速幂（幂有负数的情况）',
    code: `func myPow(x float64, n int) float64 {
	ans := 1.0
	if n < 0 { // x^-n = (1/x)^n
		n = -n
		x = 1 / x
	}
	for n > 0 { // 从低到高枚举 n 的每个比特位
		if n&1 > 0 { // 这个比特位是 1
			ans *= x // 把 x 乘到 ans 中
		}
		x *= x  // x 自身平方
		n >>= 1 // 继续枚举下一个比特位
	}
	return ans
}`
  },

  'nearestGreater': {
    description: '单调栈求最近更大元素',
    code: `func nearestGreater(nums []int) ([]int, []int) {
	n := len(nums)
	// left[i] 是 nums[i] 左侧最近的严格大于 nums[i] 的数的下标，若不存在则为 -1
	left := make([]int, n)
	st := []int{-1} // 哨兵
	for i, x := range nums {
		for len(st) > 1 && nums[st[len(st)-1]] <= x { // 如果求严格小于，改成 >=
			st = st[:len(st)-1]
		}
		left[i] = st[len(st)-1]
		st = append(st, i)
	}

	// right[i] 是 nums[i] 右侧最近的严格大于 nums[i] 的数的下标，若不存在则为 n
	right := make([]int, n)
	st = []int{n} // 哨兵
	for i := n - 1; i >= 0; i-- {
		x := nums[i]
		for len(st) > 1 && nums[st[len(st)-1]] <= x {
			st = st[:len(st)-1]
		}
		right[i] = st[len(st)-1]
		st = append(st, i)
	}

	return left, right
}`
  },

  'palindromes': {
    description: '预处理回文数',
    code: `const mx = 10_000_000_000 // 根据题目调整

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
}`
  },

  'pow': {
    description: '快速幂(需要取模的情况)',
    code: `func pow(x, n, mod int) int {
	res := 1
	for ; n > 0; n /= 2 {
		if n%2 > 0 {
			res = res * x % mod
		}
		x = x * x % mod
	}
	return res
}`
  },

  'preSum': {
    description: '前缀和',
    code: `n := len(nums)
prefix := make([]int, n+1)
for i, x := range nums {
	prefix[i+1] = prefix[i] + x
}`
  },

  'primeFactors': {
    description: '质因子预处理',
    code: `const mx = 1_000_001

var primeFactors = [mx][]int{}

func init() {
	for i := 2; i < mx; i++ {
		if primeFactors[i] == nil { // i 是质数
			for j := i; j < mx; j += i { // i 的倍数 j 有质因子 i
				primeFactors[j] = append(primeFactors[j], i)
			}
		}
	}
}`
  },

  'primeInit': {
    description: '质数预处理',
    code: `// 时间复杂度 O(mx * log log mx)
const mx = 1_000_001

var np = [mx]bool{true, true} // 0 和 1 不是质数
var primes []int

func init() {
	for i := 2; i < mx; i++ {
		if !np[i] {
			primes = append(primes, i)
			for j := i * i; j < mx; j += i {
				np[j] = true
			}
		}
	}
}`
  },

  'printBinary': {
    description: '调试输出二进制',
    code: `func PrintlnBinary(mask int, n int) {
	// 打印mask的二进制形式（补全前导0以对齐）
	binStr := strconv.FormatInt(int64(mask), 2)
	// 补全前导0，使二进制长度为n位，方便观察
	if len(binStr) < n {
		binStr = strings.Repeat("0", n-len(binStr)) + binStr
	}
	fmt.Println("mask:", binStr, "(十进制:", mask, ")")
}`
  },

  'range': {
    description: '判断范围',
    code: `if x >= 0 && x < m && y >= 0 && y < n  {
	
}`
  },

  'segmentTree': {
    description: '线段树',
    code: `// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
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
}`
  },

  'sortFunc': {
    description: '自定义排序',
    code: `type pair struct {
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
}`
  },

  'sparseTable': {
    description: '稀疏表（ST表）',
    code: `type sparseTable[T any] struct {
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
}`
  },

  'topologicalSort': {
    description: '拓扑排序',
    code: `// 返回有向无环图（DAG）的其中一个拓扑序
// 如果图中有环，返回 nil
// 节点编号从 0 到 n-1
func topologicalSort(n int, edges [][]int) []int {
	g := make([][]int, n)
	inDeg := make([]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		inDeg[y]++ // 统计 y 的先修课数量
	}

	q := make([]int, 0, n)
	topoOrder := q
	for i, d := range inDeg {
		if d == 0 { // 没有先修课，可以直接上
			q = append(q, i) // 加入学习队列
		}
	}
	for len(q) > 0 {
		x := q[0]
		q = q[1:]
		for _, y := range g[x] {
			inDeg[y]--         // 修完 x 后， y 的先修课数量减一
			if inDeg[y] == 0 { // y 的先修课全部上完
				q = append(q, y) // 加入学习队列
			}
		}
	}

	if cap(q) > 0 { // 图中有环
		return nil
	}
	return topoOrder[:n]
}`
  },

  'unionFind': {
    description: '并查集',
    code: `// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
type unionFind struct {
	fa []int // 代表元
	sz []int // 集合大小
	cc int   // 连通块个数
}

func newUnionFind(n int) unionFind {
	fa := make([]int, n)
	sz := make([]int, n)
	// 一开始有 n 个集合 {0}, {1}, ..., {n-1}
	// 集合 i 的代表元是自己，大小为 1
	for i := range fa {
		fa[i] = i
		sz[i] = 1
	}
	return unionFind{fa, sz, n}
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

// 判断 x 和 y 是否在同一个集合
func (u unionFind) same(x, y int) bool {
	// 如果 x 的代表元和 y 的代表元相同，那么 x 和 y 就在同一个集合
	// 这就是代表元的作用：用来快速判断两个元素是否在同一个集合
	return u.find(x) == u.find(y)
}

// 把 from 所在集合合并到 to 所在集合中
// 返回是否合并成功
func (u *unionFind) merge(from, to int) bool {
	x, y := u.find(from), u.find(to)
	if x == y { // from 和 to 在同一个集合，不做合并
		return false
	}
	u.fa[x] = y        // 合并集合。修改后就可以认为 from 和 to 在同一个集合了
	u.sz[y] += u.sz[x] // 更新集合大小（注意集合大小保存在代表元上）
	// 无需更新 sz[x]，因为我们不用 sz[x] 而是用 sz[find(x)] 获取集合大小，但 find(x) == y，我们不会再访问 sz[x]
	u.cc-- // 成功合并，连通块个数减一
	return true
}

// 返回 x 所在集合的大小
func (u unionFind) size(x int) int {
	return u.sz[u.find(x)] // 集合大小保存在代表元上
}`
  },

  'weightUnionFind': {
    description: '带权并查集',
    code: `// 模板来源 https://leetcode.cn/circle/discuss/mOr1u6/
type unionFind struct {
	fa  []int // 代表元
	dis []int // dis[x] 表示 x 到（x 所在集合的）代表元的距离
}

func newUnionFind(n int) unionFind {
	// 一开始有 n 个集合 {0}, {1}, ..., {n-1}
	// 集合 i 的代表元是自己，自己到自己的距离是 0
	fa := make([]int, n)
	dis := make([]int, n)
	for i := range fa {
		fa[i] = i
	}
	return unionFind{fa, dis}
}

// 返回 x 所在集合的代表元
// 同时做路径压缩
func (u unionFind) find(x int) int {
	if u.fa[x] != x {
		root := u.find(u.fa[x])
		u.dis[x] += u.dis[u.fa[x]] // 递归更新 x 到其代表元的距离
		u.fa[x] = root
	}
	return u.fa[x]
}

// 判断 x 和 y 是否在同一个集合（同普通并查集）
func (u unionFind) same(x, y int) bool {
	return u.find(x) == u.find(y)
}

// 计算从 from 到 to 的相对距离
// 调用时需保证 from 和 to 在同一个集合中，否则返回值无意义
func (u unionFind) getRelativeDistance(from, to int) int {
	u.find(from)
	u.find(to)
	// to-from = (x-from) - (x-to) = dis[from] - dis[to]
	return u.dis[from] - u.dis[to]
}

// 合并 from 和 to，新增信息 to - from = value
// 其中 to 和 from 表示未知量，下文的 x 和 y 也表示未知量
// 如果 from 和 to 不在同一个集合，返回 true，否则返回是否与已知信息矛盾
func (u unionFind) merge(from, to int, value int) bool {
	x, y := u.find(from), u.find(to)
	if x == y { // from 和 to 在同一个集合，不做合并
		// to-from = (x-from) - (x-to) = dis[from] - dis[to] = value
		return u.dis[from]-u.dis[to] == value
	}
	//    x --------- y
	//   /           /
	// from ------- to
	// 已知 x-from = dis[from] 和 y-to = dis[to]，现在合并 from 和 to，新增信息 to-from = value
	// 由于 y-from = (y-x) + (x-from) = (y-to) + (to-from)
	// 所以 y-x = (to-from) + (y-to) - (x-from) = value + dis[to] - dis[from]
	u.dis[x] = value + u.dis[to] - u.dis[from] // 计算 x 到其代表元 y 的距离
	u.fa[x] = y
	return true
}`
  },

  'xorBasis': {
    description: '异或基(线性其)',
    code: `type xorBasis []int

// n 为值域最大值 U 的二进制长度，例如 U=1e9 时 n=30
func newXorBasis(n int) xorBasis {
	return make(xorBasis, n)
}

func (b xorBasis) insert(x int) {
	// 从高到低遍历，保证计算 maxXor 的时候，参与 XOR 的基的最高位（或者说二进制长度）是互不相同的
	for i := len(b) - 1; i >= 0; i-- {
		if x>>i == 0 { // 由于大于 i 的位都被我们异或成了 0，所以 x>>i 的结果只能是 0 或 1
			continue
		}
		if b[i] == 0 { // x 和之前的基是线性无关的
			b[i] = x // 新增一个基，最高位为 i
			return
		}
		x ^= b[i] // 保证每个基的二进制长度互不相同
	}
	// 正常循环结束，此时 x=0，说明一开始的 x 可以被已有基表出，不是一个线性无关基
}

func (b xorBasis) maxXor() (res int) {
	// 从高到低贪心：越高的位，越必须是 1
	// 由于每个位的基至多一个，所以每个位只需考虑异或一个基，若能变大，则异或之
	for i := len(b) - 1; i >= 0; i-- {
		res = max(res, res^b[i])
	}
	return
}`
  }
};
