const tree = {
  value: 'A',
  children: [
    {
      value: 'B',
      children: [
        {
          value: 'D',
          children: [
            {
              value: 'H',
              children: []
            }
          ]
        },
        {
          value: 'E',
          children: []
        }
      ]
    },
    {
      value: 'C',
      children: [
        {
          value: 'F',
          children: []
        },
        {
          value: 'G',
          children: []
        }
      ]
    }
  ]
}

function treeToList(tree) {
  let res = []
  let stack = tree
  if (!Array.isArray(tree)) {
    stack = [tree]
  }

  // 遍历
  while(stack.length) {
    const popItem = stack.pop()
    if (popItem.children && popItem.children.length) {
      stack.push(...popItem.children.reverse())
    }
    // 删除children属性
    delete popItem.children
    res.push(popItem)
  }

  return res
}

console.log(treeToList(tree))
