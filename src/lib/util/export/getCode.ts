import { componentList } from "../../data/componentList";
import getComponent from "./getComponent";

const get = (node, prefix, depth = 0) => {
  const nl = depth > 0 ? `\n`:``;
  let name = node.name;

  //행열 처리
  if(node.parent.name === 'columns') {
    name = `${prefix}column ${prefix}${name}`;
  }
  let res = '';
  let res_end = '';
  let childSearch = true;
  
  
  if(componentList.filter((el) => el.type === node.type)[0]?.exeType === 'text'){ //TextNode
    res = nl + `  `.repeat(depth) + node.characters;
    childSearch = false;
  } else if(componentList.filter((el) => el.name === node.name)[0]?.exeType === 'tag') { //tag
    res = nl + `  `.repeat(depth) + `<${name}>`;
    //table
    if(name === 'table'
    && node.children[0]?.name === 'thead'
    && node.children[0]?.children[0]?.name === 'tr'
    && node.children[0]?.children[0]?.children[0]?.name === 'th'  
    ) {
      res += `\n` + `  `.repeat(depth+1) + `<colgroup>`;
      // eslint-disable-next-line no-unsafe-optional-chaining
      for(const col of node.children[0]?.children[0].children){
        const width = col.layoutGrow === 0 ? col.width:'*';
        res += `\n` + `  `.repeat(depth+2) + `<col width="${width}">`;
      }
      res += `\n` + `  `.repeat(depth+1) + `</colgroup>`;
    }
    res_end += `\n`+ `  `.repeat(depth) + `</${name}>`;
  } else if(componentList.filter((el) => el.type === node.type)[0]?.exeType === 'component' || componentList.filter((el) => el.type === node.masterComponent?.type)[0]?.exeType === 'component') { //Component
    res = getComponent(node, depth);
    childSearch = false;
  } else if(name !== '_description') {
    res = nl + `  `.repeat(depth) + `<div class="${name}">`;
    res_end += `\n`+`  `.repeat(depth) + `</div>`;
  } else {
    childSearch = false;
  }

  //text나 component, _description이 아니면 하위 탐색
  if(childSearch && node.children && node.children?.length > 0) {
    for(const child of node.children) {
      res += get(child, prefix, depth+1);
    }
  }
  res += res_end;

  
  return res;
}

export const getCode = (msg) => {
  const prefix = msg.data;
  let data = '';
  let flag = 'fail';
  let message = 'Please select Object';
  if(figma.currentPage.selection.length > 0){
    for(const node of figma.currentPage.selection){
      data += get(node, prefix);
    }	
    flag = 'success';
    message = '';
  }
  const res = {
    action: 'getCode',
    flag: flag,
    message: message,
    data: data
  };
  figma.ui.postMessage(res);
}