import { getCode } from './lib/util/export/getCode';
import { addPage } from './lib/util/wireframe/addPage';
import { drawGrid } from './lib/util/wireframe/drawGrid';
import { drawBorderBox } from './lib/util/wireframe/drawBorderBox';
import { getInfo } from './lib/util/wireframe/getInfo';
import { addComponents } from './lib/util/wireframe/addComponents';
import { addTable } from './lib/util/wireframe/addTable';
import { getTable } from './lib/util/wireframe/getTable';
import { setTable } from './lib/util/wireframe/setTable';
import { removeTableColumn } from './lib/util/wireframe/removeTableColumn';
import { changeTableOrder } from './lib/util/wireframe/changeTableOrder';
import { addMarker } from './lib/util/description/addMarker';
import { getMarker } from './lib/util/description/getMarker';
import { removeMarker } from './lib/util/description/removeMarker';
import { detectDeleteMarker } from './lib/util/description/detectMarker';

figma.showUI(__html__, {themeColors: true, width: 300, height: 400});

figma.ui.onmessage = msg => {
	if (msg.type === 'getCode') {
		getCode(msg);
	} else if(msg.type === 'addPage'){
		addPage(msg, msg.data);
	} else if(msg.type === 'drawGrid'){
		drawGrid(msg, msg.data);
	} else if(msg.type === 'drawBorderBox'){
		drawBorderBox(msg);
	} else if(msg.type === 'getInfo'){
		getInfo(msg);
	} else if(msg.type === 'addComponents'){
		addComponents(msg, msg.data);
	} else if(msg.type === 'addTable'){
		addTable(msg, msg.data);
	} else if(msg.type === 'setTable'){
		setTable(msg, msg.data);
	} else if(msg.type === 'removeTableColumn'){
		removeTableColumn(msg, msg.data);
	} else if(msg.type === 'changeTableOrder'){
		changeTableOrder(msg, msg.data);
	} else if(msg.type === 'addMarker'){
		addMarker(msg, msg.data);
	} else if(msg.type === 'removeMarker'){
		removeMarker(msg);
	} else if(msg.type === 'error'){
		figma.notify(msg.message, {
			timeout: 3000,
			error: true
		});
	} else {
		console.log(msg);
	}
};

figma.on('selectionchange', ()=> {
	const lastSelection = figma.currentPage.selection[0];
	const lastSelectionParent = figma.currentPage.selection[0]?.parent?.id;
	if(lastSelection) {
		getTable();
		getMarker();
	}
	if(lastSelection?.parent?.type === 'PAGE' || lastSelection === null){
		figma.currentPage.setPluginData('sadmin-last-selection', '');
	}
	else if(lastSelectionParent) {
		figma.currentPage.setPluginData('sadmin-last-selection', lastSelectionParent);
	}
})
figma.on("documentchange", (event) => {
	for (const change of event.documentChanges) {
		switch (change.type) {
			case "DELETE":
				// eslint-disable-next-line no-case-declarations
				const lastSelectionParent = figma.currentPage.getPluginData('sadmin-last-selection');
				if(lastSelectionParent !== '' && lastSelectionParent !== null){
					detectDeleteMarker(lastSelectionParent);
				}
				break;
		}
	}
});