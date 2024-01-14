import { ReactElement, ReactNode } from 'react';

export interface Page {
  path: string;
  title: string;
  element: ReactElement; 
}

export const events = [
  "event-1",
  "event-2",
  "another-event"
];

const rootPages : Page[] = [
  { path: '', title: 'Home', element: <h1>Index</h1> },
  { path: 'about', title: 'About', element: <h1>About</h1> },
  { path: 'events', title: 'Events', element: <h1>Events</h1> },
];

const eventPages: Page[] = events.map(e => ({ path: `events/${e}`, title: e, element: <>
  <h1>Events</h1>
  <h2>{e}</h2>
</> }));

export const pages : Page[] = [
  ...rootPages,
  ...eventPages
];

export function Layout(props: { children: ReactNode; }) {
  return <html>
    <head>
    </head>
    <body>
      <ul>
        {rootPages.map(p => <li key={p.path}><a href={p.path === '' ? '/' : `/${p.path}/`}>{p.title}</a></li> )}
      </ul>
      <hr />
      {props.children}
    </body>
  </html>
}