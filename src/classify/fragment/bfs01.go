// 01bfs
package main
// 两个 slice 头对头，模拟 deque
q0 := []pair{{}}
q1 := []pair{}
for len(q0) > 0 || len(q1) > 0 {
	// 弹出队首
	var p pair
	if len(q0) > 0 {
		p, q0 = q0[len(q0)-1], q0[:len(q0)-1]
	} else {
		p, q1 = q1[0], q1[1:]
	}
}