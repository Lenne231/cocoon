import { Content, Doc, File, Folder, MessageToHost, Schema, SchemaApi, Tree } from "core";

type Get<T> = () => Promise<T>;
type Subscribe = (onChangeHandler: () => void) => () => void;

interface DataApi<T> {
  get(): T;
  subscribe(onChangeHandler: () => void): () => void;
}

export interface DocumentApi<S extends Schema> {
  connect(): Promise<DataApi<SchemaApi<S>>>;
}

export interface FileApi {
  connect(): Promise<DataApi<string>>;
}

export type FolderApi<T extends Tree> = TreeApi<T>;

export type ContentApi<C extends Content> =
  C extends Folder<Tree> ? FolderApi<C["tree"]> :
  C extends Doc<Schema> ? DocumentApi<C['schema']> :
  C extends File ? FileApi :
  never;


export type TreeApi<T extends Tree> = {
  readonly [P in keyof T]: ContentApi<T[P]>;
}


function createDocumentApi<S extends Schema>(doc: Doc<S>, path: string, data: Map<string, Promise<unknown>>): DocumentApi<S> {
  let value = doc.initialValue;
  let onChangeHandlers = new Set<() => void>();
  return {
    get() {
      return value;
    },
    subscribe(onChangeHandler) {
      onChangeHandlers.add(onChangeHandler);
      return () => {
        onChangeHandlers.delete(onChangeHandler);
      }
    }
  }
}

function createFileApi(file: File, path: string, data: Map<string, Promise<unknown>>): FileApi {
  let value = "";
  let onChangeHandlers = new Set<() => void>();
  return {
    get() {
      return value;
    },
    subscribe(onChangeHandler) {
      onChangeHandlers.add(onChangeHandler);
      return () => {
        onChangeHandlers.delete(onChangeHandler);
      }
    }
  }
}

function createTreeApi<T extends Tree>(tree: T, path: string, data: Map<string, Promise<unknown>>) : TreeApi<T> {

  const api : Partial<Record<string, unknown>> = {};

  for(let name in tree) {

    const c = tree[name as keyof T];
    if(c.kind == 'Folder') {
      api[name] = createTreeApi(c.tree, path + '/' + name, data);
    }

    if(c.kind === 'Document') {
      api[name] = createDocumentApi(c,  path + '/' + name, data);
    }

    if(c.kind === 'File') {
      api[name] = createFileApi(c, path + '/' + name, data);
    }
  }

  return api as TreeApi<T>;
}

export function createClientApi<T extends Tree>(tree: T, options: { hostOrigin: string; }) : TreeApi<T> {

  if(!window.parent) {
    throw new Error('No parent');
  }

  function send(message: MessageToHost) {
    window.parent.postMessage(message, options.hostOrigin);
  }

  const data = new Map<string, Promise<unknown>>();

  return createTreeApi(tree, '', data);
}