import { getCode } from './lib/util/getCode';

figma.showUI(__html__, {themeColors: true, width: 300, height: 400});

figma.ui.onmessage = msg => {
	if (msg.type === 'getCode') {
		let data: string = '';

		for(const node of figma.currentPage.selection){
			data += getCode(node);
			//console.log(node);
		}
		const res = {
			flag:'getCode',
			data: data
		};
		figma.ui.postMessage(res);
	}
};