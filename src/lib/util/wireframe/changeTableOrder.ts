export const changeTableOrder = (msg: any, data: any) => {
  let res;
  const selectedObject = figma.currentPage.selection;


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
  else {
    const thead = selectedObject[0]?.children[0];
    const tbody = selectedObject[0]?.children[1];

    const tbodyCount = tbody.children.length;

    //thead
    const tmp = thead.children[0].children[data.start].clone();
    thead.children[0].children[data.start].remove();
    thead.children[0].insertChild(data.target, tmp);

    //tbody
    for(let i = 0;i < tbodyCount;i++){
      const tmp = tbody.children[i].children[data.start].clone();
      tbody.children[i].children[data.start].remove();
      tbody.children[i].insertChild(data.target, tmp);
    }
    res = {
      action: 'changeTableOrder',
      flag: 'success'
    };
  }  
  figma.ui.postMessage(res);
}