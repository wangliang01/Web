/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
  // return [...nums1.slice(0, m), ...nums2.slice(0, n)].sort()
  
  for (let i = 0; i < n; i++) {
    nums1[m + i] =  nums2[i]
  }

  nums1.sort()
  return nums1
};
// @lc code=end

var merge = function(nums1, m, nums2, n) {
  // 定义一个临时数组
  const temp = []

  // 定义两个指针，numIndex1, numIndex2
  let numIndex1 = 0, numIndex2 = 0

  // 统计遍历的总长度
  const k = m + n 

  // 遍历 
  for (let i = 0; i < k; i++) {
    if (numIndex1 === m) {
      // 如果nums1遍历完毕
      temp[i] = nums2[numIndex2++]
    } else if (numIndex2 === n) {
      // 如果nums2遍历完毕 
      temp[i] = nums1[numIndex1++]
    } else {
      // 判断nums1中的数，与nums2中的数哪个小
      if (nums1[numIndex1] <= nums2[numIndex2]) {
        temp[i] = nums1[numIndex1++]
      } else {
        temp[i] = nums2[numIndex2++]
      }
    }
  }

  // 将temp中的值，依次赋值给nums1
  for (let i = 0; i < temp.length; i++) {
    nums1[i] = temp[i]
  }

  return nums1
};

