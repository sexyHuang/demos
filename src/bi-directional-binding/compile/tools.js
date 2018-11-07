export const node2Fragment = node => {
  let fragment = document.createDocumentFragment();
  while (node.firstChild) {
    fragment.appendChild(node.firstChild);
  }
  return fragment;
};

export const isDirective = attrName => {
  return attrName.startsWith('v-');
};

export const isEventDirective = dir => {
  return dir.startsWith('on');
};
