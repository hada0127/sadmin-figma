import { getCode } from './lib/getCode';

figma.showUI(__html__, {themeColors: true, width: 300, height: 400});

figma.ui.onmessage = msg => {
	if (msg.type === 'getCode') {
		const node = figma.currentPage.selection[0];
		const data = getCode(node);
		//console.log(node);
		const res = {
			flag:'getCode',
			data: data
		};
		figma.ui.postMessage(res);
	}
};