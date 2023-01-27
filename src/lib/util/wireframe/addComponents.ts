const get = (name) => {
  const selectedObject = figma.currentPage.selection;

  const componentPage = figma.root.children.find(el => el.name === '_component');
  const pageFrame = componentPage?.children.find(el => el.name === '_component');
  const baseComponent = pageFrame?.children.find(el => el.name === name);

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
    return {flag:'errComponent', message:'Can not find Component'};
  }
  let instance;
  if(name === 'Button') {
    instance = baseComponent.clone();
  } else {
    instance = baseComponent.createInstance();
  }
  selectedObject[0].appendChild(instance);

  // if (page.children.length > 1) {
	// 	const lastChild = page.children.length - 2;
	// 	instance.x = page.children[lastChild].x + page.children[lastChild].width + 100;
	// }
  console.log(baseComponent, name);

  return {flag:'success', message:''};
}

export const addComponents = (msg, name) => {
  const { flag, message } = get(name);
		const res = {
			action: 'addPage',
			flag: flag,
			message: message
		};
		figma.ui.postMessage(res);
}