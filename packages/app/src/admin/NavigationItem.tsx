import { Content } from "core";
import { assertNever } from "../assertNever";
import { NavigationTree } from "./NavigationTree";
import { Route, useRouter } from "./router";

export interface Props { 
  name: string; 
  content: Content;
  route: Route;
}

export function NavigationItem({ name, content, route }: Props) {

  const router = useRouter();

  if (content.kind === 'Folder') {
    return <>
      <a onClick={() => router.setRoute([...route, name])}>{name}</a>
      <div className="ml-2">
        <NavigationTree tree={content.tree} route={[...route, name]} />
      </div>
    </>;
  }

  if (content.kind === 'Document') {
    return <div>
      <a onClick={() => router.setRoute([...route, name])}>{name}</a>
    </div>;
  }

  if (content.kind === 'File') {
    return <div>
      <a onClick={() => router.setRoute([...route, name])}>{name}</a>
    </div>;
  }

  assertNever(content);
}
