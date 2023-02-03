const setCol = (col, width = 'fill') => {
  if(width === 'fill') {
    //auto width
    col.layoutGrow = 1;
  } else {
    //fixed width
    col.resize(parseInt(width), col.height);
    col.layoutGrow = 0;
  }
  col.clipsContent = true;
  col.primaryAxisSizingMode = "FIXED";
  col.primaryAxisAlignItems = "CENTER";
  col.layoutMode = "HORIZONTAL";
  col.layoutPositioning = "AUTO";
  col.layoutAlign = "STRETCH";
  col.counterAxisAlignItems = "MIN";
  col.counterAxisSizingMode = "FIXED";
  return col;
}
const createTable = (name: string) => {
  const table = figma.createFrame();
  table.name = name;
  table.clipsContent = true;
  table.primaryAxisAlignItems = "MIN";
  table.layoutPositioning = "AUTO";
  table.layoutAlign = "STRETCH";
  table.counterAxisAlignItems = "MIN";
  if(name === 'tr') {
    table.layoutMode = "HORIZONTAL";
    table.layoutGrow = 0;
    table.primaryAxisSizingMode = "FIXED";
    table.counterAxisSizingMode = "AUTO";    
  } else if(name === 'table') {
    table.layoutMode = "VERTICAL";
    table.layoutGrow = 1;
    table.primaryAxisSizingMode = "AUTO";
    table.counterAxisSizingMode = "FIXED";
  } else {
    table.layoutMode = "VERTICAL";
    table.layoutGrow = 0;
    table.primaryAxisSizingMode = "AUTO";
    table.counterAxisSizingMode = "FIXED";
  }

  return table;
}

const get = (data: { row: number; col: number; colgroup: object; }) => {
  const selectedObject = figma.currentPage.selection;

  const componentPage = figma.root.children.find(el => el.name === '_component');
  const pageFrame = componentPage?.children.find(el => el.name === '_component');
  const baseComponent = pageFrame?.children.find((el: { name: string; }) => el.name === 'table');
  const th = baseComponent?.children.find((el: { name: string; }) => el.name === 'th');
  const td = baseComponent?.children.find((el: { name: string; }) => el.name === 'td');

  if(selectedObject.length === 0){
    return {flag:'errSelect', message:'Please select frame'};
  }
  else if(selectedObject[0].type !== 'FRAME') {
    return {flag:'errFrame', message:'Please select frame'};
  }
  else if(componentPage === undefined) {
    return {flag:'errPage', message:'Can not find _component Page'};
  } 
  else if(pageFrame === undefined) {
    return {flag:'errFrame', message:'Can not find _component frame'};
  } 
  else if(baseComponent === undefined) {
    return {flag:'errComponent', message:'Can not find Table Component'};
  }

  const table = createTable('table');
  const thead = createTable('thead');
  const tbody = createTable('tbody');

  for(let i = 0;i < data.row;i++){
    const tr = createTable('tr');
    for(let j = 0;j < data.col;j++){
      let col;
      if(i === 0) {
        col = setCol(th.clone(), data.colgroup[j].value);
        tr.appendChild(col);
      } else {
        col = setCol(td.clone(), data.colgroup[j].value);
        tr.appendChild(col);
      }
    }
    if(i === 0) {
      thead.appendChild(tr);
    } else {
      tbody.appendChild(tr);
    }  
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  

  selectedObject[0].appendChild(table);
  return {flag:'success', message:''};
}

export const addTable = (msg: any, data: any) => {
  const { flag, message } = get(data);
  const res = {
    action: 'addTable',
    flag: flag,
    message: message
  };
  figma.ui.postMessage(res);
}