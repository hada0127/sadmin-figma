'use strict';

const componentList = [
    { name: 'table', type: 'INSTANCE', exeType: 'tag' },
    { name: 'thead', type: 'INSTANCE', exeType: 'tag' },
    { name: 'tbody', type: 'INSTANCE', exeType: 'tag' },
    { name: 'tr', type: 'INSTANCE', exeType: 'tag' },
    { name: 'th', type: 'INSTANCE', exeType: 'tag' },
    { name: 'td', type: 'INSTANCE', exeType: 'tag' },
    { name: 'section', type: 'INSTANCE', exeType: 'tag' },
    { name: 'article', type: 'INSTANCE', exeType: 'tag' },
    { name: 'h1', type: 'INSTANCE', exeType: 'tag' },
    { name: 'h2', type: 'INSTANCE', exeType: 'tag' },
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
        if (['Gnb', 'Lnb', 'Titlebar'].includes(name)) { // Gnb, Lnb, Titlebar
            res_component = `<${name} />`;
        } // Gnb, Lnb, Titlebar
        else if (name === 'Button') { // Button
            const color = node.componentProperties.class.value;
            const style = node.componentProperties.style.value;
            let inputClass = color === 'basic' ? '' : ` ${color}`;
            inputClass += style === 'basic' ? '' : ` ${style}`;
            let value = '';
            let iconLeft = '';
            let iconRight = '';
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
        else if (name === 'Tabs' || name === 'Tabs-is-boxed') { // Tabs
            const tabsArr = [];
            for (const child of node.children) {
                if (child.visible === true) {
                    const obj = new Object();
                    const text = child.children[0].characters;
                    const checked = child.componentProperties.checked.value;
                    obj['name'] = text;
                    if (checked === 'true') {
                        obj['checked'] = true;
                    }
                    tabsArr.push(obj);
                }
            }
            prop = name === 'Tabs-is-boxed' ? ` class="is-boxed"` : '';
            res_component = `<Tabs tabs={${JSON.stringify(tabsArr)}}${prop} />`;
        } // Tabs
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
                    else if (child.name === 'select-multiple-class') { // Select-multiple
                        prop = child.name === 'select-multiple-class' ? ` multiple size="5"` : '';
                        res_component = `<${name.split('-')[0]} ${prop}>`;
                        res_component += `\n` + `  `.repeat(depth + 2) + `<option>Sample</option>`;
                        res_component += `\n` + `  `.repeat(depth + 1) + `</${name.split('-')[0]}>`;
                    } // Select-multiple
                    else if (child.name === 'textarea-class') { // Textarea
                        const color = child.componentProperties.class.value;
                        let placeholder = child.children[0].characters;
                        prop = color === 'basic' ? '' : ` class="${color}"`;
                        placeholder = placeholder.length > 0 ? ` placeholder="${placeholder.trim()}"` : '';
                        res_component = `<${name}${placeholder}${prop} />`;
                    } // Textarea
                    else if (child.name === 'editor-class') { // Editor
                        let placeholder = child.children[0].children[1].characters;
                        placeholder = placeholder.length > 0 ? ` placeholder="${placeholder.trim()}"` : '';
                        res_component = `<${name}${placeholder} />`;
                    } // Editor
                    else if (child.name === 'toggle-class' || child.name === 'file-class' || child.name === 'file-is-boxed-class') { // Toggle, File
                        const color = child.componentProperties.class.value;
                        const isBoxed = child.name === 'file-is-boxed-class' ? ' is-boxed' : '';
                        prop = color === 'basic' ? '' : ` class="${color}${isBoxed}"`;
                        res_component = `<${name.split('-')[0]}${prop} />`;
                    } // Toggle, File
                    else if (child.name === 'radio-class' || child.name === 'checkbox-class') { // Radio, Checkbox
                        let nl = '';
                        for (const childDepth2 of child.children) {
                            if (childDepth2.visible === true) {
                                let checked = childDepth2.componentProperties.State.value;
                                checked = checked === 'checked' ? ' checked' : '';
                                res_component += nl + `<label>`;
                                res_component += `\n` + `  `.repeat(depth + 2) + `<input type="${child.name.split('-')[0]}"${checked}>`;
                                res_component += `\n` + `  `.repeat(depth + 2) + childDepth2.children[0].children[1].characters;
                                res_component += `\n` + `  `.repeat(depth + 1) + `</label>`;
                                nl = `\n` + `  `.repeat(depth + 1);
                            }
                        }
                    } // Radio, Checkbox
                    else if (child.name === 'date-class') { // Date
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
                        value = value.length > 0 ? ` value="${value.trim()}"` : '';
                        inputClass = inputClass.length > 0 ? ` class="${inputClass.trim()}"` : '';
                        prop = `${value}${iconLeft}${inputClass}`;
                        res_component = `<${name}${prop} />`;
                    } // Date
                    else {
                        console.log(node.name, child.name, child);
                        res_component = `<${name} />`;
                    }
                } // vidible
            } // child loop
            res_start += nl + `  `.repeat(depth) + `<Field${label}${guideText}${fieldClass}>`;
            res_end += `\n` + `  `.repeat(depth) + `</Field>`;
            depth++;
        }
    }
    res = `${res_start}`;
    res += `\n` + `  `.repeat(depth) + res_component;
    res += `${res_end}`;
    return res;
}
//# sourceMappingURL=getComponent.js.map

const get = (node, depth = 0) => {
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
    else if (((_b = componentList.filter((el) => el.name === node.name)[0]) === null || _b === void 0 ? void 0 : _b.exeType) === 'tag') { //tag
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
            res += get(child, depth + 1);
        }
    }
    res += res_end;
    return res;
};
const getCode = (msg) => {
    let data = '';
    let flag = 'fail';
    let message = 'Please select Object';
    if (figma.currentPage.selection.length > 0) {
        for (const node of figma.currentPage.selection) {
            data += get(node);
        }
        flag = 'success';
        message = '';
    }
    const res = {
        action: 'getCode',
        flag: flag,
        message: message,
        data: data
    };
    figma.ui.postMessage(res);
};
//# sourceMappingURL=getCode.js.map

const get$1 = () => {
    const componentPage = figma.root.children.find(el => el.name === '_component');
    const pageFrame = componentPage === null || componentPage === void 0 ? void 0 : componentPage.children.find(el => el.name === '_page');
    const page = figma.currentPage;
    if (componentPage === undefined) {
        return { flag: 'errPage', message: 'Can not find _component Page' };
    }
    else if (pageFrame === undefined) {
        return { flag: 'errFrame', message: 'Can not find _page frame' };
    }
    const instance = pageFrame.clone();
    figma.currentPage.appendChild(instance);
    if (page.children.length > 1) {
        const lastChild = page.children.length - 2;
        instance.x = page.children[lastChild].x + page.children[lastChild].width + 100;
    }
    return { flag: 'success', message: '' };
};
const addPage = (msg) => {
    const { flag, message } = get$1();
    const res = {
        action: 'addPage',
        flag: flag,
        message: message
    };
    figma.ui.postMessage(res);
};
//# sourceMappingURL=addPage.js.map

const draw = (rule) => {
    const selectedObject = figma.currentPage.selection;
    if (!Array.isArray(rule)) {
        return { flag: 'errArray', message: 'Data is not Array' };
    }
    const sum = rule.reduce((a, b) => a + b, 0);
    if (sum !== 12) {
        return { flag: 'errSum', message: 'The sum of the grid numbers must be 12' };
    }
    if (selectedObject.length === 0) {
        return { flag: 'errSelect', message: 'Please select object' };
    }
    if (selectedObject[0].type !== 'FRAME') {
        return { flag: 'errFrame', message: 'Please select frame' };
    }
    const frame = figma.createFrame();
    frame.name = 'columns';
    frame.clipsContent = true;
    frame.primaryAxisSizingMode = "FIXED";
    frame.primaryAxisAlignItems = "MIN";
    frame.layoutMode = "HORIZONTAL";
    frame.layoutPositioning = "AUTO";
    frame.layoutAlign = "STRETCH";
    frame.layoutGrow = 0;
    frame.counterAxisAlignItems = "MIN";
    frame.counterAxisSizingMode = "AUTO";
    frame.itemSpacing = 10;
    frame.paddingTop = 10;
    frame.paddingBottom = 10;
    frame.verticalPadding = 10;
    selectedObject[0].appendChild(frame);
    return { flag: 'success', message: '' };
    //  figma.currentPage.appendChild(instance);
    // if (page.children.length > 1) {
    // 	const lastChild = page.children.length - 2;
    // 	instance.x = page.children[lastChild].x + page.children[lastChild].width + 100;
    // }
};
const drawGrid = (msg, rule) => {
    const { flag, message } = draw(rule);
    const res = {
        action: 'drawGrid',
        flag: flag,
        message: message
    };
    figma.ui.postMessage(res);
};
const getInfo = (msg) => {
    const selectedObject = figma.currentPage.selection;
    console.log(selectedObject[0]);
    const res = {
        action: 'getInfo',
        flag: 'success'
    };
    figma.ui.postMessage(res);
};

figma.showUI(__html__, { themeColors: true, width: 300, height: 400 });
figma.ui.onmessage = msg => {
    if (msg.type === 'getCode') {
        getCode();
    }
    else if (msg.type === 'addPage') {
        addPage();
    }
    else if (msg.type === 'drawGrid') {
        drawGrid(msg, msg.data);
    }
    else if (msg.type === 'getInfo') {
        getInfo();
    }
};
//# sourceMappingURL=code.js.map
