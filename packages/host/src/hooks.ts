import { Schema, SchemaApi } from "core";
import { useSyncExternalStore } from "react";
import { DocumentApi } from "./apis";

export function useContent<S extends Schema>(content: DocumentApi<S>) : SchemaApi<S> {
  return useSyncExternalStore<SchemaApi<S>>(content.subscribe, content.get);
}