# Algorithm Template

一个简单实用的 VSCode 插件，用于快速插入算法模板代码片段。

## ✨ 功能特性

- 🚀 **快速插入**：输入 `// abs` 即可自动插入函数模板
- 📝 **代码补全**：支持空格键触发，显示详细说明
- 🎯 **专注 Go 语言**：专为 Go 开发者设计
- 🔧 **易于扩展**：可以轻松添加更多算法模板

## 📖 使用方法

1. 在 Go 文件中输入 `// abs`（或 `// abs`，支持有空格或没有空格）
2. 按下**空格键**
3. 插件会自动将注释替换为对应的函数模板代码
4. 补全提示会显示模板的详细说明

### 示例

输入：
```go
// abs
```

按空格后自动变成：
```go
func abs(a int) int {
  if a < 0 {
    return -a
  }
  return a
}
```

## 📚 所有可用的模板 Key

### 基础函数

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `abs` | 计算绝对值 | `// abs` |
| `b2i` | 布尔值转整数（true→1, false→0） | `// b2i` |
| `gcd` | 最大公约数（欧几里得算法） | `// gcd` |
| `lcm` | 最小公倍数（包含 gcd 函数） | `// lcm` |

### 方向数组

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `dir4` | 四方向数组（上下左右） | `// dir4` |
| `dir8` | 八方向数组（包含对角线） | `// dir8` |

### 堆（Heap）

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `hp arr less than` | 整数堆（从小到大，基于 sort.IntSlice） | `// hp arr less than` |
| `hp arr larger than` | 整数堆（从大到小，基于 sort.IntSlice） | `// hp arr larger than` |
| `hp common` | 通用堆（存储 pair 结构，按频率排序） | `// hp common` |

### 记忆化（Memoization）

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `memo one init` | 一维记忆化搜索初始化 | `// memo one init` |
| `memo one` | 一维记忆化搜索应用 | `// memo one` |
| `memo two init` | 二维记忆化搜索初始化 | `// memo two init` |
| `memo two` | 二维记忆化搜索应用 | `// memo two` |
| `memo three init` | 三维记忆化搜索初始化 | `// memo three init` |
| `memo three` | 三维记忆化搜索应用 | `// memo three` |

### 并查集（Union Find）

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `union` | 并查集（包含路径压缩、按大小合并） | `// union` |

### 质数相关

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `isPrime` | 判断是否为质数（简单方法） | `// isPrime` |
| `prime init` | 质数预处理（埃氏筛，包含 isPrime 函数） | `// prime init` |
| `lpf` | 最小质因子预处理（Least Prime Factor） | `// lpf` |
| `primeFactors` | 质因子列表预处理 | `// primeFactors` |

### 快速幂

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `pow` | 快速幂（整数，带模数） | `// pow` |
| `myPow` | 快速幂（浮点数） | `// myPow` |

### 二分查找

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `binary min` | 二分猜答案：求最小 | `// binary min` |
| `binary max` | 二分猜答案：求最大 | `// binary max` |

### 工具函数

| Key | 说明 | 示例输入 |
|-----|------|----------|
| `atoi` | 手动字符串转整数（性能优化版本） | `// atoi` |

## 💡 使用技巧

1. **支持空格**：`// abs` 和 `// abs` 都可以使用
2. **包含空格的 Key**：对于包含空格的 key（如 `hp arr larger than`），需要完整输入：
   ```go
   // hp arr larger than
   ```
   然后按空格键

3. **完全匹配**：Key 必须完全匹配模板中定义的名称，区分大小写

4. **查看说明**：按空格键触发补全时，会显示每个模板的详细说明，帮助你选择正确的模板

## 🎬 完整示例

### 示例 1：使用基础函数

```go
// 输入
// abs

// 按空格后
func abs(a int) int {
  if a < 0 {
    return -a
  }
  return a
}
```

### 示例 2：使用记忆化

```go
// 输入
// memo two init

// 按空格后
  memo := make([][]int, m)
  for i := range memo {
    memo[i] = make([]int, n)
    for j := range memo[i] {
      memo[i][j] = -1
    }
  }
```

### 示例 3：使用堆

```go
// 输入
// hp arr larger than

// 按空格后
type hp struct{ sort.IntSlice }
// 从大到小
func (h hp) Less(i, j int) bool { return h.IntSlice[i] > h.IntSlice[j] }
func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
  a := h.IntSlice
  v := a[len(a)-1]
  h.IntSlice = a[:len(a)-1]
  return v
}
```

## 🔧 开发步骤

### 第一步：安装依赖

```bash
npm install
```

### 第二步：编译 TypeScript

```bash
npm run compile
```

或者使用监听模式（自动编译）：

```bash
npm run watch
```

### 第三步：调试插件

1. 按 `F5` 键打开新的 VSCode 窗口（Extension Development Host）
2. 在新窗口中打开一个 Go 文件
3. 输入 `// abs` 并测试功能

### 第四步：打包插件

```bash
npm install -g @vscode/vsce
vsce package
```

这会生成一个 `.vsix` 文件，可以安装到 VSCode 中。

## 📝 添加新模板

在 `src/templates.ts` 文件中添加新的模板：

```typescript
export const algorithmTemplates: { [key: string]: Template } = {
  'abs': {
    description: '计算绝对值',
    code: `func abs(a int) int { ... }`
  },
  'newTemplate': {
    description: '新模板的说明',
    code: `func newTemplate() { ... }` // 添加新模板
  },
};
```

**注意**：每个模板需要包含 `description`（说明）和 `code`（代码）两个字段。

添加后，重新编译代码即可使用。

## 📁 文件结构

```
algorithmTemplate/
├── src/
│   ├── extension.ts      # 插件主代码
│   └── templates.ts      # 算法模板定义（包含说明）
├── package.json          # 插件配置
├── tsconfig.json         # TypeScript 配置
└── README.md            # 说明文档
```

## 📦 发布

详细的发布步骤请参考 `完整发布步骤.md` 文件。

## 📄 许可证

MIT License
