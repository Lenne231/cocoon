import { Content, Doc, Field, File, Folder, IntegerField, MarkdownField, Schema, TextField, Tree } from "./types";

export type FieldApi<F extends Field> =
  F extends TextField ? string :
  F extends MarkdownField ? string :
  F extends IntegerField ? number :
  never;

export type SchemaApi<S extends Schema> = {
  readonly [P in keyof S]: FieldApi<S[P]>;
}

export const spec = Symbol('spec');

export interface DocumentApi<S extends Schema> {
  [spec]: Doc<S>;
  set(value: SchemaApi<S>):void;
  get() : SchemaApi<S>;
  subscribe(onChangeHandler: () => void): () => void;
}

export interface FileApi {
  [spec]: File;
  set(value: string):void;
  get() : string;
  subscribe(onChangeHandler: () => void): () => void;
}

export type ContentApi<C extends Content> =
  C extends Folder ? TreeApi<C["tree"]> :
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

function createTreeApi<T extends Tree>(tree: T) : TreeApi<T> {

  const api : Record<string, unknown> = {};

  for(let name in tree) {
    const c = tree[name as keyof T];
    if(c.kind == 'Folder') {
      api[name] = createTreeApi(c.tree);
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

export function createInMemoryStorageApi<T extends Tree>(tree: T) : TreeApi<T> {
  return createTreeApi(tree);
}