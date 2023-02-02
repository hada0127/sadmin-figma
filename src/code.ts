import { getCode } from './lib/util/export/getCode';
import { addPage } from './lib/util/wireframe/addPage';
import { drawGrid } from './lib/util/wireframe/drawGrid';
import { getInfo } from './lib/util/wireframe/getInfo';
import { addComponents } from './lib/util/wireframe/addComponents';
import { addTable } from './lib/util/wireframe/addTable';

figma.showUI(__html__, {themeColors: true, width: 300, height: 400});

figma.ui.onmessage = msg => {
	if (msg.type === 'getCode') {
		getCode(msg);
	} else if(msg.type === 'addPage'){
		addPage(msg, msg.data);
	} else if(msg.type === 'drawGrid'){
		drawGrid(msg, msg.data);
	} else if(msg.type === 'getInfo'){
		getInfo(msg);
	} else if(msg.type === 'addComponents'){
		addComponents(msg, msg.data);
	} else if(msg.type === 'addTable'){
		addTable(msg, msg.data);
	}
};