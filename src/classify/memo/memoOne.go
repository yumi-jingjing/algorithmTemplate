// 一维记忆化搜索
package main
p := &memo[i]
if *p != -1 {
  return *p
}
defer func() {
  *p = res
}()