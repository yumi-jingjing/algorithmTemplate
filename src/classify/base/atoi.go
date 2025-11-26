// 字符串转整数
package main

// 手动转 int 快一些
func atoi(s []byte) (res int) {
	for _, b := range s {
		res = res*10 + int(b&15)
	}
	return
}
