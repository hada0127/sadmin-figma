const get = (device) => {
  const componentPage = figma.root.children.find(el => el.name === '_component');
  let pageFrame = componentPage?.children.find(el => el.name === '_page');
  console.log(device);
  if(device === 'mo') {
    pageFrame = componentPage?.children.find(el => el.name === '_page_mo');
  }
  const page = figma.currentPage;

  if(componentPage === undefined) {
    return {flag:'errPage', message:'Can not find _component Page'};
  } else if(pageFrame === undefined) {
    return {flag:'errFrame', message:'Can not find _page frame'};
  }
  const instance = pageFrame.clone();
  figma.currentPage.appendChild(instance);

  if (page.children.length > 1) {
		const lastChild = page.children.length - 2;
		instance.x = page.children[lastChild].x + page.children[lastChild].width + 100;
	}

  return {flag:'success', message:''};
}

export const addPage = (msg, device) => {
  const { flag, message } = get(device);
		const res = {
			action: 'addPage',
			flag: flag,
			message: message
		};
		figma.ui.postMessage(res);
}