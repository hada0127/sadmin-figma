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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComponent(node, depth) {
    var _a;
    //Properties
    let prop = '';
    let res = '';
    const nl = depth > 0 ? `\n` : '';
    let res_start = '';
    let res_end = '';
    let res_component = '';
    const name = node.name;
    if (node.children && ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        let label = '';
        let guideText = '';
        let fieldClass = '';
        if (name === 'Button') { // Button
            const color = node.componentProperties.class.value;
            const style = node.componentProperties.style.value;
            let inputClass = color === 'basic' ? '' : ` ${color}`;
            inputClass += style === 'basic' ? '' : ` ${style}`;
            let value = '';
            let iconLeft = '';
            let iconRight = '';
            console.log(node.componentProperties);
            for (const child of node.children) {
                if (child.name === 'button') {
                    value = child.characters;
                }
                else if (child.visible && child.name === 'iconLeft') {
                    iconLeft = ` iconLeft="${child.componentProperties.select.value}"`;
                }
                else if (child.visible && child.name === 'iconRight') {
                    iconRight = ` iconRight="${child.componentProperties.select.value}"`;
                }
            }
            inputClass = inputClass.length > 0 ? ` class="${inputClass.trim()}"` : '';
            prop = `${iconLeft}${iconRight}${inputClass}`;
            res_component = `<${name}${prop}>${value}</${name}>`;
        } // Button
        else { // Components with Field 
            for (const child of node.children) {
                if (child.visible === true) {
                    if (child.name === 'Label') { // Field Label
                        let labelText = '';
                        let requiredText = '';
                        for (const childDepth2 of child.children) {
                            if (childDepth2.name === 'Title') {
                                labelText = childDepth2.characters;
                            }
                            if (childDepth2.name === '*') {
                                requiredText = ' required';
                            }
                        }
                        label = ` label="${labelText}"${requiredText}`;
                    } // Field Label  
                    else if (child.name === 'Guide Text') { // Field Guide Text
                        const color = child.componentProperties.class.value;
                        guideText = ` memo="${child.children[0].characters}"`;
                        fieldClass = color === 'basic' ? '' : ` class="${color}"`;
                    } // Field Guide Text
                    else if (child.name === 'input-class') { // Input
                        const color = child.componentProperties.class.value;
                        let inputClass = color === 'basic' ? '' : ` ${color}`;
                        let placeholder = '';
                        let value = '';
                        let iconLeft = '';
                        let iconRight = '';
                        for (const childDepth2 of child.children) {
                            if (childDepth2.name === 'placeholder') {
                                if (color === 'is-static') {
                                    value = childDepth2.characters;
                                }
                                else {
                                    placeholder = childDepth2.characters;
                                }
                            }
                            else if (childDepth2.visible && childDepth2.name === 'iconLeft') {
                                iconLeft = ` iconLeft="${childDepth2.componentProperties.select.value}"`;
                            }
                            else if (childDepth2.visible && childDepth2.name === 'iconRight') {
                                iconRight = ` iconRight="${childDepth2.componentProperties.select.value}"`;
                            }
                        }
                        value = value.length > 0 ? `value="${value.trim()}"` : '';
                        placeholder = placeholder.length > 0 ? `placeholder="${placeholder.trim()}"` : '';
                        inputClass = inputClass.length > 0 ? ` class="${inputClass.trim()}"` : '';
                        prop = `${value}${placeholder}${iconLeft}${iconRight}${inputClass}`;
                        res_component = `<${name} ${prop} />`;
                    } // Input
                    else if (child.name === 'select-class') { // Select
                        const color = child.componentProperties.class.value;
                        let inputClass = color === 'basic' ? '' : ` ${color}`;
                        let value = '';
                        let iconLeft = '';
                        for (const childDepth2 of child.children[0].children) {
                            if (childDepth2.name === 'text') {
                                value = childDepth2.characters;
                            }
                            else if (childDepth2.visible && childDepth2.name === 'iconLeft') {
                                iconLeft = ` iconLeft="${childDepth2.componentProperties.select.value}"`;
                            }
                        }
                        inputClass = inputClass.length > 0 ? ` class="${inputClass.trim()}"` : '';
                        prop = `${iconLeft}${inputClass}`;
                        res_component = `<${name} ${prop}>`;
                        res_component += `\n` + `  `.repeat(depth + 2) + `<option>${value}</option>`;
                        res_component += `\n` + `  `.repeat(depth + 1) + `</${name}>`;
                    } // Select
                    else if (child.name === 'toggle-class') { // Toggle
                        const color = child.componentProperties.class.value;
                        prop = color === 'basic' ? '' : ` class="${color}"`;
                        res_component = `<${name} ${prop} />`;
                    }
                } // vidible
                console.log(res_component);
            } // child loop
        }
        res_start += nl + `  `.repeat(depth) + `<Field${label}${guideText}${fieldClass}>`;
        res_end += `\n` + `  `.repeat(depth) + `</Field>`;
        depth++;
    }
    res = `${res_start}`;
    res += `\n` + `  `.repeat(depth) + res_component;
    res += `${res_end}`;
    return res;
}

const getCode = (node, depth = 0) => {
    var _a, _b, _c, _d, _e;
    const nl = depth > 0 ? `\n` : ``;
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
        let flag = 'fail';
        if (figma.currentPage.selection.length > 0) {
            for (const node of figma.currentPage.selection) {
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
//# sourceMappingURL=code.js.map
