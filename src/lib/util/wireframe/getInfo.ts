export const getInfo = (msg) => {
  const selectedObject = figma.currentPage.selection;
  console.log(selectedObject[0]);
  const res = {
    action: 'getInfo',
    flag: 'success'
  };
  figma.ui.postMessage(res);
}