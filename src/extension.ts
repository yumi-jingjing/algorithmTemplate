import * as vscode from 'vscode';
import { algorithmTemplates, Template } from './templates';

export function activate(context: vscode.ExtensionContext) {
  // 注册代码补全提供者
  const provider = vscode.languages.registerCompletionItemProvider(
    'go', // 针对 Go 语言
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        // 只在空格键触发时才处理
        if (context.triggerKind !== vscode.CompletionTriggerKind.TriggerCharacter || 
            context.triggerCharacter !== ' ') {
          return undefined;
        }

        const line = document.lineAt(position.line);
        const lineText = line.text;
        const beforeCursor = lineText.substring(0, position.character);

        // 检查是否匹配 // 开头的模式
        if (!beforeCursor.startsWith('//')) {
          return undefined;
        }

        // 提取 // 后面的内容（去掉首尾空格）
        const afterComment = beforeCursor.substring(2).trim();
        
        // 如果为空，不处理
        if (!afterComment) {
          return undefined;
        }
        
        // 检查是否在模板中存在（完全匹配）
        const template = algorithmTemplates[afterComment];

        if (!template) {
          return undefined;
        }

        // 创建补全项
        const completionItem = new vscode.CompletionItem(
          afterComment,
          vscode.CompletionItemKind.Snippet
        );
        
        // 使用模板中的说明作为 detail
        completionItem.detail = template.description;
        completionItem.documentation = new vscode.MarkdownString(`插入 ${afterComment} 的模板代码\n\n${template.description}`);
        
        // 设置插入的文本
        const snippet = new vscode.SnippetString();
        snippet.appendText(template.code);
        
        completionItem.insertText = snippet;
        // 设置补全项的排序优先级，使其更容易被选中
        completionItem.sortText = `0_${afterComment}`;
        // 设置补全项为预设选中
        completionItem.preselect = true;
        
        // 删除从行首到当前位置的所有内容（包括空格）
        completionItem.additionalTextEdits = [
          vscode.TextEdit.delete(
            new vscode.Range(
              new vscode.Position(position.line, 0),
              new vscode.Position(position.line, position.character)
            )
          )
        ];

        return [completionItem];
      }
    },
    ' ' // 触发字符：空格（当用户按空格时触发补全）
  );

  context.subscriptions.push(provider);
}

export function deactivate() { }
