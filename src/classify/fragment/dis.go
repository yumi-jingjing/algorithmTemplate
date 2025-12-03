// 初始化距离数组，初始值为无穷大
package main
// 初始化距离数组，初始值为无穷大
dis := make([][]int, m)
for i := range dis {
	dis[i] = make([]int, n)
	for j := range dis[i] {
		dis[i][j] = math.MaxInt
	}
}