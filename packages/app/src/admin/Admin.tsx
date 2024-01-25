
import { Tree, TreeApi } from 'core';
import { Navigation } from './Navigation';
import { Router, useRouter } from './router';

export interface Props {
  tree: Tree;
  api: TreeApi<Tree>;
}

export function Editor() {
  const router = useRouter();
  return <pre>{JSON.stringify(router.route)}</pre>;
}

export function Admin({ tree }: Props) {

  return <>
    <Router initialRoute={[]}>
      <Navigation tree={tree} />
      <hr />
      <Editor />
    </Router>
  </>;
}
