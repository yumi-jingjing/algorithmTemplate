import * as vscode from 'vscode';
import { algorithmTemplates } from './templates';

export function activate(context: vscode.ExtensionContext) {
  const provider = vscode.languages.registerCompletionItemProvider(
    'go',
    {
      provideCompletionItems(document, position) {
        const line = document.lineAt(position.line);
        const beforeCursor = line.text.substring(0, position.character).trimStart();
        
        // 检查是否为 // 开头的注释
        if (!beforeCursor.startsWith('//')) {
          return undefined;
        }

        const keyword = beforeCursor.substring(2).trim();
        if (!keyword) {
          return undefined;
        }

        const keywordLower = keyword.toLowerCase();
        const items: vscode.CompletionItem[] = [];
        const lineStart = line.firstNonWhitespaceCharacterIndex;

        for (const [key, template] of Object.entries(algorithmTemplates)) {
          // 前缀匹配（不区分大小写）
          if (key.toLowerCase().startsWith(keywordLower)) {
            const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Snippet);
            item.detail = template.description;
            item.documentation = new vscode.MarkdownString(`插入 ${key} 的模板代码\n\n${template.description}`);
            item.insertText = new vscode.SnippetString(template.code);
            item.sortText = key === keyword ? `\0${key}` : `\0_${key}`;
            item.preselect = key === keyword;
            item.additionalTextEdits = [
              vscode.TextEdit.delete(
                new vscode.Range(
                  new vscode.Position(position.line, lineStart),
                  new vscode.Position(position.line, position.character)
                )
              )
            ];
            items.push(item);
          }
        }

        return items.length > 0 ? items : undefined;
      }
    },
    ' ' // 空格键触发
  );

  context.subscriptions.push(provider);
}

export function deactivate() { }
