import { Schema } from 'core';
import { assertNever } from '../assertNever';
import { useState } from 'react';
import { DocumentApi, spec } from '../apis';

export function DocumentEditor({ api }: { api: DocumentApi<Schema>; }) {

  const [value, setValue] = useState(api.get());

  const fields = Object.entries(api[spec].schema).map(([name, field]) => {

    if (field.kind === 'Text') {
      return <div key={name}>
        <label>{name}</label><br />
        <input value={value[name]} onChange={e => {
          const value = e.currentTarget.value;
          setValue(prev => ({ ...prev, [name]: value }));
        }} />
      </div>;
    }

    if (field.kind === 'Markdown') {
      return <div key={name}>
        <label>{name}</label><br />
        <textarea rows={10} value={value[name]} onChange={e => {
          const value = e.currentTarget.value;
          setValue(prev => ({ ...prev, [name]: value }));
        }} />
      </div>;
    }

    if (field.kind === 'Integer') {
      return <div key={name}>
        <label>{name}</label><br />
        <input type="number" value={value[name]} onChange={e => {
          const value = e.currentTarget.valueAsNumber ?? 0;
          setValue(prev => ({ ...prev, [name]: value }));
        }} />
      </div>;
    }

    assertNever(field);
  });

  return <>
    {fields}
    <button type="button" className='mt-6' onClick={() => api.set(value)}>save</button>
  </>;
}
