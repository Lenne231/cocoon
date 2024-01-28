import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css';
import { tree } from 'content';
import { TreeApi, createHostApi, kind } from './apis.ts';
import { Outlet, RouteObject, RouterProvider } from 'react-router';
import { createBrowserRouter} from 'react-router-dom';
import { Tree } from 'core';
import { assertNever } from './assertNever.ts';
import { DocumentEditor } from './Content/DocumentEditor.tsx';

const appOrigin = 'http://localhost:5174';

window.addEventListener('message', e => {

  if (e.origin !== appOrigin) {
    return;
  }

  console.log(e.data);
});

const api = createHostApi(tree);


function getTreeRoutes(api: TreeApi<Tree>) : RouteObject[] {
  
  return Object.entries(api).map(([name, content]) => {

    if(content[kind] === 'Folder') {
      return { path: name, children: getTreeRoutes(content) };
    }
  
    if(content[kind] === 'Document') {
      return { path: name, element: <DocumentEditor  api={content} /> };
    }

    if(content[kind] === 'File') {
      return { path: name, element: <h1>FileEditor</h1> };
    }
  
    assertNever(content);
  });

}

console.log(getTreeRoutes(api));

const router = createBrowserRouter([
  { element: <App api={api} appOrigin={appOrigin} />, children: [
      { index: true, element: <h1>Dashboard</h1> },
      { path: 'content', element: <Outlet />, children: getTreeRoutes(api) }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)