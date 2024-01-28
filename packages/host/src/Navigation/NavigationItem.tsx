import { Content } from "core";
import { assertNever } from "../assertNever";
import { NavigationTree } from "./NavigationTree";
import { ContentApi, kind, spec } from "../apis";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

export interface Props { 
  name: string; 
  api: ContentApi<Content>;
  path: string;
}

export function NavigationItem({ name, api, path }: Props) {

  if (api[kind] === 'Document' || api[kind] === 'File') {
    return <div key={name}>
      <NavLink className={({ isActive }) => `text-blue-500 cursor-pointer${isActive ? ' font-bold' : ''}`}  to={path + '/' + name}>{api[spec].title}</NavLink>
    </div>;
  }

  if(api[kind] === 'Folder') {
    return <Fragment key={name}>
      <span className="text-gray-600">{api[spec].title}</span>
      <div className="ml-2">
        <NavigationTree api={api} path={path + '/' + name} />
      </div>
    </Fragment>;
  }

  assertNever(api);
}
