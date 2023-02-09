/* eslint-disable no-unsafe-optional-chaining */
export const getTable = () => {
  let res;
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
	if(selectedObject[0]?.name === 'table'
    && selectedObject[0]?.children[0]?.name === 'thead'
    && selectedObject[0]?.children[0]?.children[0]?.name === 'tr'
    && selectedObject[0]?.children[0]?.children[0]?.children[0]?.name === 'th'
  ) { 

    const tableColGroup = [];

    for(const th of selectedObject[0]?.children[0].children[0].children){
      const value = th.layoutGrow === 0 ? th.width:'fill';
      const selected = value === 'fill' ? 'fill':'fixed';
      tableColGroup.push({value, selected});
    }

    data.tableCols = selectedObject[0]?.children[0].children[0].children.length;
    data.tableRows = selectedObject[0]?.children[1].children.length + 1;
    data.tableColGroup = tableColGroup;
    data.selectTableCheck = true;
    res = {
      action: 'getTable',
      flag: 'success',
      data: data
    };
  

  } else {
    data.selectTableCheck = false;
    res = {
      action: 'getTable',
      flag: 'success',
      data: data
    };
    }
  figma.ui.postMessage(res);
}