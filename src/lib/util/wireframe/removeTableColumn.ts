import { getTable } from './getTable';

/* eslint-disable no-unsafe-optional-chaining */

export const removeTableColumn = (msg: any, data: any) => {
  let res;
  const selectedObject = figma.currentPage.selection;

  const componentPage = figma.root.children.find(el => el.name === '_component');
  const pageFrame = componentPage?.children.find(el => el.name === '_component');  
  const baseComponent = pageFrame?.children.find((el: { name: string; }) => el.name === 'table');

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
    const tbodyCount = tbody.children.length;

    //th
    thead.children[0]?.children[data]?.remove();
    //td
    for(let i = 0;i < tbodyCount;i++){
      tbody.children[i]?.children[data]?.remove();
    }

    getTable();

    res = {
      action: 'removeTableColumn',
      flag: 'success'
    };
  }  
  figma.ui.postMessage(res);
}