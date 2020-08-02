export function bindActionCreators(mapToDispatch, dispatch) {
  Object.keys(mapToDispatch).forEach((key) => {
    mapToDispatch[key] = bindActionCreator(mapToDispatch[key], dispatch);
  });
  return mapToDispatch;
}

export function bindActionCreator(propFn, dispatch) {
  return dispatch(propFn());
}
