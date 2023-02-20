import { getFrameTop } from './addMarker';
import { getMarker } from './getMarker';

const removeMarkerSet = (id, node, descriptionFrame) => {
  const listFrame = descriptionFrame.findChild(el => el.name=='list');
  const markersFrame = descriptionFrame.findChild(el => el.name=='markers');

  markersFrame.findChild(el => el.getPluginData('id') === id)?.remove();
  listFrame.findChild(el => el.getPluginData('id') === id)?.remove();

  //원본 id 정보도 삭제
  node.findAll(el => el.getPluginData('id') === id)[0]?.setPluginData('id','');
  descriptionFrame.setPluginData(id,'');
}

export const detectDeleteMarker = (frameId) => {
  const selectedObject = figma.currentPage.findOne(el => el.id === frameId);
  const [ node ] = getFrameTop(selectedObject);
  const descriptionFrame = node?.findChild(el => el.name=='description');
  const checkProperties = descriptionFrame?.getPluginDataKeys();

  if(checkProperties.length > 0) {
    const original = descriptionFrame.getPluginDataKeys();
    const listFrame = descriptionFrame.findChild(el => el.name=='list');
    const markersFrame = descriptionFrame.findChild(el => el.name=='markers');
    if(original.length !== listFrame.children.length || original.length !== markersFrame.children.length){
      if(original.length > listFrame.children.length) { //listFrame에 삭제 된거 있나 확인
        const list = listFrame.children.map(el => el.getPluginData('id'));
        const removeId = original.filter(ori => !list.includes(ori))[0];
        removeMarkerSet(removeId, node, descriptionFrame);
      }
      else if(original.length > markersFrame.children.length) { //markersFrame에 삭제 된거 있나 확인
        const list = markersFrame.children.map(el => el.getPluginData('id'));
        const removeId = original.filter(ori => !list.includes(ori))[0];
        removeMarkerSet(removeId, node, descriptionFrame);
      }
    }
    else { //원본이 삭제 된거 있나 확인
      for(const item of original){
        if(node.findAll(el => el.id === item).length === 0){
          removeMarkerSet(item, node, descriptionFrame);
        }
      }
    }
    
    getMarker();

    const res = {
      action: 'detectDeleteMarker',
      flag: 'success',
      message: ''
    };
    figma.ui.postMessage(res);
  }
}