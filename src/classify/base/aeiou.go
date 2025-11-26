// 判断是否为元音字母
package main
// const aeiouMask = 1065233
const aeiouMask = 1<<0 | 1<<4 | 1<<8 | 1<<14 | 1<<20
aeiouMask>>(ch-'a')&1 == 1