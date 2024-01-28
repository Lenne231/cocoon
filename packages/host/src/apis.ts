import { Content, Doc, File, Folder, Schema, SchemaApi, Tree } from "core";

export const kind = Symbol('kind');
export const spec = Symbol('spec');

export interface DocumentApi<S extends Schema> {
  readonly [kind]: 'Document';
  readonly [spec]: Doc<S>;
  set(value: SchemaApi<S>):void;
  get() : SchemaApi<S>;
  subscribe(onChangeHandler: () => void): () => void;
}

export interface FileApi {
  readonly [kind]: 'File';
  readonly [spec]: File;
  set(value: string):void;
  get() : string;
  subscribe(onChangeHandler: () => void): () => void;
}

export type FolderApi<T extends Tree> = { readonly [kind]: 'Folder'; readonly [spec]: Folder<T>; } & TreeApi<T>;

export type ContentApi<C extends Content> =
  C extends Folder<Tree> ? FolderApi<C["tree"]> :
  C extends Doc<Schema> ? DocumentApi<C['schema']> :
  C extends File ? FileApi :
  never;


export type TreeApi<T extends Tree> = {
  readonly [P in keyof T]: ContentApi<T[P]>;
}


function createDocumentApi<S extends Schema>(doc: Doc<S>): DocumentApi<S> {
  let value = doc.initialValue;
  let onChangeHandlers = new Set<() => void>();
  return {
    [kind]: 'Document',
    [spec]: doc,
    set(v) {
      value = v;
      for(const handler of onChangeHandlers) {
        handler();
      }
    },
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

function createFileApi(file: File): FileApi {
  let value = "";
  let onChangeHandlers = new Set<() => void>();
  return {
    [kind]: 'File',
    [spec]: file,
    set(v) {
      value = v;
      for(const handler of onChangeHandlers) {
        handler();
      }
    },
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

function createFolderApi<T extends Tree>(folder: Folder<T>) : FolderApi<T> {
  const treeApi = createTreeApi(folder.tree);

  return {
    [kind]: 'Folder',
    [spec]: folder,
    ...treeApi,
  };
}

function createTreeApi<T extends Tree>(tree: T) : TreeApi<T> {

  const api : Partial<Record<string, unknown>> = {};

  for(let name in tree) {

    const c = tree[name as keyof T];
    if(c.kind == 'Folder') {
      api[name] = createFolderApi(c);
    }

    if(c.kind === 'Document') {
      api[name] = createDocumentApi(c);
    }

    if(c.kind === 'File') {
      api[name] = createFileApi(c);
    }
  }

  return api as TreeApi<T>;
}

export function createHostApi<T extends Tree>(tree: T) : TreeApi<T> {
  return createTreeApi(tree);
}