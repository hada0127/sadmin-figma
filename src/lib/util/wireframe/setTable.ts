import { setCol, setColWidth, createTable } from './addTable';

/* eslint-disable no-unsafe-optional-chaining */

export const setTable = (msg: any, data: any) => {
  let res;
  const selectedObject = figma.currentPage.selection;

  const componentPage = figma.root.children.find(el => el.name === '_component');
  const pageFrame = componentPage?.children.find(el => el.name === '_component');  
  const baseComponent = pageFrame?.children.find((el: { name: string; }) => el.name === 'table');
  const th = baseComponent?.children.find((el: { name: string; }) => el.name === 'th');
  const td = baseComponent?.children.find((el: { name: string; }) => el.name === 'td');

	if(selectedObject[0]?.name !== 'table') { 
    res =  {flag:'errSelect', message:'Please, select table'};
  }
  else if(selectedObject[0]?.children[0].name !== 'thead'){
    res =  {flag:'errSelect', message:'Invalid table format(thead)'};
  }    
  else if(selectedObject[0]?.children[1].name !== 'tbody'){
    res =  {flag:'errSelect', message:'Invalid table format(tbody)'};
  }    
  else if(selectedObject[0]?.children[0].children[0].name !== 'tr'){
    res =  {flag:'errSelect', message:'Invalid table format(tr)'};
  }    
  else if(selectedObject[0]?.children[0].children[0].children[0].name !== 'th'){
    res =  {flag:'errSelect', message:'Invalid table format(th)'};
  }
  else if(componentPage === undefined) {
    res =  {flag:'errPage', message:'Can not find _component Page'};
  } 
  else if(pageFrame === undefined) {
    res =  {flag:'errFrame', message:'Can not find _component frame'};
  } 
  else if(baseComponent === undefined) {
    res = {flag:'errComponent', message:'Can not find Table Component'};
  }  
  else {
    const thead = selectedObject[0]?.children[0];
    const tbody = selectedObject[0]?.children[1];
    const oldCols = thead.children[0];
    const oldColsCount = oldCols.children.length;

    const tbodyCount = tbody.children.length;
    //삭제시 
    //기존 테이블보다 row 갯수가 작으면 오버되는 것 삭제
    if(data.row <= tbodyCount){
      for(let i = tbodyCount;i >= data.row;i--){
        tbody.children[i-1].remove();
      }
    }
    //기존 테이블보다 col 갯수가 작으면 오버되는 것 삭제
    if(data.col < oldColsCount){
      //th
      for(let j = oldColsCount;j > data.col;j--){
        thead.children[0]?.children[j-1]?.remove();
      }
      //td
      for(let i = 0;i < data.row -1;i++){
        for(let j = oldColsCount;j > data.col;j--){
          tbody.children[i]?.children[j-1]?.remove();
        }
      }
    }

    //컬럼 속성 변경 및 생성
    for(let i = 0;i < data.row;i++){
      let tr;
      if(i > tbodyCount){
        tr = createTable('tr');
        tbody.appendChild(tr);
      } 
      for(let j = 0;j < data.col;j++){
        let col;
        if(i === 0) {
          if(j >= oldColsCount){
            col = setCol(th.clone(), data.colgroup[j].value);
            thead.children[0].appendChild(col);
          } else {
            setColWidth(thead.children[0].children[j], data.colgroup[j].value);
          }
        } else {
          if(j >= oldColsCount || i > tbodyCount){
            col = setCol(td.clone(), data.colgroup[j].value);
            tbody.children[i-1].appendChild(col);
          } else {
            setColWidth(tbody.children[i-1].children[j], data.colgroup[j].value);
          }
        }
      }
    }
    res = {
      action: 'setTable',
      flag: 'success'
    };
  }  
  figma.ui.postMessage(res);
}