import { Content, Doc, File, Folder, MessageToClient, MessageToHost, Schema, SchemaApi, Tree } from "core";

interface DataApi<T> {
  get(): T;
  subscribe(onChangeHandler: () => void): () => void;
}

interface Subscription<T> extends DataApi<T> {
  set(value: T): void;
}

type ValueOrPromise<T> = T | Promise<T>;

export interface DocumentApi<S extends Schema> {
  connect(): ValueOrPromise<DataApi<SchemaApi<S>>>;
}

export interface FileApi {
  connect(): ValueOrPromise<DataApi<string>>;
}

export type FolderApi<T extends Tree> = TreeApi<T>;

export type ContentApi<C extends Content> =
  C extends Folder<Tree> ? FolderApi<C["tree"]> :
  C extends Doc<Schema> ? DocumentApi<C['schema']> :
  C extends File ? FileApi :
  never;


export type TreeApi<T extends Tree> = {
  readonly [P in keyof T]: ContentApi<T[P]>;
}

function createDocumentApi<S extends Schema>(doc: Doc<S>, path: string, getSubscription: (path: string) => ValueOrPromise<Subscription<any>>): DocumentApi<S> {
  return {
    async connect() {
      const { subscribe, get } = await getSubscription(path);
      return {
        subscribe,
        get
      };
    }
  }
}

function createFileApi(file: File, path: string, getSubscription: (path: string) => ValueOrPromise<Subscription<any>>): FileApi {
  return {
    async connect() {
      const { subscribe, get } = await getSubscription(path);
      return {
        subscribe,
        get
      };
    }
  }
}

function createTreeApi<T extends Tree>(tree: T, path: string, getSubscription: (path: string) => ValueOrPromise<Subscription<any>>) : TreeApi<T> {

  const api : Partial<Record<string, unknown>> = {};

  for(let name in tree) {

    const c = tree[name as keyof T];
    if(c.kind == 'Folder') {
      api[name] = createTreeApi(c.tree, path + '/' + name, getSubscription);
    }

    if(c.kind === 'Document') {
      api[name] = createDocumentApi(c,  path + '/' + name, getSubscription);
    }

    if(c.kind === 'File') {
      api[name] = createFileApi(c, path + '/' + name, getSubscription);
    }
  }

  return api as TreeApi<T>;
}



export function createClientApi<T extends Tree>(tree: T, options: { hostOrigin: string; }) : TreeApi<T> {

  if(!window.parent) {
    throw new Error('No parent');
  }

  const subscriptions = new Map<string, ValueOrPromise<Subscription<any>>>();

  function createSubscription<T>(initialValue: any) : Subscription<T> {

    let value = initialValue;
    const onChangeHandlers = new Set<() => void>();
  
    function subscribe(onChangeHandler: () => void) : (() => void) {
      onChangeHandlers.add(onChangeHandler);
      return () => {
        onChangeHandlers.delete(onChangeHandler);
        // trigger remove
      }
    }
  
    function set(v: T) {
      value = v;
      for(const h of onChangeHandlers.values()) {
        h();
      }
    }
  
    function get() {
      return value;
    }
  
    return {
      subscribe,
      set,
      get
    }
  }

  function getSubscription(path: string) {
    let subscription = subscriptions.get(path);

    if(subscription !== undefined) {
      return subscription;
    }

    subscription = new Promise<Subscription<any>>(resolve => {

      const handler = (e: MessageEvent<any>) => {
        if(e.origin !== options.hostOrigin) {
          return;
        }
        const message = e.data as MessageToClient;
        if(message.path !== path) {
          return;
        }
        resolve(createSubscription(message.value));
      }

      window.addEventListener('message', handler);
    }).then(v => {
      subscriptions.set(path, v);
      return v;
    });

    subscriptions.set(path, subscription);

    window.parent.postMessage({ kind: 'subscribe', path } as MessageToHost, options.hostOrigin);

    return subscription;
  }

  return createTreeApi(tree, '', getSubscription);
}