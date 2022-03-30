/* 
<div>
    <span></span>
    <ul>
        <li></li>
        <li></li>
    </ul>
</div>

将上方的DOM转化为下面的树结构对象

{
    tag: 'DIV',
    children: [
        { tag: 'SPAN', children: [] },
        {
            tag: 'UL',
            children: [
                { tag: 'LI', children: [] },
                { tag: 'LI', children: [] }
            ]
        }
    ]
}
*/

function dom2Tree(dom) {
  const root = {}
  root.tag = dom.tagName 
  root.children = []
  dom.childNodes.forEach(child => root.children.push(dom2Tree(child)))
  return root
}

