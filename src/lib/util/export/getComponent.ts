// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getComponent(node:any, depth:number) {
  //Properties
  let prop = '';
  let res = '';
  const nl = depth > 0 ? `\n`:'';
  let res_start = '';
  let res_end = '';
  let res_component = '';
  const name = node.name;
  if(node.children && node.children?.length > 0) {
    let label = '';
    let guideText = '';
    let fieldClass = '';
    if(['Gnb', 'Lnb', 'Titlebar'].includes(name)){ // Gnb, Lnb, Titlebar
      res_component = `<${name} />`;
    } // Gnb, Lnb, Titlebar
    else if(name === 'Button'){ // Button
      const color = node.componentProperties.class.value;
      const style = node.componentProperties.style.value;
      let inputClass = color === 'basic' ? '':` ${color}`;
      inputClass += style === 'basic' ? '':` ${style}`;
      let value = '';
      let iconLeft = '';
      let iconRight = '';
      for(const child of node.children) {
        if(child.name === 'button') {
          value = child.characters;
        }
        else if(child.visible && child.name === 'iconLeft') {
          iconLeft = ` iconLeft="${child.componentProperties.select.value}"`;
        }
        else if(child.visible && child.name === 'iconRight') {
          iconRight = ` iconRight="${child.componentProperties.select.value}"`;
        }
      }
      inputClass = inputClass.length > 0 ? ` class="${inputClass.trim()}"`:'';
      prop = `${iconLeft}${iconRight}${inputClass}`;
      res_component = `<${name}${prop}>${value}</${name}>`;
    } // Button
    else if(name === 'Tabs' || name === 'Tabs-is-boxed') { // Tabs
      const tabsArr = [];
      for(const child of node.children) {
        if(child.visible === true){
          const obj = new Object();
          const text = child.children[0].characters;
          const checked = child.componentProperties.checked.value;
          obj['name'] = text;
          if(checked === 'true'){
            obj['checked'] = true;
          }
          tabsArr.push(obj);
        }
      }
      prop = name === 'Tabs-is-boxed' ? ` class="is-boxed"`:'';
      res_component = `<Tabs tabs={${JSON.stringify(tabsArr)}}${prop} />`;
    } // Tabs
    else { // Components with Field 
      for(const child of node.children) {
        if(child.visible === true){
          if(child.name === 'Label') { // Field Label
            let labelText = '';
            let requiredText = '';
            for(const childDepth2 of child.children) {
              if(childDepth2.name === 'Title') {
                labelText = childDepth2.characters;
              }
              if(childDepth2.name === '*') {
                requiredText = ' required';
              }
            }
            label = ` label="${labelText}"${requiredText}`;
          } // Field Label  
          else if(child.name === 'Guide Text'){ // Field Guide Text
            const color = child.componentProperties.class.value;
            guideText = ` memo="${child.children[0].characters}"`;
            fieldClass = color === 'basic' ? '':` class="${color}"`;
          } // Field Guide Text
          else if(child.name === 'input-class'){ // Input
            const color = child.componentProperties.class.value;
            let inputClass = color === 'basic' ? '':` ${color}`;
            let placeholder = '';
            let value = '';
            let iconLeft = '';
            let iconRight = '';
            for(const childDepth2 of child.children) {
              if(childDepth2.name === 'placeholder') {
                if(color === 'is-static'){
                  value = childDepth2.characters;
                } else {
                  placeholder = childDepth2.characters;
                }
              }
              else if(childDepth2.visible && childDepth2.name === 'iconLeft') {
                iconLeft = ` iconLeft="${childDepth2.componentProperties.select.value}"`;
              }
              else if(childDepth2.visible && childDepth2.name === 'iconRight') {
                iconRight = ` iconRight="${childDepth2.componentProperties.select.value}"`;
              }
            }
            value = value.length > 0 ? `value="${value.trim()}"`:'';
            placeholder = placeholder.length > 0 ? `placeholder="${placeholder.trim()}"`:'';
            inputClass = inputClass.length > 0 ? ` class="${inputClass.trim()}"`:'';
            prop = `${value}${placeholder}${iconLeft}${iconRight}${inputClass}`;
            res_component = `<${name} ${prop} />`;
          } // Input
          else if(child.name === 'select-class'){ // Select
            const color = child.componentProperties.class.value;
            let inputClass = color === 'basic' ? '':` ${color}`;
            let value = '';
            let iconLeft = '';
            for(const childDepth2 of child.children[0].children) {
              if(childDepth2.name === 'text') {
                value = childDepth2.characters;
              }
              else if(childDepth2.visible && childDepth2.name === 'iconLeft') {
                iconLeft = ` iconLeft="${childDepth2.componentProperties.select.value}"`;
              }
            }
            inputClass = inputClass.length > 0 ? ` class="${inputClass.trim()}"`:'';
            prop = `${iconLeft}${inputClass}`;
            res_component = `<${name} ${prop}>`;
            res_component += `\n` + `  `.repeat(depth+2) + `<option>${value}</option>`;
            res_component += `\n` + `  `.repeat(depth+1) + `</${name}>`;
          } // Select
          else if(child.name === 'select-multiple-class'){ // Select-multiple
            prop = child.name === 'select-multiple-class' ? ` multiple size="5"`:'';
            res_component = `<${name.split('-')[0]} ${prop}>`;
            res_component += `\n` + `  `.repeat(depth+2) + `<option>Sample</option>`;
            res_component += `\n` + `  `.repeat(depth+1) + `</${name.split('-')[0]}>`;
          } // Select-multiple
          else if(child.name === 'textarea-class'){ // Textarea
            const color = child.componentProperties.class.value;
            let placeholder = child.children[0].characters;
            prop = color === 'basic' ? '':` class="${color}"`;
            placeholder = placeholder.length > 0 ? ` placeholder="${placeholder.trim()}"`:'';
            res_component = `<${name}${placeholder}${prop} />`;
          } // Textarea
          else if(child.name === 'editor-class'){ // Editor
            let placeholder = child.children[0].children[1].characters;
            placeholder = placeholder.length > 0 ? ` placeholder="${placeholder.trim()}"`:'';
            res_component = `<${name}${placeholder} />`;
          } // Editor
          else if(child.name === 'toggle-class' || child.name === 'file-class' || child.name === 'file-is-boxed-class'){ // Toggle, File
            const color = child.componentProperties.class.value;
            const isBoxed = child.name === 'file-is-boxed-class' ? ' is-boxed':'';
            prop = color === 'basic' ? '':` class="${color}${isBoxed}"`;
            res_component = `<${name.split('-')[0]}${prop} />`;
          } // Toggle, File
          else if(child.name === 'radio-class' || child.name === 'checkbox-class'){ // Radio, Checkbox
            let nl = '';
            for(const childDepth2 of child.children) {
              if(childDepth2.visible === true){
                let checked = childDepth2.componentProperties.State.value;
                checked = checked === 'checked' ? ' checked':'';
                res_component += nl + `<label>`;
                res_component += `\n` + `  `.repeat(depth+2) + `<input type="${child.name.split('-')[0]}"${checked}>`;
                res_component += `\n` + `  `.repeat(depth+2) + childDepth2.children[0].children[1].characters;
                res_component += `\n` + `  `.repeat(depth+1) + `</label>`;  
                nl = `\n` + `  `.repeat(depth+1);
              }
            }
          } // Radio, Checkbox
          else if(child.name === 'date-class'){ // Date
            const color = child.componentProperties.class.value;
            let inputClass = color === 'basic' ? '':` ${color}`;
            let value = '';
            let iconLeft = '';
            for(const childDepth2 of child.children[0].children) {
              if(childDepth2.name === 'text') {
                value = childDepth2.characters;
              }
              else if(childDepth2.visible && childDepth2.name === 'iconLeft') {
                iconLeft = ` iconLeft="${childDepth2.componentProperties.select.value}"`;
              }
            }
            value = value.length > 0 ? ` value="${value.trim()}"`:'';
            inputClass = inputClass.length > 0 ? ` class="${inputClass.trim()}"`:'';
            prop = `${value}${iconLeft}${inputClass}`;

            res_component = `<${name}${prop} />`;
          } // Date
          else {
            res_component = `<${name} />`;
          }
        } // vidible
      } // child loop
      res_start += nl + `  `.repeat(depth) + `<Field${label}${guideText}${fieldClass}>`;
      res_end += `\n` + `  `.repeat(depth) +`</Field>`;
      depth ++;
    }
  }
  res = `${res_start}`;
  res += `\n` + `  `.repeat(depth) + res_component;
  res +=  `${res_end}`;
  return res;
  
}
