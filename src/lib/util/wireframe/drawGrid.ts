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
  let prevSize = rule[0];
  let sameSizeCheck = true;
  for(const obj of rule) {
    if(prevSize !== obj) {
      sameSizeCheck = false;
      break;
    } else {
      prevSize = obj;
    }
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

  for(const obj of rule) {
    const subFrame = figma.createFrame();
    subFrame.name = `is-${obj}`;
    if(sameSizeCheck === true) {
      //auto width
      subFrame.resize(subFrame.width, 30);
      subFrame.layoutGrow = 1;
    } else {
      //fixed width
      const width = selectedObject[0].width * obj / 12;
      subFrame.resize(width, 30);
      subFrame.layoutGrow = 0;
    }
    subFrame.clipsContent = true;
    subFrame.primaryAxisSizingMode = "FIXED";
    subFrame.primaryAxisAlignItems = "MIN";
    subFrame.layoutMode = "HORIZONTAL";
    subFrame.layoutPositioning = "AUTO";
    subFrame.layoutAlign = "INHERIT";
    subFrame.counterAxisAlignItems = "MIN";
    subFrame.counterAxisSizingMode = "AUTO";
    subFrame.itemSpacing = 10;
    frame.appendChild(subFrame);
  }

  selectedObject[0].appendChild(frame);
  return {flag:'success', message:''};
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
