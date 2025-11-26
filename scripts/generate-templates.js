const fs = require('fs');
const path = require('path');

const classifyDir = path.join(__dirname, '../src/classify');
const outputFile = path.join(__dirname, '../src/templates.ts');

// 读取所有分类文件夹
const categories = fs.readdirSync(classifyDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const templates = {};

// 遍历每个分类
categories.forEach(category => {
  const categoryPath = path.join(classifyDir, category);
  const files = fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.go'));

  files.forEach(file => {
    const filePath = path.join(categoryPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/);

    if (lines.length === 0) {
      console.warn(`⚠️  警告: ${file} 文件为空，跳过`);
      return;
    }

    // 第一行注释作为 description
    let description = lines[0].replace(/^\/\/\s*/, '').trim();
    if (!description) {
      // 如果第一行不是注释或为空，使用文件名作为描述
      description = file.replace(/\.go$/, '');
      console.warn(`⚠️  警告: ${file} 第一行不是注释，使用文件名作为描述`);
    }
    
    // 从第二行开始作为 code，但要去掉 package main 和 import
    let codeLines = lines.slice(1);
    
    // 如果第二行是 package main，跳过它
    if (codeLines.length > 0 && codeLines[0].trim() === 'package main') {
      codeLines = codeLines.slice(1);
    }
    
    // 去掉开头的空行
    while (codeLines.length > 0 && codeLines[0].trim() === '') {
      codeLines = codeLines.slice(1);
    }
    
    // 去掉 import 语句（可能是单行或多行）
    if (codeLines.length > 0 && codeLines[0].trim().startsWith('import ')) {
      const firstLine = codeLines[0].trim();
      
      // 单行 import: import "fmt" 或 import ("fmt")
      if (firstLine.endsWith('"') || firstLine.endsWith(')')) {
        codeLines = codeLines.slice(1);
      } else {
        // 多行 import: import ("fmt" ...)
        // 找到对应的右括号
        let braceCount = 0;
        let importEndIndex = 0;
        for (let i = 0; i < codeLines.length; i++) {
          const line = codeLines[i];
          braceCount += (line.match(/\(/g) || []).length;
          braceCount -= (line.match(/\)/g) || []).length;
          if (braceCount === 0 && i > 0) {
            importEndIndex = i;
            break;
          }
        }
        codeLines = codeLines.slice(importEndIndex + 1);
      }
      
      // 去掉 import 后面的空行
      while (codeLines.length > 0 && codeLines[0].trim() === '') {
        codeLines = codeLines.slice(1);
      }
    }
    
    let code = codeLines.join('\n');
    // 去掉末尾的空白行，但保留代码中的空行
    code = code.replace(/\n+$/, '');
    
    if (!code.trim()) {
      console.warn(`⚠️  警告: ${file} 没有代码内容，跳过`);
      return;
    }

    // 文件名（去掉 .go 扩展名）作为 key，保持原样
    // 例如：binaryMin.go -> binaryMin
    let key = file.replace(/\.go$/, '');

    templates[key] = {
      description,
      code
    };
  });
});

// 生成 TypeScript 文件
const templateEntries = Object.entries(templates)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([key, { description, code }]) => {
    // 转义代码中的反引号和 $ 符号
    const escapedCode = code
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
    
    return `  '${key}': {
    description: '${description.replace(/'/g, "\\'")}',
    code: \`${escapedCode}\`
  }`;
  }).join(',\n\n');

const output = `// 算法模板类型定义
export interface Template {
  code: string;
  description: string;
}

// 算法模板映射表（由 scripts/generate-templates.js 自动生成）
export const algorithmTemplates: { [key: string]: Template } = {
${templateEntries}
};
`;

fs.writeFileSync(outputFile, output, 'utf-8');
console.log(`✅ 已生成 ${Object.keys(templates).length} 个模板到 ${outputFile}`);

// 自动更新 README.md
const { execSync } = require('child_process');
const updateReadmeScript = path.join(__dirname, 'update-readme-templates.js');
if (fs.existsSync(updateReadmeScript)) {
  try {
    execSync(`node "${updateReadmeScript}"`, { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️  更新 README.md 时出错:', error.message);
  }
}

