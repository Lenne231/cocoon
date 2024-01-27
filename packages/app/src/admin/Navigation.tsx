import { Tree, TreeApi } from "core";
import { NavigationTree } from "./NavigationTree";

export interface Props {
  api: TreeApi<Tree>;
}

export function Navigation({api}: Props) {
  return <nav>
    <span className="text-gray-600">Content</span>
    <div className="ml-2">
      <NavigationTree api={api} route={[]} />
    </div>
  </nav> 
}