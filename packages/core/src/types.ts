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
  tree: Tree;
}

export interface Doc {
  kind: 'Document';
  schema: Schema;
}

export interface File {
  kind: 'File';
}

export type Content =
  | Folder
  | Doc
  | File;

export function folder<const T extends Tree>(tree: T) {
  return { kind: 'Folder' as const, tree };
}

export function doc<const S extends Schema>(schema: S) {
  return { kind: 'Document' as const, schema };
}

export function file() {
  return { kind: 'File' as const };
}