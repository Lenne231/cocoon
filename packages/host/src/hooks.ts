import { DocumentApi, Schema, SchemaApi } from "core";
import { useSyncExternalStore } from "react";

export function useContent<S extends Schema>(content: DocumentApi<S>) : SchemaApi<S> {
  return useSyncExternalStore<SchemaApi<S>>(content.subscribe, content.get);
}