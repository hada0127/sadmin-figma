const get = (data) => {
  const selectedObject = figma.currentPage.selection;

  const componentPage = figma.root.children.find(el => el.name === '_component');
  const pageFrame = componentPage?.children.find(el => el.name === '_component');
  const baseComponent = pageFrame?.children.find(el => el.name === 'table');

  if(selectedObject.length === 0){
    return {flag:'errSelect', message:'Please select object'};
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
  const instance = baseComponent.clone();
  selectedObject[0].appendChild(instance);
  return {flag:'success', message:''};
}

export const addTable = (msg, data) => {
  const { flag, message } = get(data);
  const res = {
    action: 'addTable',
    flag: flag,
    message: message
  };
  figma.ui.postMessage(res);
}