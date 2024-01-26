import { Tree, TreeApi } from "core";
import { NavigationItem } from "./NavigationItem";
import { Route } from "./router";

export interface Props {
  api: TreeApi<Tree>;
  route: Route;
}

export function NavigationTree({ api, route }: Props) {
  return <>
    {Object.entries(api).map(([name, a]) => <NavigationItem name={name} api={a} route={route}  />)}
  </>;
}
