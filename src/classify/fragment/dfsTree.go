// 递归遍历树
package main
var dfs func(*TreeNode)
dfs = func(node *TreeNode) {
	if node == nil {
			return
	}
	dfs(node.Left)
	dfs(node.Right)
}
dfs(root)