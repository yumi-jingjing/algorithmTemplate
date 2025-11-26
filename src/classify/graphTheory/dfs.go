// 用dfs找连通块、判断是否有环
package main

func solve(n int, edges [][]int) (ans []int) {
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
}
