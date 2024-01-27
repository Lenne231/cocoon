
import { DocumentApi, Schema, Tree, TreeApi, kind, spec } from 'core';
import { Navigation } from './Navigation';
import { Route, Router, useRouter } from './router';
import { assertNever } from '../assertNever';
import { useState } from 'react';

export interface Props {
  tree: Tree;
  api: TreeApi<Tree>;
}

function getApi(route: Route, api: TreeApi<Tree>) {
  
  if(route.length === 0) {
    return undefined;
  }

  const [current, ...rest] = route;
  const a = api[current];

  if(a[kind] === undefined || a[kind] === 'Folder') {
    return getApi(rest, a);
  }

  return a;
  
}

function DocumentEditor({ api }: { api: DocumentApi<Schema> }) {

  const [value, setValue] = useState(api.get());

  const fields = 
    Object.entries(api[spec].schema).map(([name, field]) => { 
    
      if(field.kind === 'Text') {
        return <div>
          <label>{name}</label><br />
          <input value={value[name]} onChange={e => {
            const value = e.currentTarget.value;
            setValue(prev => ({ ...prev, [name]: value }))
          }} />
        </div>;
      }

      if(field.kind === 'Markdown') {
        return <div>
          <label>{name}</label><br />
          <textarea rows={10} value={value[name]} onChange={e => {
            const value = e.currentTarget.value;
            setValue(prev => ({ ...prev, [name]: value }))
          }} />
        </div>;
      }

      if(field.kind === 'Integer') {
        return <div>
          <label>{name}</label><br />
          <input type="number" value={value[name]} onChange={e => {
            const value = e.currentTarget.valueAsNumber ?? 0;
            setValue(prev => ({ ...prev, [name]: value }))
          }} />
        </div>;
      }
    
      assertNever(field);
    });

  return <>
    {fields}
    <button type="button" className='mt-6' onClick={() => api.set(value)}>save</button>
  </>
}

export function Editor(props: { api: TreeApi<Tree> }) {
  const router = useRouter();
  const api = getApi(router.route, props.api);

  if(api === undefined) {
    return <h1>Not found</h1>;
  }

  if(api[spec].kind === 'Document') {
    return <DocumentEditor api={api as DocumentApi<Schema>} />;
  }

  if(api[spec].kind === 'File') {
    return <h1>File</h1>;
  }

  return assertNever(api as never);
}

export function Admin({ api }: { api: TreeApi<Tree> }) {

  return <>
    <Router initialRoute={[]}>
      <div className='flex flex-row h-dvh'>
        <div className='p-6 bg-gray-200'>
          <Navigation api={api} />
        </div>
        <div className='p-6 bg-gray-100'>
          <Editor api={api} />
        </div>
      </div>
    </Router>
  </>;
}
