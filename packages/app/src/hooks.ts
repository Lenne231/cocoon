import { Schema, SchemaApi } from "core";
import { DocumentApi } from "client";
import { useEffect, useState } from "react";

export function useContent<S extends Schema>(content: DocumentApi<S>) : SchemaApi<S> {

  const [promise, setPromise] = useState<Promise<SchemaApi<S>> | SchemaApi<S>>(async () => {
    const data = await content.get();
    setPromise(data);
    return data;
  });

  useEffect(() => {
    return content.subscribe(() => {
      const promise = content.get();
      promise.then(setPromise, () => setPromise(promise));
    });
  }, [content]);

  if(promise instanceof Promise) {
    throw promise;
  }

  return promise; 
}