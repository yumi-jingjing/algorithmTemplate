// bfs 队列
package main
queue := []pair{{sx, sy, energy, 0}}
vis[0][0]= true
step := 0
for len(queue) > 0 {
	tmp := queue
	queue = nil
	for _, q := range tmp {
		// 这里判断是否已经走到终点了
		for _, d := range dir4 {
			x, y := q.x+d.x, q.y+d.y
			if x >= 0 && x < m && y >= 0 && y < n {

			}
		}
	}
	step++
}