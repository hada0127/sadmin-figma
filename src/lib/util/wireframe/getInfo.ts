export const getInfo = (msg) => {
  const selectedObject = figma.currentPage.selection;
  console.log(selectedObject);
  const res = {
    action: 'getInfo',
    flag: 'success'
  };
  figma.ui.postMessage(res);
}