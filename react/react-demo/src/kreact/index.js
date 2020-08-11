function createElement(type, config, ...children) {
  console.log("react", type, config, children);
  if (config) {
    delete config.__self;
    delete config.__source;
  }

  const props = {
    ...config,
    children: children.map((child) =>
      typeof child === "object" ? child : createTextNode(child)
    ),
  };

  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (let propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
    props["anhao"] = "喀麦隆";
  }
  return {
    type: type,
    props: props,
  };
}

function createTextNode(child) {
  return {
    type: "TEXT",
    props: {
      children: [],
      nodeValue: child,
    },
  };
}

class Component {
  constructor(props) {
    this.props = props;
  }
}
Component.prototype.isReactComponent = {};

export default { createElement };
export { Component };
