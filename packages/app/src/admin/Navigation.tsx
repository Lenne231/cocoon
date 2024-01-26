import { Tree } from "core";
import { NavigationTree } from "./NavigationTree";
import { useRouter } from "./router";

export interface Props {
  tree: Tree;
}

export function Navigation({tree}: Props) {
  const router = useRouter();
  return <nav>
    <span className="text-gray-600">Content</span>
    <div className="ml-2">
      <NavigationTree tree={tree} route={[]} />
    </div>
  </nav> 
}