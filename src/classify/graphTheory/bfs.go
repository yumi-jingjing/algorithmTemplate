// 用bfs求最短路
package main

// 计算从 start 到各个节点的最短路长度
// 如果节点不可达，则最短路长度为 -1
// 节点编号从 0 到 n-1，边权均为 1
func bfs(n int, edges [][]int, start int) []int {
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x) // 无向图
	}

	dis := make([]int, n)
	for i := range dis {
		dis[i] = -1 // -1 表示尚未访问到
	}
	dis[start] = 0
	q := []int{start}
	for len(q) > 0 {
		x := q[0]
		q = q[1:]
		for _, y := range g[x] {
			if dis[y] < 0 {
				dis[y] = dis[x] + 1
				q = append(q, y)
			}
		}
	}
	return dis
}
