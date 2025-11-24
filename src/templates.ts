// 算法模板类型定义
export interface Template {
  code: string;
  description: string;
}

// 算法模板映射表
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
  'b2i': {
    description: '布尔值转整数（true→1, false→0）',
    code: `func b2i(b bool) int {
  if b {
    return 1
  }
  return 0
}`
  },
  'gcd': {
    description: '最大公约数（欧几里得算法）',
    code: `func gcd(a, b int) int {
  for a != 0 {
    a, b = b%a, a
  }
  return b
}`
  },
  'lcm': {
    description: '最小公倍数（包含 gcd 函数）',
    code: `func gcd(a, b int) int {
  for a != 0 {
    a, b = b%a, a
  }
  return b
}
func lcm(a int, b int) int {
  return a / gcd(a, b) * b
}`
  },
  'dir4': {
    description: '四方向数组（上下左右）',
    code: `type pair struct{ x, y int }
var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}`
  },
  'dir8': {
    description: '八方向数组（包含对角线）',
    code: `type pair struct{ x, y int }
var dir8 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, 1}, {1, -1}, {1, 1}, {-1, -1}}`
  },
  'hp arr less than': {
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
  'hp arr larger than': {
    description: '整数堆（从大到小，基于 sort.IntSlice）',
    code: `type hp struct{ sort.IntSlice }
// 从大到小
func (h hp) Less(i, j int) bool { return h.IntSlice[i] > h.IntSlice[j] }
func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
  a := h.IntSlice
  v := a[len(a)-1]
  h.IntSlice = a[:len(a)-1]
  return v
}`
  },
  'hp common': {
    description: '通用堆（存储 pair 结构，按频率排序）',
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
  'memo one init': {
    description: '一维记忆化搜索初始化',
    code: `  memo := make([]int, n)
  for i := range memo {
    memo[i] = -1
  }`
  },
  'memo one': {
    description: '一维记忆化搜索应用',
    code: `p := &memo[i]
if *p != -1 {
  return *p
}
defer func() {
  *p = res
}()`
  },
  'memo two init': {
    description: '二维记忆化搜索初始化',
    code: `  memo := make([][]int, m)
  for i := range memo {
    memo[i] = make([]int, n)
    for j := range memo[i] {
      memo[i][j] = -1
    }
  }`
  },
  'memo two': {
    description: '二维记忆化搜索应用',
    code: `p := &memo[i][j]
if *p != -1 {
  return *p
}
defer func() {
  *p = res
}()`
  },
  'memo three init': {
    description: '三维记忆化搜索初始化',
    code: `  memo := make([][][]int, m)
  for i := range memo {
    memo[i] = make([][]int, n)
    for j := range memo[i] {
      memo[i][j] = make([]int, u)
      for k := range memo[i][j] {
        memo[i][j][k] = -1
      }
    }
  }`
  },
  'memo three': {
    description: '三维记忆化搜索应用',
    code: `p := &memo[i][j][x]
if *p != -1 {
  return *p
}
defer func() {
  *p = res
}()`
  },
  'union': {
    description: '并查集（包含路径压缩、按大小合并）',
    code: `// 链接 https://leetcode.cn/discuss/post/mOr1u6/
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
    u.fa[x] = y // 合并集合。修改后就可以认为 from 和 to 在同一个集合了
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
  'isPrime': {
    description: '判断是否为质数（简单方法）',
    code: `func isPrime(n int) bool {
  for i := 2; i*i <= n; i++ {
    if n%i == 0 {
      return false
    }
  }
  return n >= 2
}`
  },
  'atoi': {
    description: '手动字符串转整数（性能优化版本）',
    code: `// 手动转 int 快一些
func atoi(s []byte) (res int) {
  for _, b := range s {
    res = res*10 + int(b&15)
  }
  return
}`
  },
  'prime init': {
    description: '质数预处理（埃氏筛，包含 isPrime 函数）',
    code: `const mx = 100_000

var np = [mx + 1]bool{true, true}
var primeNumbers []int

func init() {
  for i := 2; i <= mx; i++ {
    if !np[i] {
      primeNumbers = append(primeNumbers, i)
      for j := i * i; j <= mx; j += i {
        // 质数=false，非质数=true
        np[j] = true
      }
    }
  }
}

func isPrime(n int) bool {
  if n <= mx {
    return !np[n]
  }
  for _, p := range primeNumbers {
    if p*p > n {
      break
    }
    if n%p == 0 {
      return false
    }
  }
  return true
}`
  },
  'lpf': {
    description: '最小质因子预处理（Least Prime Factor）',
    code: `const mx int = 1e5
var lpf [mx + 1]int

func init() {
  for i := 2; i <= mx; i++ {
    if lpf[i] == 0 {
      for j := i; j <= mx; j += i {
        if lpf[j] == 0 {
          lpf[j] = i
        }
      }
    }
  }
}`
  },
  'primeFactors': {
    description: '质因子列表预处理',
    code: `const mx = 1_000_001

var primeFactors = [mx][]int{}

func init() {
  // 预处理每个数的质因子列表，思路同埃氏筛
  for i := 2; i < mx; i++ {
    if primeFactors[i] == nil { // i 是质数
      for j := i; j < mx; j += i { // i 的倍数有质因子 i
        primeFactors[j] = append(primeFactors[j], i)
      }
    }
  }
}`
  },
  'myPow': {
    description: '快速幂（浮点数）',
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
        x *= x // x 自身平方
        n >>= 1 // 继续枚举下一个比特位
    }
    return ans
}`
  },
  'pow': {
    description: '快速幂（整数，带模数）',
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
  'binary min': {
    description: '二分猜答案：求最小',
    code: `    // 二分猜答案：判断 mid 是否满足题目要求
    check := func(mid int) bool {
        
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
  'binary max': {
    description: '二分猜答案：求最大',
    code: `        // 二分猜答案：判断 mid 是否满足题目要求
    check := func(mid int) bool {
        
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
};
