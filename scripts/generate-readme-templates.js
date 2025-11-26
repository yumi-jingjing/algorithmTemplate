const fs = require('fs');
const path = require('path');

const templatesFile = path.join(__dirname, '../src/templates.ts');
const content = fs.readFileSync(templatesFile, 'utf-8');

// 提取所有模板的 key 和 description
const templates = [];
const regex = /'([^']+)':\s*\{[^}]*description:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
  templates.push({ key: match[1], desc: match[2] });
}

// 分类映射（根据文件夹结构）
const categories = {
  '基础函数': ['abs'],
  '二分查找': ['binaryMin', 'binaryMax'],
  '位运算': ['logTrick', 'xorBasis'],
  '图论算法': ['bfs', 'dfs', 'dijkstra', 'floyd', 'kruskal', 'topologicalSort', 'bipart'],
  '数据结构': ['fenwick', 'segmentTree', 'lazeSegmentTree', 'sparseTable', 'unionFind', 'weightUnionFind', 'lazyHeap', 'maxSlidingWindow'],
  '方向数组': ['dir4'],
  '动态规划': ['digitDP'],
  '数学相关': ['isPrime', 'primeInit', 'lpf', 'primeFactors', 'divisors', 'palindromes', 'lcm'],
  '记忆化搜索': ['memo one init'],
  '单调栈': ['nearestGreater'],
  '树算法': ['lca']
};

// 生成分类列表
let output = '## 📚 所有可用的模板 Key\n\n';
output += '> 💡 **提示**：点击每个模板名称可以展开查看详细代码。使用前缀匹配功能可以快速找到模板，例如输入 `// bi ` 可以匹配 `binaryMin`, `binaryMax`, `bipart`。\n\n';

// 按分类输出
for (const [category, keys] of Object.entries(categories)) {
  output += `### ${category}\n\n`;
  
  const categoryTemplates = templates.filter(t => keys.includes(t.key));
  categoryTemplates.sort((a, b) => a.key.localeCompare(b.key));
  
  for (const template of categoryTemplates) {
    output += `#### \`${template.key}\` - ${template.desc}\n\n`;
    output += `<details>\n<summary>点击查看代码</summary>\n\n`;
    output += `\`\`\`go\n`;
    // 这里需要从 templates.ts 中提取实际的代码
    // 为了简化，先留空，用户可以手动添加或我们后续完善
    output += `// 代码内容请查看 src/templates.ts 或使用插件查看\n`;
    output += `\`\`\`\n\n`;
    output += `</details>\n\n`;
  }
}

// 处理未分类的模板
const categorizedKeys = new Set(Object.values(categories).flat());
const uncategorized = templates.filter(t => !categorizedKeys.has(t.key));
if (uncategorized.length > 0) {
  output += `### 其他\n\n`;
  for (const template of uncategorized) {
    output += `#### \`${template.key}\` - ${template.desc}\n\n`;
    output += `<details>\n<summary>点击查看代码</summary>\n\n`;
    output += `\`\`\`go\n`;
    output += `// 代码内容请查看 src/templates.ts 或使用插件查看\n`;
    output += `\`\`\`\n\n`;
    output += `</details>\n\n`;
  }
}

console.log(output);

