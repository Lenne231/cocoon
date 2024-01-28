import { Tree } from "core";
import { NavigationItem } from "./NavigationItem";
import { TreeApi } from "../apis";

export interface Props {
  api: TreeApi<Tree>;
  path: string;
}

export function NavigationTree({ api, path }: Props) {
  return <>
    {Object.entries(api).map(([name, a]) => <NavigationItem key={name} name={name} api={a} path={path}  />)}
  </>;
}
