const draw = () => {
  const selectedObject = figma.currentPage.selection;

  if(selectedObject.length === 0){
    return {flag:'errSelect', message:'Please select object'};
  }
  if(selectedObject[0].type !== 'FRAME') {
    return {flag:'errFrame', message:'Please select frame'};
  }
  if(selectedObject[0].name === 'columns') {
    return {flag:'errFrame', message:'Can\'t draw on columns'};
  }
  if(selectedObject[0].name === 'is-bordered') {
    return {flag:'errFrame', message:'Can\'t draw on is-bordered'};
  }

  const frame = figma.createFrame();
  frame.name = 'is-bordered';
  frame.clipsContent = true;
  frame.layoutMode = "VERTICAL";
  if(selectedObject[0].layoutMode === "VERTICAL"){
    frame.layoutGrow = 0;
    frame.primaryAxisSizingMode = "AUTO";
  } else {
    frame.layoutGrow = 1;
    frame.primaryAxisSizingMode = "FIXED";
  }
  frame.layoutAlign = "STRETCH";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "MIN";
  frame.counterAxisSizingMode = "FIXED";  
  frame.itemSpacing = 10;
  frame.paddingTop = 10;
  frame.paddingBottom = 10;
  frame.horizontalPadding = 10;
  frame.verticalPadding = 10;
  frame.strokes = [{ type: "SOLID", color: {r: 0.86, g: 0.86, b: 0.86}, visible: true, opacity:1, blendMode: "NORMAL" }];
  frame.cornerRadius = 4;
  

  selectedObject[0].appendChild(frame);
  return {flag:'success', message:''};
}

export const drawBorderBox = (msg) => {
  const { flag, message } = draw();
  const res = {
    action: 'drawBorderBox',
    flag: flag,
    message: message
  };
  figma.ui.postMessage(res);
}
