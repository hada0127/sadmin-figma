import { getMarker } from './getMarker';

export const getFrameTop = (node , x=0, y=0) => {
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

const get =  async (data) => {
  const componentPage = figma.root.children.find(el => el.name === '_component');
  const pageFrame = componentPage?.children.find(el => el.name === '_markers');
  const marker = pageFrame?.children.find(el => el.name === 'marker');
  const descriptionItem = pageFrame?.children.find(el => el.name === 'descriptionItem');

  const selectedObject = figma.currentPage.selection;
  
  if(selectedObject.length === 0){
    return {flag:'errSelect', message:'Please select object'};
  }

  const id = selectedObject[0].id;
  const [ node, x, y ] = getFrameTop(selectedObject[0]);

  if(node.type !== 'FRAME') {
    return {flag:'errFrame', message:'Please select frame or instance'};
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
  let descriptionFrame = node.findChild(el => el.name=='_description');
  if(descriptionFrame === null){
    const tmp = figma.createFrame();
    tmp.name = '_description';
    tmp.locked = true;
    tmp.fills = [];
    tmp.resize(node.width, node.height);
    tmp.clipsContent = false;
    node.appendChild(tmp);
    descriptionFrame = node.findChild(el => el.name=='_description');
    if(node.layoutMode !== 'NONE'){
      descriptionFrame.layoutPositioning = "ABSOLUTE";
    }
    descriptionFrame.x = 0;
    descriptionFrame.y = 0;
  }
  //list 있는지 체크
  let listFrame = descriptionFrame.findChild(el => el.name=='list');
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
    tmp.itemSpacing = 10;
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
    listFrame = descriptionFrame.findChild(el => el.name=='list');
  }
  //markers 있는지 체크
  let markersFrame = descriptionFrame.findChild(el => el.name=='markers');
  if(markersFrame === null) {
    const tmp = figma.createFrame();
    tmp.name = 'markers';
    tmp.resize(node.width, node.height);
    tmp.fills = [];
    tmp.clipsContent = false;
  
    descriptionFrame.appendChild(tmp);
    markersFrame = descriptionFrame.findChild(el => el.name === 'markers');
  }

  let color = {r: 1, g: 0, b: 0};
  switch (data.markerColor) {
    case 'yellow':
      color = {r: 0.9882, g: 0.7254, b: 0};
      break;
    case 'green':
      color = {r: 0.2941, g: 0.7843, b: 0.4313};
      break;
    case 'blue':
      color = {r: 0.2039, g: 0.5019, b: 0.8196};
      break;
  }

  //marker 있는지 체크
  const checkMarker = descriptionFrame.getPluginDataKeys().includes(id);
  if(!checkMarker) {
    //없으면 양쪽에 추가
    const tmp1 = marker.createInstance();
    tmp1.name = `marker - ${data.markerText}`;
    tmp1.x = x - 20;
    tmp1.y = y - 20;

    tmp1.children.find(el => el.type === 'ELLIPSE').fills = [{
      type: "SOLID",
      blendMode: "NORMAL",
      opacity: 1,
      visible: true,
      color: color
    }];

    const tmp2 = descriptionItem.createInstance();
    tmp2.name = `descriptionItem - ${data.markerText}`;
    tmp2.children[0].children.find(el => el.type === 'ELLIPSE').fills = [{
      type: "SOLID",
      blendMode: "NORMAL",
      opacity: 1,
      visible: true,
      color: color
    }];
    tmp1.setPluginData('id', id);
    tmp2.setPluginData('id', id);
    selectedObject[0].setPluginData('id', id);

    await loadFonts().then(() => {
      tmp1.children[1].characters = data.markerText;
      markersFrame.appendChild(tmp1);

      tmp2.children[0].children[1].characters = data.markerText;
      tmp2.children[1].characters = data.descriptionText;
      listFrame.appendChild(tmp2);

    });
  } else {
    //이미 있으면
    await loadFonts().then(() => {
      markersFrame.children.find(el => el.getPluginData('id') === id).children[1].characters = data.markerText;
      markersFrame.children.find(el => el.getPluginData('id') === id).children[0].fills = [{
        type: "SOLID",
        blendMode: "NORMAL",
        opacity: 1,
        visible: true,
        color: color
      }];

      listFrame.children.find(el => el.getPluginData('id') === id).children[0].children[1].characters = data.markerText;
      listFrame.children.find(el => el.getPluginData('id') === id).children[0].children[0].fills = [{
        type: "SOLID",
        blendMode: "NORMAL",
        opacity: 1,
        visible: true,
        color: color
      }];
      listFrame.children.find(el => el.getPluginData('id') === id).children[1].characters = data.descriptionText;
    });    
  }
  //새로 입력된 데이터 저장
  await descriptionFrame.setPluginData(id, JSON.stringify(data));

  getMarker();

  return {flag:'success', message:''};
}

export const addMarker = async (msg: any, data: any) => {
  const { flag, message } = await get(data);
  const res = {
    action: 'addMarker',
    flag: flag,
    message: message
  };
  figma.ui.postMessage(res);
}