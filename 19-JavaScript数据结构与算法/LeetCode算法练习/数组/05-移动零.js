var moveZeroes = function(nums) {
  // 先定义两个指针
  let j = 0 // 用来记录非零的位置 
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]!== 0) {
      nums[j++] = nums[i]
    }
  }

  // 将j后面的数全部改为0
  for (let i = j + 1; i < nums.length; i++) {
    nums[i] = 0
  }
};