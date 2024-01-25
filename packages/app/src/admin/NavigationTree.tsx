import { Tree } from "core";
import { NavigationItem } from "./NavigationItem";
import { Route } from "./router";

export interface Props {
  tree: Tree;
  route: Route;
}

export function NavigationTree({ tree, route }: Props) {
  return <>
    {Object.entries(tree).map(([name, content]) => <NavigationItem name={name} content={content} route={route}  />)}
  </>;
}
