export const getTable = () => {
  const selectedObject = figma.currentPage.selection;
  const data: { selectTableCheck: boolean | null, tableCols: number | null, tableRows: number | null, tableColGroup: object | null} = {
    selectTableCheck: false,
    tableCols: 2,
    tableRows: 2,
    tableColGroup: [
      { value: 'fill', selected: 'fill' },
      { value: 'fill', selected: 'fill' }
    ]
  };
  console.log(selectedObject);
	if(selectedObject[0].name === 'table') { 
    data.tableCols = selectedObject[0]?.children[0].children[0].children.length;
    data.tableRows = selectedObject[0]?.children[1].children.length + 1;
    data.selectTableCheck = true;
  } else {
    data.selectTableCheck = false;
  }
  // selectTableCheck = msg.data.selectTableCheck;
  // tableInfo = msg.data.tableInfo;
  const res = {
    action: 'getTable',
    flag: 'success',
    data: data
  };
  console.log(res);
  figma.ui.postMessage(res);
}