import { Schema, SchemaApi } from "core";
import { DocumentApi } from "client";
import { useSyncExternalStore } from "react";

export function useContent<S extends Schema>(content: DocumentApi<S>) : SchemaApi<S> {

  const api = content.connect();

  if(api instanceof Promise) {
    throw api;
  }

  return useSyncExternalStore<SchemaApi<S>>(api.subscribe, api.get); 
}