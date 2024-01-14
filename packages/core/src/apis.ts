import { Content, Doc, Field, File, Folder, IntegerField, MarkdownField, Schema, TextField, Tree } from "./types";

export type FieldApi<F extends Field> =
  F extends TextField ? string :
  F extends MarkdownField ? string :
  F extends IntegerField ? number :
  never;

export type SchemaApi<S extends Schema> = {
  readonly [P in keyof S]: FieldApi<S[P]>;
}

export interface ContentProvider<T> {
  set(value: T):void;
  get() : T;
  subscribe(): () => void;
}

export type ContentApi<C extends Content> =
  C extends Folder ? TreeApi<C["tree"]> :
  C extends Doc ? ContentProvider<SchemaApi<C['schema']>> :
  C extends File ? ContentProvider<string> :
  never;


export type TreeApi<T extends Tree> = {
  readonly [P in keyof T]: ContentApi<T[P]>;
}

export function createApi<T extends Tree>(tree: T) : TreeApi<T> {
  return {} as any;
}
