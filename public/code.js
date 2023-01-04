'use strict';

const getCode = (node, depth = 0, parentName = '') => {
    var _a;
    const nl = depth > 0 ? `\n` : ``;
    let name = node.name;
    if (parentName === 'columns') {
        name = `column ${name}`;
    }
    let res = nl + `  `.repeat(depth) + `<div class="${name}">`;
    console.log(node.children);
    if (node.children && ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        for (const child of node.children) {
            res += getCode(child, depth + 1, name);
        }
    }
    res += `\n` + `  `.repeat(depth) + `</div>`;
    return res;
};

figma.showUI(__html__, { themeColors: true, width: 300, height: 400 });
figma.ui.onmessage = msg => {
    if (msg.type === 'getCode') {
        const node = figma.currentPage.selection[0];
        const data = getCode(node);
        //console.log(node);
        const res = {
            flag: 'getCode',
            data: data
        };
        figma.ui.postMessage(res);
    }
};
//# sourceMappingURL=code.js.map
