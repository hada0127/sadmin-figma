import { componentList } from "../../data/componentList";
import getComponent from "./getComponent";

export const getCode = (node, depth = 0) => {
  const nl = depth > 0 ? `\n`:``;
  let name = node.name;

  //행열 처리
  if(node.parent.name === 'columns') {
    name = `column ${name}`;
  }
  let res = '';
  let res_end = '';
  let childSearch = true;
  
  
  if(componentList.filter((el) => el.type === node.type)[0]?.exeType === 'text'){ //TextNode
    res = nl + `  `.repeat(depth) + node.characters;
    childSearch = false;
  } else if(componentList.filter((el) => el.name === node.name)[0]?.exeType === 'table') { //table
    res = nl + `  `.repeat(depth) + `<${name}>`;
    res_end += `\n`+ `  `.repeat(depth) + `</${name}>`;
  } else if(componentList.filter((el) => el.type === node.type)[0]?.exeType === 'component' || componentList.filter((el) => el.type === node.masterComponent?.type)[0]?.exeType === 'component') { //Component
    res = getComponent(node, depth);
    childSearch = false;
  } else {
    res = nl + `  `.repeat(depth) + `<div class="${name}">`;
    res_end += `\n`+`  `.repeat(depth) + `</div>`;
  }

  //text나 component가 아니면 하위 탐색
  if(childSearch && node.children && node.children?.length > 0) {
    for(const child of node.children) {
      res += getCode(child, depth+1);
    }
  }
  res += res_end;
  
  return res;
}