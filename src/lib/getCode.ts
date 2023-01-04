export const getCode = (node, depth = 0, parentName = '') => {
  const nl = depth > 0 ? `\n`:``;
  let name = node.name;
  if(parentName === 'columns') {
    name = `column ${name}`;
  }
  let res = nl + `  `.repeat(depth) + `<div class="${name}">`;
  console.log(node.children);
  if(node.children && node.children?.length > 0) {
    for(const child of node.children) {
      res += getCode(child, depth+1, name);
    }
  }
  res += `\n` + `  `.repeat(depth) + `</div>`;
  return res;
}