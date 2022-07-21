/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
  if (n === 1) return 1 
  if (n === 2) return 2 
  const hashMap = new Map()
  let result
  if (hashMap.get(n) == null) {
    result = climbStairs(n-1) + climbStairs(n-2)
    hashMap.set(n, result)
  } else {
    result = hashMap.get(n)
  }
  return result
};
// @lc code=end

