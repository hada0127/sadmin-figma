function getFrameTop (node , x=0, y=0) {
  if(node.parent.type === 'PAGE'){
    return [
      node, 
      x, 
      y
    ];
  } else {
    x += node.x;
    y += node.y;
    return getFrameTop(node.parent, x, y);
  }
}

const get = (data) => {
  const selectedObject = figma.currentPage.selection;
  const [ node, x, y ] = getFrameTop(selectedObject[0]);

  if(selectedObject.length === 0){
    return {flag:'errSelect', message:'Please select frame'};
  }
  else if(node.type !== 'FRAME') {
    return {flag:'errFrame', message:'Please select frame'};
  }
  //console.log('addMarker', data);
  
  //description 그룹 있는지 체크
  let descriptionFrame = node.findChild(n => n.name=='description');
  if(descriptionFrame === null){
    const tmp = figma.createFrame();
    tmp.name = 'description';
    tmp.fills = [];
    tmp.resize(node.width, node.height);
    tmp.clipsContent = false;
    if(node.layoutMode !== 'NONE'){
      node.insertChild(0,tmp);
    } else {
      node.appendChild(tmp);
    }
    descriptionFrame = node.findChild(n => n.name=='description');
    if(node.layoutMode !== 'NONE'){
      descriptionFrame.layoutPositioning = "ABSOLUTE";
    }
  }
  return {flag:'success', message:''};
}

export const addMarker = (msg: any, data: any) => {
  const { flag, message } = get(data);
  const res = {
    action: 'addMarker',
    flag: flag,
    message: message
  };
  figma.ui.postMessage(res);
}