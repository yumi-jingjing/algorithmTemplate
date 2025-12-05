// 二分最小值
package main
// 计算满足 check(x) == true 的最小整数 x
check := func(mid int) bool {
	// 二分猜答案：判断 mid 是否满足题目要求
		
}

left :=  // 循环不变量：check(left) 恒为 false
right :=  // 循环不变量：check(right) 恒为 true
for left+1 < right { // 开区间不为空
		mid := left + ((right-left)>>1)
		if check(mid) { 
				right = mid 
		} else { 
				left = mid 
		}
}
// 所以 right 就是最小的满足 check 的值
return right
