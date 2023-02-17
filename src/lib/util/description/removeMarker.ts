import { getFrameTop } from './addMarker';
import { getMarker } from './getMarker';

const get = () => {
  const selectedObject = figma.currentPage.selection;
  
  if(selectedObject.length === 0){
    return {flag:'errSelect', message:'Please select object'};
  }

  const id = selectedObject[0].getPluginData('id');
  const [ node ] = getFrameTop(selectedObject[0]);

  if(node.type !== 'FRAME') {
    return {flag:'errFrame', message:'Please select frame or instance'};
  }
    
  const descriptionFrame = node.findChild(el => el.name=='description');
  const listFrame = descriptionFrame.findChild(el => el.name=='list');
  const markersFrame = descriptionFrame.findChild(el => el.name=='markers');

  markersFrame.findChild(el => el.getPluginData('id') === id).remove();
  listFrame.findChild(el => el.getPluginData('id') === id).remove();

  //원본 id 정보도 삭제
  node.findAll(el => el.getPluginData('id') === id)[0].setPluginData('id','');

  descriptionFrame.setPluginData(id, '');

  getMarker();

  return {flag:'success', message:''};
}

export const removeMarker = (msg: any) => {
  const { flag, message } = get();
  const res = {
    action: 'removeMarker',
    flag: flag,
    message: message
  };
  figma.ui.postMessage(res);
}
