// 二分最小值
package main
// 计算满足 check(x) == true 的最小整数 x
func binarySearchMin(nums []int) int {
	// 二分猜答案：判断 mid 是否满足题目要求
	check := func(mid int) bool {
			
	}

	left :=  // 循环不变量：check(left) 恒为 false
	right :=  // 循环不变量：check(right) 恒为 true
	for left+1 < right { // 开区间不为空
			mid := left + (right-left)/2
	if check(mid) { // 说明 check(>= mid 的数) 均为 true
					right = mid // 接下来在 (left, mid) 中二分答案
			} else { // 说明 check(<= mid 的数) 均为 false
					left = mid // 接下来在 (mid, right) 中二分答案
			}
	}
	// 循环结束后 left+1 = right
	// 此时 check(left) == false 而 check(left+1) == check(right) == true
	// 所以 right 就是最小的满足 check 的值
	return right
}