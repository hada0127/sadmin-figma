import { componentList } from "../data/componentList";

export default function getComponent(node:any, depth:number) {
  //Properties
  let prop: string = '';
  let res: string = '';
  let res_start: string = '';
  let res_end: string = '';
  let labelText: string = '';
  let requiredText: string = '';
  let name = node.name;
  //console.log(node);
  if(node.children && node.children?.length > 0) {
    for(const child of node.children) {
      if(child.name === 'Label') {
        for(const childDepth2 of child.children) {
          if(childDepth2.name === 'Title') {
            labelText = childDepth2.characters;
          }
          if(childDepth2.name === '*') {
            requiredText = ' required';
          }
        }
        res_start += `\n` + `  `.repeat(depth) + `<Field label="${labelText}"${requiredText}>`;
        res_end += `\n` + `  `.repeat(depth) +`</Field>`;
        depth ++;
      }
    }
  }
  res = `${res_start}`;
  res += `\n` + `  `.repeat(depth) + `<${name} ${prop} />`;
  res +=  `${res_end}`;
  return res;
  
}
