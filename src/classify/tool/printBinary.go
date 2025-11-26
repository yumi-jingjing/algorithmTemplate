// 调试输出二进制
package main

import (
	"fmt"
	"strconv"
	"strings"
)

func PrintlnBinary(mask int, n int) {
	// 打印mask的二进制形式（补全前导0以对齐）
	binStr := strconv.FormatInt(int64(mask), 2)
	// 补全前导0，使二进制长度为n位，方便观察
	if len(binStr) < n {
		binStr = strings.Repeat("0", n-len(binStr)) + binStr
	}
	fmt.Println("mask:", binStr, "(十进制:", mask, ")")
}
