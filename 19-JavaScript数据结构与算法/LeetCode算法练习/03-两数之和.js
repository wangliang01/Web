/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  let res = []
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      // 判断两个数的和，是否为目标数
      if (nums[i] + nums[j] === target) {
        res = [i, j]
        return res
      }
    }
  }
  return res
};
// @lc code=end

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  let res = []
  const hashMap = new Map()
  for (let i = 0; i < nums.length; i++) {
    let another = target - nums[i]
    if (hashMap.get(another) !== undefined) {
      res = [hashMap.get(another), i]
    } else {
      hashMap.set(nums[i], i)
    }
  }
  return res
};

let nums = [2,7,11,15]
let target = 9
twoSum(nums, target)

