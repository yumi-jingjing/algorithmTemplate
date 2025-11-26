// 数组转链表
package main

type ListNode struct {
	Val  int
	Next *ListNode
}

// 辅助函数：数组转链表
func arrToLink(nums []int) *ListNode {
	dummy := &ListNode{}
	cur := dummy
	for _, n := range nums {
		cur.Next = &ListNode{Val: n}
		cur = cur.Next
	}
	return dummy.Next
}
