import { AccessorApi } from "core";
import { useSyncExternalStore } from "react";

export function useContent<T>(content: AccessorApi<T>) : T {
  return useSyncExternalStore<T>(content.subscribe, content.get);
}