import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App.tsx'
import { Admin } from './admin/Admin.tsx'
import { tree } from './content.ts'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Admin tree={tree} />
    <App />
  </StrictMode>,
)
