import { Tree } from "core";
import { NavigationTree } from "./NavigationTree";
import { TreeApi } from "../apis";

export interface Props {
  api: TreeApi<Tree>;
}

export function Navigation({api}: Props) {
  return <nav>
    <span className="text-gray-600">Content</span>
    <div className="ml-2">
      <NavigationTree api={api} path={'content'} />
    </div>
  </nav> 
}