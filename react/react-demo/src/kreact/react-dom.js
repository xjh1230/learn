import { TEXT, PLACEMENT, UPDATE, DELETION } from "./const";
import { Field } from "../components/my-fc-field-form";
import { $CombinedState } from "redux";

//下一个要运行的fiber
let nextUnitOfWork = null;
// work in progress root
let wipRoot = null;
//当前运行的跟节点
let currentRoot = null;
//work in progress fiber
let wipFiber = null;
//要删除的fiber节点
let deletions = null;
function render(vnode, container) {
  wipRoot = {
    node: container,
    props: {
      children: [vnode],
    },
    base: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function createNode(vnode) {
  const { type, props } = vnode;
  let node;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 判断是函数组件还是类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    // console.log("createNode", props);
    node = document.createDocumentFragment();
    // node = document.createElement("div");
  }
  // console.log("vnode", vnode);
  updateNode(node, {}, props);
  return node;
}
function updateNode(node, prevProps, props) {
  Object.keys(prevProps)
    .filter((k) => k != "children")
    .forEach((k) => {
      if (k.startsWith("on")) {
        let eventName = k.substring(2).toLowerCase();
        node.removeEventListener(eventName, prevProps[k]);
      } else {
        if (!(k in props)) {
          node.removeAttribute(k);
        }
      }
    });
  Object.keys(props)
    .filter((k) => k !== "children")
    .forEach((k) => {
      if (k.startsWith("on")) {
        let eventName = k.substring(2).toLowerCase();
        node.addEventListener(eventName, props[k]);
        // console.log("key", k, node, props[k]);
      } else {
        node[k] = props[k];
      }
    });
}
function updateClassComponent(fiber) {
  // wipFiber = fiber;

  const { type, props } = fiber;
  const cmp = new type(props);
  const vnode = cmp.render();
  const children = [vnode];
  console.log("class-children", vnode, fiber.node);
  reconcileChildren(fiber, children);
}
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  wipFiber.hooks = [];
  wipFiber.hookIndex = 0;
  const { type, props } = fiber;
  let node = type(props);
  console.log("function-comp", node, fiber.node);
  const children = [node];
  reconcileChildren(fiber, children);
}
function reconcileChildren_old(workInProgressFiber, children) {
  let prevSibling = null;
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    // 比较节点能不能复用
    let sameType = child && oldFiber && child.type === oldFiber.type;
    if (sameType) {
      // 类型相同 复用
      newFiber = {
        type: child.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber,
        return: workInProgressFiber,
        effectTag: UPDATE,
      };
    }
    if (!sameType && child) {
      // 类型不同 但是child存在 新增
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        return: workInProgressFiber,
        effectTag: PLACEMENT,
      };
    }

    if (!sameType && oldFiber) {
      // 删除
      oldFiber.effectTag = DELETION;
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // 形成链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      // 上一次fiber的sibling指向这次的fiber
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }
}
function placeChild(
  newFiber,
  lastPlacedIndex,
  newIndex,
  shouldTrackSideEffects
) {
  newFiber.index = newIndex;
  if (!shouldTrackSideEffects) {
    //初次渲染，返回上一个节点执行位置
    return lastPlacedIndex;
  }
  //更新阶段，fiber可能是新增，也可能是修改
  let base = newFiber.base;
  if (base !== null) {
    //更新
    let oldIndex = base.index;
    if (oldIndex < lastPlacedIndex) {
      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    //新增
    newFiber.effectTag = PLACEMENT;
    return lastPlacedIndex;
  }
}
function mapRemainingChildren(returnFiber, currentFirstChild) {
  const existingChildren = new Map();
  // let exitChild = currentFirstChild;
  // while (exitChild) {
  //   let key = exitChild.key || exitChild.index;
  //   console.log("mapRemainingChildren", key);
  //   existingChildren.set(key, exitChild);
  //   exitChild = exitChild.sibling;
  // }
  // return existingChildren;

  let existingChild = currentFirstChild;
  while (existingChild) {
    if (existingChild.key !== null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }
    existingChild = existingChild.sibling;
  }
  return existingChildren;
}
function reconcileChildren_my(returnFiber, children) {
  let prevNewFiber = null;
  //oldfiber 的第一个child
  let oldFiber = returnFiber.base && returnFiber.base.child;
  //记录下一个oldfiber
  let nextOldFiber = null;
  //记录上次的插入位置
  let lastPlacedIndex = 0;
  //新节点的索引
  let newIndex = 0;
  //是否是更新标识
  let shouldTrackSideEffects = true;
  if (!oldFiber) {
    shouldTrackSideEffects = false;
  }

  //更新，子节点位置相同
  for (; oldFiber !== null && newIndex < children.length; newIndex++) {
    //疑问
    if (oldFiber.index > newIndex) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }
    let newChild = children[newIndex];
    if (!(newChild.key === oldFiber.key && newChild.type === oldFiber.type)) {
      //新旧节点不一样，跳出当前diff
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }
      break;
    }
    const newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      node: oldFiber.node,
      base: oldFiber,
      return: returnFiber,
      effectTag: UPDATE,
    };
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    );
    if (prevNewFiber === null) {
      returnFiber.child = newChild;
    } else {
      prevNewFiber.sibling = newFiber;
    }
    prevNewFiber = newFiber;
    //疑问
    oldFiber = nextOldFiber;
  }
  //新children全部遍历完成,删除剩余老children
  if (newIndex === children.length) {
    while (oldFiber) {
      deletions.push({
        ...oldFiber,
        effectTag: DELETION,
      });
      oldFiber = oldFiber.sibling;
    }
  }
  //老节点遍历完毕，新节点还有，插入，或者首次渲染，插入新节点
  if (oldFiber === null) {
    for (; newIndex < children.length; newIndex++) {
      let newChild = children[newIndex];
      const newFiber = {
        key: newChild.key,
        type: newChild.type,
        props: newChild.props,
        node: null,
        base: null,
        return: returnFiber,
        effectTag: PLACEMENT,
      };
      lastPlacedIndex = placeChild(
        newFiber,
        newIndex,
        lastPlacedIndex,
        shouldTrackSideEffects
      );
      if (prevNewFiber === null) {
        //构建新节点的fiber链表
        returnFiber.child = newFiber;
      } else {
        prevNewFiber.sibling = newFiber;
      }
      prevNewFiber = newFiber;
    }
  }
  //新老节点都还有，乱序更新
  const exitOldMap = mapRemainingChildren(returnFiber, oldFiber);

  for (; newIndex < children.length; newIndex++) {
    let newChild = children[newIndex];
    let newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      return: returnFiber,
      base: null,
      node: null,
      effectTag: PLACEMENT,
    };
    // let key = newChild.key !== null ? newChild.key : newIndex;
    // let matchFiber = exitOldMap.get(key);
    let matchFiber = exitOldMap.get(
      newChild.key === null ? newIndex : newChild.key
    );
    if (matchFiber) {
      newFiber = {
        ...newFiber,
        node: matchFiber.node,
        base: matchFiber,
        effectTag: UPDATE,
      };
      // shouldTrackSideEffects && exitOldMap.delete(key);
      shouldTrackSideEffects &&
        exitOldMap.delete(newFiber.key === null ? newIndex : newFiber.key);
    }
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    );
    if (prevNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      prevNewFiber.sibling = newFiber;
    }
    prevNewFiber = newFiber;
  }
  if (shouldTrackSideEffects) {
    //更新阶段 乱序更新后 oldMap还有值的话，全部删除
    exitOldMap.forEach((child) => {
      deletions.push({
        ...child,
        effectTag: DELETION,
      });
    });
  }
}

function reconcileChildren(returnFiber, newChildren) {
  let previousNewFiber = null;

  // oldfiber 的第一个子fiber
  let oldFiber = returnFiber.base && returnFiber.base.child;
  // 记录上次的插入位置
  let lastPlacedIndex = 0;
  // 做累加，遍历newChildren数组
  let newIdx = 0;
  // oldFiber的中转，记录下个oldFiber
  let nextOldFiber = null;

  let shouldTrackSideEffects = true;
  if (!oldFiber) {
    // 初次渲染
    shouldTrackSideEffects = false;
  }

  // 1. 界面更新阶段 相对位置没有发生变化 这行这个循环
  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    // 判断相对位置
    // old 1  2  3_  4
    // new    1  2  3  4   _
    if (oldFiber.index > newIdx) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }

    let newChild = newChildren[newIdx];

    if (!(newChild.key === oldFiber.key && newChild.type === oldFiber.type)) {
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }
      break;
    }

    const newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      node: oldFiber.node,
      base: oldFiber,
      return: returnFiber,
      effectTag: UPDATE,
    };
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIdx,
      shouldTrackSideEffects
    );
    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
    // !
    oldFiber = nextOldFiber;
  }

  if (newIdx === newChildren.length) {
    // We've reached the end of the new children. We can delete the rest.
    // deleteRemainingChildren(returnFiber, oldFiber);
    // return resultingFirstChild;
    while (oldFiber) {
      deletions.push({
        ...oldFiber,
        effectTag: DELETION,
      });
      oldFiber = oldFiber.sibling;
    }
  }

  //2.  新增fiber 老链表已经遍历完
  if (oldFiber === null) {
    for (; newIdx < newChildren.length; newIdx++) {
      let newChild = newChildren[newIdx];
      const newFiber = {
        key: newChild.key,
        type: newChild.type,
        props: newChild.props,
        node: null,
        base: null,
        return: returnFiber,
        effectTag: PLACEMENT,
      };
      lastPlacedIndex = placeChild(
        newFiber,
        lastPlacedIndex,
        newIdx,
        shouldTrackSideEffects
      );
      if (previousNewFiber === null) {
        returnFiber.child = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
    }
    return;
  }

  // 3. 新老链表都有参数值
  // 1->2-》3-》4->5
  // [1,2,3,4]
  // 生成map图，方便链表查找、设置和删除
  const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
  for (; newIdx < newChildren.length; newIdx++) {
    let newChild = newChildren[newIdx];

    let newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      return: returnFiber,
      // node: null,
      // base: null,
      // effectTag: PLACEMENT
    };

    // 判断新增还是复用
    let matchedFiber = existingChildren.get(
      newChild.key === null ? newIdx : newChild.key
    );
    if (matchedFiber) {
      // 找到啦
      newFiber = {
        ...newFiber,
        node: matchedFiber.node,
        base: matchedFiber,
        effectTag: UPDATE,
      };
      // 找到就要删除链表上的元素，防止重复查找
      shouldTrackSideEffects &&
        existingChildren.delete(newFiber.key === null ? newIdx : newFiber.key);
    } else {
      newFiber = {
        ...newFiber,
        node: null,
        base: null,
        effectTag: PLACEMENT,
      };
    }
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIdx,
      shouldTrackSideEffects
    );
    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  if (shouldTrackSideEffects) {
    existingChildren.forEach((child) =>
      deletions.push({
        ...child,
        effectTag: DELETION,
      })
    );
  }
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }

  const { children } = fiber.props;

  reconcileChildren(fiber, children);
}
function performNextUnitofWork(fiber) {
  //执行当前work
  const { type } = fiber;

  if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  //获取下一个fiber
  if (fiber.child) {
    //子
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function commitRoot() {
  deletions.forEach(commitWorker);
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
function getHostSibling(fiber) {
  let sibling = fiber.return.child;
  while (sibling) {
    if (fiber.index + 1 === sibling.index && sibling.effectTag === UPDATE) {
      return sibling.node;
    }
    sibling = sibling.sibling;
  }

  return null;
}
function insertOrAppend(fiber, parentNode) {
  let before = getHostSibling(fiber);
  let node = fiber.node;
  if (before) {
    parentNode.insertBefore(node, before);
  } else {
    parentNode.appendChild(node);
  }
}
function commitWorker(fiber) {
  if (!fiber) {
    return;
  }
  commitWorker(fiber.child);
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    //类组件，函数组件的根就没有node
    // console.log("parentNodeFiber", parentNodeFiber);
    parentNodeFiber = parentNodeFiber.return;
  }
  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    // parentNode.appendChild(fiber.node);
    insertOrAppend(fiber, parentNode);
  } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
    updateNode(fiber.node, fiber.base.props, fiber.props);
  } else if (fiber.effectTag === DELETION && fiber.node !== null) {
    commitDeletions(fiber, parentNode);
  }
  commitWorker(fiber.sibling);
}
function commitDeletions(fiber, parent) {
  if (fiber.node) {
    //普通节点
    parent.removeChild(fiber.node);
  } else {
    //provider
    commitDeletions(fiber.child, parent);
  }
}
function workLoop(deadLine) {
  //timeRemaining
  while (nextUnitOfWork && deadLine.timeRemaining() > 1) {
    nextUnitOfWork = performNextUnitofWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  window.requestIdleCallback(workLoop);
}
window.requestIdleCallback(workLoop);

// 初次渲染（用init）
//  还是更新（在init的基础上更新）
export function useState(init) {
  // 判断有没有老的hook
  const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hookIndex];

  // 初次渲染（用init）
  //  还是更新（在init的基础上更新）
  const hook = oldHook
    ? {
        state: oldHook.state,
        queue: oldHook.queue,
      }
    : { state: init, queue: [] };

  // 更新hook.state
  // 这里模拟一下批量更新
  hook.queue.forEach((action) => (hook.state = action));

  const setState = (action) => {
    console.log("action", action);
    // 每次执行setState，接收新的action，这里存到数组，因为等下要批量更新，执行遍历
    hook.queue.push(action);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  wipFiber.hookIndex++;

  return [hook.state, setState];
}

export default { render };
