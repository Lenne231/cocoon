import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { Editor } from './Editor.tsx'
import { tree } from './content.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Editor tree={tree} />
    <hr />
    <App />
  </React.StrictMode>,
)
