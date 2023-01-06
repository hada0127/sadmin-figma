'use strict';

const componentList = [
    { name: 'table', type: 'INSTANCE', exeType: 'table' },
    { name: 'thead', type: 'INSTANCE', exeType: 'table' },
    { name: 'tbody', type: 'INSTANCE', exeType: 'table' },
    { name: 'tr', type: 'INSTANCE', exeType: 'table' },
    { name: 'th', type: 'INSTANCE', exeType: 'table' },
    { name: 'td', type: 'INSTANCE', exeType: 'table' },
    { type: 'TEXT', exeType: 'text' },
    { type: 'COMPONENT', exeType: 'component' },
];
//# sourceMappingURL=componentList.js.map

function getComponent(node, depth) {
    var _a;
    //Properties
    let prop = '';
    let res = '';
    let res_start = '';
    let res_end = '';
    let labelText = '';
    let requiredText = '';
    let name = node.name;
    //console.log(node);
    if (node.children && ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        for (const child of node.children) {
            if (child.name === 'Label') {
                for (const childDepth2 of child.children) {
                    if (childDepth2.name === 'Title') {
                        labelText = childDepth2.characters;
                    }
                    if (childDepth2.name === '*') {
                        requiredText = ' required';
                    }
                }
                res_start += `\n` + `  `.repeat(depth) + `<Field label="${labelText}"${requiredText}>`;
                res_end += `\n` + `  `.repeat(depth) + `</Field>`;
                depth++;
            }
        }
    }
    res = `${res_start}`;
    res += `\n` + `  `.repeat(depth) + `<${name} ${prop} />`;
    res += `${res_end}`;
    return res;
}

const getCode = (node, depth = 0) => {
    var _a, _b, _c, _d, _e;
    let nl = depth > 0 ? `\n` : ``;
    let name = node.name;
    //행열 처리
    if (node.parent.name === 'columns') {
        name = `column ${name}`;
    }
    let res = '';
    let res_end = '';
    let childSearch = true;
    if (((_a = componentList.filter((el) => el.type === node.type)[0]) === null || _a === void 0 ? void 0 : _a.exeType) === 'text') { //TextNode
        res = nl + `  `.repeat(depth) + node.characters;
        childSearch = false;
    }
    else if (((_b = componentList.filter((el) => el.name === node.name)[0]) === null || _b === void 0 ? void 0 : _b.exeType) === 'table') { //table
        res = nl + `  `.repeat(depth) + `<${name}>`;
        res_end += `\n` + `  `.repeat(depth) + `</${name}>`;
    }
    else if (((_c = componentList.filter((el) => el.type === node.type)[0]) === null || _c === void 0 ? void 0 : _c.exeType) === 'component' || ((_d = componentList.filter((el) => { var _a; return el.type === ((_a = node.masterComponent) === null || _a === void 0 ? void 0 : _a.type); })[0]) === null || _d === void 0 ? void 0 : _d.exeType) === 'component') { //Component
        res = getComponent(node, depth);
        childSearch = false;
    }
    else {
        res = nl + `  `.repeat(depth) + `<div class="${name}">`;
        res_end += `\n` + `  `.repeat(depth) + `</div>`;
    }
    //text나 component가 아니면 하위 탐색
    if (childSearch && node.children && ((_e = node.children) === null || _e === void 0 ? void 0 : _e.length) > 0) {
        for (const child of node.children) {
            res += getCode(child, depth + 1);
        }
    }
    res += res_end;
    return res;
};
//# sourceMappingURL=getCode.js.map

figma.showUI(__html__, { themeColors: true, width: 300, height: 400 });
figma.ui.onmessage = msg => {
    if (msg.type === 'getCode') {
        let data = '';
        for (const node of figma.currentPage.selection) {
            data += getCode(node);
            //console.log(node);
        }
        const res = {
            flag: 'getCode',
            data: data
        };
        figma.ui.postMessage(res);
    }
};
//# sourceMappingURL=code.js.map
