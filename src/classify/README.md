# 模板文件说明

## 📁 目录结构

模板文件按分类存放在不同的文件夹中，每个分类对应一种算法或数据结构类型：

| 分类文件夹 | 说明 |
|-----------|------|
| `base/` | 基础函数 |
| `binary/` | 二分查找 |
| `bit/` | 位运算 |
| `commonDataStructures/` | 常用数据结构 |
| `dir/` | 方向数组 |
| `dp/` | 动态规划 |
| `graphTheory/` | 图论算法 |
| `math/` | 数学相关 |
| `memo/` | 记忆化搜索 |
| `monotonicStack/` | 单调栈 |
| `tree/` | 二叉树相关 |

### 详细文件列表

#### `base/` - 基础函数
- `abs.go` - 计算绝对值
- `b2i.go` - 布尔值转整数（true→1, false→0）
- `sortFunc.go` - 自定义排序

#### `binary/` - 二分查找
- `binaryMin.go` - 二分最小值
- `binaryMax.go` - 二分最大值

#### `bit/` - 位运算
- `logTrick.go` - 位运算的log trick技巧
- `xorBasis.go` - 异或基（线性基）

#### `commonDataStructures/` - 常用数据结构
- `fenwick.go` - 树状数组
- `segmentTree.go` - 线段树
- `lazeSegmentTree.go` - 懒惰线段树
- `sparseTable.go` - 稀疏表（ST表）
- `unionFind.go` - 并查集
- `weightUnionFind.go` - 带权并查集
- `lazyHeap.go` - 懒删除堆
- `maxSlidingWindow.go` - 单调双端队列

#### `dir/` - 方向数组
- `dir4.go` - 四方向数组（上下左右）

#### `dp/` - 动态规划
- `digitDP.go` - 数位DP

#### `graphTheory/` - 图论算法
- `bfs.go` - 用BFS求最短路
- `dfs.go` - 用DFS找连通块、判断是否有环
- `dijkstra.go` - 用Dijkstra求最短路
- `floyd.go` - 用Floyd求所有点对之间的最短路
- `kruskal.go` - 用Kruskal求最小生成树
- `topologicalSort.go` - 拓扑排序
- `bipart.go` - 判断二分图

#### `math/` - 数学相关
- `isPrime.go` - 判断质数
- `primeInit.go` - 质数预处理
- `lpf.go` - 最小质因子预处理
- `primeFactors.go` - 质因子预处理
- `divisors.go` - 预处理每个数的所有因子
- `lcm.go` - 预处理两个数的最大公约数和最小公倍数
- `palindromes.go` - 预处理回文数

#### `memo/` - 记忆化搜索
- `memoOneInit.go` - 一维记忆化搜索初始化

#### `monotonicStack/` - 单调栈
- `nearestGreater.go` - 单调栈求最近更大元素

#### `tree/` - 树算法
- `lca.go` - 最近公共祖先

## 📝 文件格式

每个 `.go` 文件遵循以下格式：

1. **第一行**：必须是注释，作为模板的描述（description）
2. **第二行**：`package main`（确保 Go 文件不报错）
3. **其余行**：Go 代码，作为模板的实际代码（code）

### 示例

**文件：`base/abs.go`**
```go
// 计算绝对值
package main

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
```

**注意**：如果文件中没有 `package` 声明，生成脚本会自动添加 `package main`。

## 🔑 Key 命名规则

- 文件名（去掉 `.go` 扩展名）就是模板的 key
- 例如：`binaryMin.go` → key 为 `binaryMin`
- 建议使用驼峰命名（如 `binaryMin`），保持原样

## ➕ 添加新模板

1. **选择分类文件夹**：根据模板类型选择对应的文件夹
   - 基础函数 → `base/`
   - 二分查找 → `binary/`
   - 位运算 → `bit/`
   - 数据结构 → `commonDataStructures/`
   - 图论算法 → `graphTheory/`
   - 数学相关 → `math/`
   - 其他分类...

2. **创建 Go 文件**：在对应分类文件夹下创建 `.go` 文件
   - 文件名就是模板的 key
   - 例如：`binaryMin.go` → key 为 `binaryMin`

3. **编写模板内容**：
   ```go
   // 第一行注释作为模板描述
   package main
   
   func yourTemplate() {
       // 这里是实际的代码
   }
   ```

4. **自动生成**：运行 `npm run generate` 或 `npm run compile` 自动生成模板

**提示**：如果忘记写 `package main`，生成脚本会自动添加。

## 🔄 自动生成

运行以下命令会自动从 `classify` 文件夹生成 `templates.ts`：

```bash
npm run generate
```

或者在编译时自动生成：

```bash
npm run compile
```

## ⚠️ 注意事项

- 第一行必须是注释，否则会使用文件名作为描述
- 建议第二行写 `package main`，确保 Go 文件不报错（如果忘记写，脚本会自动添加）
- 代码中不要包含模板字符串语法（反引号和 `${}`），脚本会自动转义
- 文件名就是模板的 key，建议使用驼峰命名（如 `binaryMin`）
- 生成的模板代码不包含 `package main` 和 `import`，可以直接插入使用
