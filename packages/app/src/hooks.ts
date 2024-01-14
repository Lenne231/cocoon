import { ContentProvider } from "core";
import { useSyncExternalStore } from "react";

export function useContent<T>(content: ContentProvider<T>) : T {
  return useSyncExternalStore<T>(content.subscribe, content.get);
}