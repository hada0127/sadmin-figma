import { getFrameTop } from './addMarker';

/* eslint-disable no-unsafe-optional-chaining */
export const getMarker = () => {
  const data: { selectMarkerCheck: boolean, markerText: string | null, descriptionText: string | null, markerColor: string | null} = {
    selectMarkerCheck: false,
    markerText: null,
    descriptionText: null,
    markerColor: null
  };
  let res = {
    action: 'getMarker',
    flag: 'success',
    data: data
  };

  const selectedObject = figma.currentPage.selection;

  if(selectedObject.length > 0){
    const [ node ] = getFrameTop(selectedObject[0]);
    if(node.type !== 'TEXT'){
      const descriptionFrame = node?.findChild(el => el.name=='_description');
      if(selectedObject[0]?.getPluginDataKeys().includes('id')
        && descriptionFrame !== null
      ) { 
        const id = selectedObject[0].getPluginData('id');
        if(!!descriptionFrame.getPluginData(id) === true){ //삭제가 아니면
          const tmp = JSON.parse(descriptionFrame.getPluginData(id));
  
          //변경되었는지 체크
          const listFrame = descriptionFrame.findChild(el => el.name=='list');
          const markerText = listFrame.children.find(el => el.getPluginData('id') === id).children[0].children[1].characters;
          const descriptionText = listFrame.children.find(el => el.getPluginData('id') === id).children[1].characters;
          if(tmp.markerText !== markerText || tmp.descriptionText !== descriptionText){
            const data = {
              markerText,
              descriptionText
            }
            
            descriptionFrame.setPluginData(id, JSON.stringify(data));
          }
          
          data.selectMarkerCheck = true;
          data.markerText = tmp.markerText;
          data.descriptionText = tmp.descriptionText;
          data.markerColor = tmp.markerColor;
        }

        res = {
          action: 'getMarker',
          flag: 'success',
          data: data
        };
      }
    }

  }
  figma.ui.postMessage(res);
}