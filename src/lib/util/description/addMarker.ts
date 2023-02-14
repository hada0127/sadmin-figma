const getFrameTop = (node , x=0, y=0) => {
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

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}

const get = (data) => {
  const componentPage = figma.root.children.find(el => el.name === '_component');
  const pageFrame = componentPage?.children.find(el => el.name === '_markers');
  const marker = pageFrame?.children.find(el => el.name === 'marker');

  const selectedObject = figma.currentPage.selection;
  const id = selectedObject[0].id;
  const [ node, x, y ] = getFrameTop(selectedObject[0]);
  
  if(selectedObject.length === 0){
    return {flag:'errSelect', message:'Please select frame'};
  }
  else if(node.type !== 'FRAME') {
    return {flag:'errFrame', message:'Please select frame'};
  }
  else if(data.markerText.length < 1) {
    return {flag:'errText', message:'Please write Marker text'};
  }
  else if(data.descriptionText.length < 1) {
    return {flag:'errText', message:'Please write description text'};
  }
  else if(componentPage === undefined) {
    return {flag:'errPage', message:'Can not find _component Page'};
  } 
  else if(pageFrame === undefined) {
    return {flag:'errFrame', message:'Can not find _markers frame'};
  } 
  else if(marker === undefined) {
    return {flag:'errComponent', message:'Can not find marker'};
  }
    
  //description 그룹 있는지 체크
  let descriptionFrame = node.findChild(n => n.name=='description');
  if(descriptionFrame === null){
    const tmp = figma.createFrame();
    tmp.name = 'description';
    tmp.locked = true;
    tmp.fills = [];
    tmp.resize(node.width, node.height);
    tmp.clipsContent = false;
    node.appendChild(tmp);
    descriptionFrame = node.findChild(n => n.name=='description');
    if(node.layoutMode !== 'NONE'){
      descriptionFrame.layoutPositioning = "ABSOLUTE";
    }
    descriptionFrame.x = 0;
    descriptionFrame.y = 0;
  }
  //list 있는지 체크
  let listFrame = descriptionFrame.findChild(n => n.name=='list');
  if(listFrame === null) {
    const tmp = figma.createFrame();
    tmp.name = 'list';
    tmp.x = descriptionFrame.width + 50;
    tmp.resize(300, tmp.height);
    tmp.cornerRadius = 10;
    tmp.paddingTop = 10;
    tmp.paddingBottom = 10;
    tmp.paddingLeft = 10;
    tmp.paddingRight = 10;
    tmp.clipsContent = true;
    tmp.primaryAxisAlignItems = "MIN";
    tmp.layoutPositioning = "AUTO";
    tmp.layoutAlign = "STRETCH";
    tmp.counterAxisAlignItems = "MIN";
    tmp.layoutMode = "VERTICAL";
    tmp.layoutGrow = 1;
    tmp.primaryAxisSizingMode = "AUTO";
    tmp.counterAxisSizingMode = "FIXED";
  
    descriptionFrame.appendChild(tmp);
    listFrame = descriptionFrame.findChild(n => n.name=='list');
  }
  //markers 있는지 체크
  let markersFrame = descriptionFrame.findChild(n => n.name=='markers');
  if(markersFrame === null) {
    const tmp = figma.createFrame();
    tmp.name = 'markers';
    tmp.resize(node.width, node.height);
    tmp.fills = [];
    tmp.clipsContent = false;
  
    descriptionFrame.appendChild(tmp);
    markersFrame = descriptionFrame.findChild(n => n.name=='markers');
  }

  //marker 있는지 체크
  const checkMarker = descriptionFrame.getPluginDataKeys().includes(id);
  if(!checkMarker) {
    //없으면 양쪽에 추가
    const tmp1 = marker.createInstance();
    tmp1.x = x - 20;
    tmp1.y = y - 20;
    loadFonts().then(() => {
      tmp1.children[1].characters = data.markerText;
      markersFrame.appendChild(tmp1);
      //새로 입력된 데이터 일단 저장
      descriptionFrame.setPluginData(id, JSON.stringify(data));
      console.log(id, x, y, data, checkMarker);
      return {flag:'success', message:''};
    });
  }
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