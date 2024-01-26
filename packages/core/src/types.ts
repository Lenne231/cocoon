import { SchemaApi } from ".";

export interface TextField {
  kind: 'Text';
}

export interface MarkdownField {
  kind: 'Markdown';
}

export interface IntegerField {
  kind: 'Integer';
}

export type Field =
  | TextField
  | MarkdownField
  | IntegerField;

export type Schema = Record<string, Field>;

export type Tree = Record<string, Content>;

export interface Folder {
  kind: 'Folder';
  title: string;
  tree: Tree;
}

export interface Doc<S extends Schema> {
  kind: 'Document';
  title: string;
  schema: S;
  initialValue: SchemaApi<S>
}

export interface File {
  kind: 'File';
  title: string;
}

export type Content =
  | Folder
  | Doc<Schema>
  | File;

export function folder<const T extends Tree>(title: string, tree: T) {
  return { kind: 'Folder' as const, title, tree };
}

export function doc<const S extends Schema>(title: string, schema: S, initialValue: SchemaApi<S>) : Doc<S> {
  return { kind: 'Document' as const, title, schema, initialValue };
}

export function file(title: string) : File {
  return { kind: 'File' as const, title };
}