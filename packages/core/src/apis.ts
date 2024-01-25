import { Content, Doc, Field, File, Folder, IntegerField, MarkdownField, Schema, TextField, Tree } from "./types";

export type FieldApi<F extends Field> =
  F extends TextField ? string :
  F extends MarkdownField ? string :
  F extends IntegerField ? number :
  never;

export type SchemaApi<S extends Schema> = {
  readonly [P in keyof S]: FieldApi<S[P]>;
}

export interface AccessorApi<T> {
  set(value: T):void;
  get() : T;
  subscribe(onChangeHandler: () => void): () => void;
}

export type ContentApi<C extends Content> =
  C extends Folder ? TreeApi<C["tree"]> :
  C extends Doc ? AccessorApi<SchemaApi<C['schema']>> :
  C extends File ? AccessorApi<string> :
  never;


export type TreeApi<T extends Tree> = {
  readonly [P in keyof T]: ContentApi<T[P]>;
}


function createInMemoryAccessor<V>(initialValue: V): AccessorApi<V> {
  let value = initialValue;
  let onChangeHandlers = new Set<() => void>();
  return {
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

function getInitialValue<S extends Schema>(schema: S): SchemaApi<S> {
  const value : Record<string, unknown> = {};
  for(const name in schema) {
    const field = schema[name];
    if(field.kind === 'Text' || field.kind === 'Markdown') {
      value[name] = '';
    }
    if(field.kind === 'Integer') {
      value[name] = 0;
    }
  }
  return value as SchemaApi<S>;
}

function createDocumentApi<S extends Schema>(schema: S): AccessorApi<SchemaApi<S>> {
  return createInMemoryAccessor<SchemaApi<S>>(getInitialValue(schema));
}

function createFileApi(): AccessorApi<string> {
  return createInMemoryAccessor("");
}

function createTreeApi<T extends Tree>(tree: T) : TreeApi<T> {

  const api : Record<string, unknown> = {};

  for(let name in tree) {
    const c = tree[name as keyof T];
    if(c.kind == 'Folder') {
      api[name] = createTreeApi(c.tree);
    }

    if(c.kind === 'Document') {
      api[name] =  createDocumentApi(c.schema);
    }

    if(c.kind === 'File') {
      api[name] =  createFileApi();
    }
  }

  return api as TreeApi<T>;
}

export function createInMemoryStorageApi<T extends Tree>(tree: T) : TreeApi<T> {
  return createTreeApi(tree);
}