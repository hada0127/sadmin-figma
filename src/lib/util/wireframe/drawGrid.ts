const draw = (rule) => {
  const selectedObject = figma.currentPage.selection;

  if(!Array.isArray(rule)) {
    return {flag:'errArray', message:'Data is not Array'};
  }
  const sum = rule.reduce((a, b) => a+ b, 0);  
  if(sum !== 12) {
    return {flag:'errSum', message:'The sum of the grid numbers must be 12'};
  }
  if(selectedObject.length === 0){
    return {flag:'errSelect', message:'Please select object'};
  }
  if(selectedObject[0].type !== 'FRAME') {
    return {flag:'errFrame', message:'Please select frame'};
  }

  const frame = figma.createFrame();
  frame.name = 'columns';
  frame.clipsContent = true;
  frame.primaryAxisSizingMode = "FIXED";
  frame.primaryAxisAlignItems = "MIN";
  frame.layoutMode = "HORIZONTAL";
  frame.layoutPositioning = "AUTO";
  frame.layoutAlign = "STRETCH";
  frame.layoutGrow = 0;
  frame.counterAxisAlignItems = "MIN";
  frame.counterAxisSizingMode = "AUTO";
  frame.itemSpacing = 10;
  frame.paddingTop = 10;
  frame.paddingBottom = 10;
  frame.verticalPadding = 10;

  selectedObject[0].appendChild(frame);
  return {flag:'success', message:''};

//  figma.currentPage.appendChild(instance);

  // if (page.children.length > 1) {
	// 	const lastChild = page.children.length - 2;
	// 	instance.x = page.children[lastChild].x + page.children[lastChild].width + 100;
	// }
}

export const drawGrid = (msg, rule) => {
  const { flag, message } = draw(rule);
  const res = {
    action: 'drawGrid',
    flag: flag,
    message: message
  };
  figma.ui.postMessage(res);
}
export const getInfo = (msg) => {
  const selectedObject = figma.currentPage.selection;
  console.log(selectedObject[0]);
  const res = {
    action: 'getInfo',
    flag: 'success'
  };
  figma.ui.postMessage(res);
}