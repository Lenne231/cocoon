import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App.tsx'
import { Admin } from './admin/Admin.tsx'
import content from 'content'
import './index.css';

ReactDOM.createRoot(document.getElementById('admin')!).render(
  <StrictMode>
    <Admin api={content} />
  </StrictMode>,
)

ReactDOM.createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
