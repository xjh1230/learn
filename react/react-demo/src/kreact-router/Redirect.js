import RouterContext from "./Context";
import { useContext, useReducer, useEffect } from "react";
export default function Redirect(props) {
  const context = useContext(RouterContext);
  useEffect(() => {
    context.history.push(props.to);
  });
  return null;
}
