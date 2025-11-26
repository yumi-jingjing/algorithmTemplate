// dp 递推需要的二维数组
package main
f := make([][]int, m+1)
for i := range f {
	f[i] = make([]int, n+1)
}