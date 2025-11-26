const fs = require('fs');
const path = require('path');

const templatesFile = path.join(__dirname, '../src/templates.ts');
const readmeFile = path.join(__dirname, '../README.md');

// 读取 templates.ts
const content = fs.readFileSync(templatesFile, 'utf-8');

// 提取所有模板
const templates = {};
const regex = /'([^']+)':\s*\{[^}]*description:\s*'([^']+)',[^}]*code:\s*`([^`]+)`/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  templates[match[1]] = {
    desc: match[2],
    code: match[3]
  };
}

// 分类映射
const categories = {
  '基础函数': ['abs', 'aeiou', 'atoi', 'b2i', 'sortFunc'],
  '二分查找': ['binaryMin', 'binaryMax'],
  '位运算': ['logTrick', 'xorBasis'],
  '图论算法': ['bfs', 'dfs', 'dijkstra', 'floyd', 'kruskal', 'topologicalSort', 'bipart'],
  '数据结构': ['fenwick', 'segmentTree', 'lazeSegmentTree', 'sparseTable', 'unionFind', 'weightUnionFind', 'lazyHeap', 'maxSlidingWindow', 'dis', 'hpCommon', 'hpLess', 'hpMore'],
  '方向数组': ['dir4', 'dir8'],
  '动态规划': ['digitDP', 'f'],
  '数学相关': ['isPrime', 'primeInit', 'lpf', 'primeFactors', 'divisors', 'lcm', 'palindromes', 'myPow', 'pow'],
  '记忆化搜索': ['memoOneInit'],
  '单调栈': ['nearestGreater'],
  '树算法': ['lca'],
  '工具函数': ['arrToLink', 'buildTree', 'linkToArr', 'printBinary']
};

// 生成模板列表部分
let output = '## 📚 所有可用的模板 Key\n\n';
output += '> 💡 **提示**：点击每个模板名称可以展开查看详细代码。使用前缀匹配功能可以快速找到模板，例如输入 `// bi ` 可以匹配 `binaryMin`, `binaryMax`, `bipart`。\n\n';
output += '> 📖 **完整列表**：查看 [模板文件说明](src/classify/README.md) 了解所有模板的详细分类和说明。\n\n';

// 按分类输出
for (const [category, keys] of Object.entries(categories)) {
  output += `### ${category}\n\n`;
  
  const categoryTemplates = keys
    .filter(key => templates[key])
    .map(key => ({ key, ...templates[key] }))
    .sort((a, b) => a.key.localeCompare(b.key));
  
  for (const template of categoryTemplates) {
    output += `#### \`${template.key}\` - ${template.desc}\n\n`;
    output += `<details>\n<summary>点击查看代码</summary>\n\n`;
    output += `\`\`\`go\n${template.code}\n\`\`\`\n\n`;
    output += `</details>\n\n`;
  }
}

// 处理未分类的模板
const categorizedKeys = new Set(Object.values(categories).flat());
const uncategorized = Object.entries(templates)
  .filter(([key]) => !categorizedKeys.has(key))
  .map(([key, value]) => ({ key, ...value }))
  .sort((a, b) => a.key.localeCompare(b.key));

if (uncategorized.length > 0) {
  output += `### 其他\n\n`;
  for (const template of uncategorized) {
    output += `#### \`${template.key}\` - ${template.desc}\n\n`;
    output += `<details>\n<summary>点击查看代码</summary>\n\n`;
    output += `\`\`\`go\n${template.code}\n\`\`\`\n\n`;
    output += `</details>\n\n`;
  }
}

// 读取 README.md
const readmeContent = fs.readFileSync(readmeFile, 'utf-8');

// 找到模板列表部分的开始和结束位置
const startMarker = '## 📚 所有可用的模板 Key';
const endMarker = '## 💡 使用技巧';

const startIndex = readmeContent.indexOf(startMarker);
const endIndex = readmeContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('无法找到标记位置');
  process.exit(1);
}

// 替换模板列表部分
const newReadme = readmeContent.substring(0, startIndex) + output + readmeContent.substring(endIndex);

// 写入文件
fs.writeFileSync(readmeFile, newReadme, 'utf-8');
console.log('✅ 已更新 README.md 的模板列表部分');

// 如果作为模块被调用，不需要导出
if (require.main === module) {
  // 直接运行脚本时，已经完成更新
}

