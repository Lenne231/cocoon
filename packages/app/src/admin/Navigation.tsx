import { Tree } from "core";
import { NavigationTree } from "./NavigationTree";
import { useRouter } from "./router";

export interface Props {
  tree: Tree;
}

export function Navigation({tree}: Props) {
  const router = useRouter();
  return <nav>
    <a onClick={() => router.setRoute([])}>Content</a>
    <div className="ml-2">
      <NavigationTree tree={tree} route={[]} />
    </div>
  </nav> 
}