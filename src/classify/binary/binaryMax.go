// 二分最大值
package main
// 计算满足 check(x) == true 的最大整数 x{
check := func(mid int) bool {
	// 二分猜答案：判断 mid 是否满足题目要求
		
}

left :=  // 循环不变量：check(left) 恒为 true
right :=  // 循环不变量：check(right) 恒为 false
for left+1 < right {
		mid := left + ((right-left)>>1)
		if check(mid) {
				left = mid 
		} else {
				right = mid
		}
}
// 所以 left 就是最大的满足 check 的值
return left // check 更新的是谁，最终就返回谁
