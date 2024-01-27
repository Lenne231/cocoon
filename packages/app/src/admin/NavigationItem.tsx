import { Content, ContentApi, kind, spec } from "core";
import { assertNever } from "../assertNever";
import { NavigationTree } from "./NavigationTree";
import { Route, useRouter } from "./router";

export interface Props { 
  name: string; 
  api: ContentApi<Content>;
  route: Route;
}

export function NavigationItem({ name, api, route }: Props) {

  const router = useRouter();

  if (api[kind] === 'Document') {
    return <div>
      <a className="text-blue-500 cursor-pointer" onClick={() => router.setRoute([...route, name])}>{api[spec].title}</a>
    </div>;
  }

  if (api[kind] === 'File') {
    return <div>
      <a className="text-blue-500 cursor-pointer" onClick={() => router.setRoute([...route, name])}>{api[spec].title}</a>
    </div>;
  }

  if(api[kind] === 'Folder') {
    return <>
      <span className="text-gray-600">{api[spec].title}</span>
      <div className="ml-2">
        <NavigationTree api={api} route={[...route, name]} />
      </div>
    </>;
  }

  assertNever(api);
}
