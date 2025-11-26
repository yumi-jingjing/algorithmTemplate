// 单调双端队列
package main

// 计算 nums 的每个长为 k 的窗口的最大值
// 时间复杂度 O(n)，其中 n 是 nums 的长度
func maxSlidingWindow(nums []int, k int) []int {
	ans := make([]int, len(nums)-k+1) // 窗口个数
	q := []int{}

	for i, x := range nums {
		// 1. 右边入
		for len(q) > 0 && nums[q[len(q)-1]] <= x {
			q = q[:len(q)-1] // 维护 q 的单调性
		}
		q = append(q, i) // 注意保存的是下标，这样下面可以判断队首是否离开窗口

		// 2. 左边出
		left := i - k + 1 // 窗口左端点
		if q[0] < left {  // 队首离开窗口
			q = q[1:] // Go 的切片是 O(1) 的
		}

		// 3. 在窗口左端点处记录答案
		if left >= 0 {
			// 由于队首到队尾单调递减，所以窗口最大值就在队首
			ans[left] = nums[q[0]]
		}
	}

	return ans
}
