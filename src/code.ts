import { getCode } from './lib/util/export/getCode';
import { addPage } from './lib/util/wireframe/addPage';
import { drawGrid, getInfo } from './lib/util/wireframe/drawGrid';

figma.showUI(__html__, {themeColors: true, width: 300, height: 400});

figma.ui.onmessage = msg => {
	if (msg.type === 'getCode') {
		getCode(msg);
	} else if(msg.type === 'addPage'){
		addPage(msg);
	} else if(msg.type === 'drawGrid'){
		drawGrid(msg, msg.data);
	} else if(msg.type === 'getInfo'){
		getInfo(msg);
	}
};