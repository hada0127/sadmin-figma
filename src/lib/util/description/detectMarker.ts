import { getFrameTop } from './addMarker';
import { getMarker } from './getMarker';

const removeMarkerSet = (id) => {
  const selectedObject = figma.currentPage.selection;

  const [ node ] = getFrameTop(selectedObject[0]);
    
  const descriptionFrame = node?.findChild(el => el.name=='description');

  const listFrame = descriptionFrame.findChild(el => el.name=='list');
  const markersFrame = descriptionFrame.findChild(el => el.name=='markers');

  markersFrame.findChild(el => el.getPluginData('id') === id).remove();
  listFrame.findChild(el => el.getPluginData('id') === id).remove();

  //원본 id 정보도 삭제
  node.findAll(el => el.getPluginData('id') === id)[0].setPluginData('id','');
}

export const detectDeleteMarker = () => {
  const selectedObject = figma.currentPage.selection;
  
  if(selectedObject.length > 0){
    const [ node ] = getFrameTop(selectedObject[0]);
    
    const descriptionFrame = node?.findChild(el => el.name=='description');
    const checkMarker = descriptionFrame?.getPluginDataKeys();
    console.log(checkMarker);
    if(!checkMarker) {
      const original = descriptionFrame.getPluginDataKeys();
      const listFrame = descriptionFrame.findChild(el => el.name=='list');
      const markersFrame = descriptionFrame.findChild(el => el.name=='markers');

      console.log(original);
      //listFrame에 삭제 된거 있나 확인

      //markersFrame에 삭제 된거 있나 확인

      //원본이 삭제 된거 있나 확인
  
      //removeMarkerSet(id);

      getMarker();
    
      const res = {
        action: 'detectDeleteMarker',
        flag: 'success',
        message: ''
      };
      figma.ui.postMessage(res);
    }
  }
}