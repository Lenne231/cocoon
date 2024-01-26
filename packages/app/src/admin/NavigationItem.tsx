import { Content, ContentApi, spec } from "core";
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

  if(!(spec in api)) {
    return <>
      <span className="text-gray-600">{name}</span>
      <div className="ml-2">
        <NavigationTree api={api} route={[...route, name]} />
      </div>
    </>;
  }

  if (spec in api && api[spec].kind === 'Document') {
    return <div>
      <a className="text-blue-500 cursor-pointer" onClick={() => router.setRoute([...route, name])}>{name}</a>
    </div>;
  }

  if (spec in api && api[spec].kind === 'File') {
    return <div>
      <a className="text-blue-500 cursor-pointer" onClick={() => router.setRoute([...route, name])}>{name}</a>
    </div>;
  }

  return 



  assertNever(api as never);
}
