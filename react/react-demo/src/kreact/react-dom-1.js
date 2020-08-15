function render(vnode, container) {
  //   console.log(vnode);

  //创建真实dom
  var node = createNode(vnode, container);
  //   console.log("node", node);
  //插入父节点
  container.appendChild(node);
}
function createNode(vnode) {
  const { type, props } = vnode;
  let node = null;
  if (typeof type === "string") {
    if (type === "TEXT") {
      node = document.createTextNode("");
    } else {
      node = document.createElement(type);
    }
  } else if (typeof type === "function") {
    if (type.prototype.isReactComponent) {
      node = createClassCom(type, props);
    } else {
      node = createFuncCom(type, props);
    }
  } else {
    console.log("type", type, props);
    node = document.createDocumentFragment();
  }

  recursionChildren(props.children, node);
  updateProps(props, node);
  return node;
}
function createFuncCom(type, props) {
  let vnode = type(props);
  return createNode(vnode);
}
function createClassCom(type, props) {
  let comp = new type(props);
  var vnode = comp.render();
  return createNode(vnode);
}
function recursionChildren(children, node) {
  children.forEach((child) => {
    render(child, node);
  });
}
function updateProps(props, node) {
  //   console.log(props, node);
  Object.keys(props)
    .filter((k) => k !== "children")
    .forEach((k) => {
      node[k] = props[k];
    });
}
export default {
  render,
};
