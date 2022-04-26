let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

/* 
  分析:
  1、id: 1, pid: 0 直接插入结果数组
  2、id: 2, pid: 1, pid与结果数组中的第一项的id相等，则将该项插入到结果数组第一项的children属性中。
  3、id: 3, pid: 1, pid与结果数组中的第一项的id相等，则将该项插入到结果数组第一项的children属性中。
  4、id: 4, pid: 3, pid与
*/


function listToTree(list, rootId = 0) {
  let res = []
  const hashMap = {}
  for (let item of list) {
    const id = item.id 
    const pid = item.pid 
    // 给每一项都添加children属性
    // item.children = []

    // 将该项也存入hashMap
    hashMap[id] = item
    if (pid === rootId) {
      // 如果pid为0时
      res.push(item)
    } else {
      // 如果当前项pid在hashMap存在，则将该项插入到children中
      if (hashMap[pid]) {
        if (hashMap[pid].children) {
          hashMap[pid].children.push(item)
        } else {
          hashMap[pid].children = [item]
        }
      }
    }

    
  }

  return res
}

/* 
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
*/



/**
* 转换方法
*/
function listToTree (list, result = [], pid = 0) {
  for (const item of list) {
    if (item.pid === pid) {
      const newItem = {...item, children: []};
      result.push(newItem);
      listToTree(list, newItem.children, item.id);
    }
  }
  return result
}



console.log(JSON.stringify(listToTree(arr)));



