import { getCode } from './lib/util/export/getCode';

figma.showUI(__html__, {themeColors: true, width: 300, height: 400});

figma.ui.onmessage = msg => {
	if (msg.type === 'getCode') {
		let data = '';
		let flag = 'fail';
		if(figma.currentPage.selection.length > 0){
			for(const node of figma.currentPage.selection){
				data += getCode(node);
			}	
			flag = 'success';
		}
		const res = {
			action: 'getCode',
			flag: flag,
			data: data
		};
		figma.ui.postMessage(res);
	}
};