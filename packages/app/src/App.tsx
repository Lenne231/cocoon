import { createClientApi } from 'client';
import { useContent } from './hooks';
import { tree } from 'content';

const content = createClientApi(tree, {
  hostOrigin: 'http://localhost:5173'
});

export function App() {
  const posts = useContent(content.settings.posts);
  const home = useContent(content.home);
  const impressum = useContent(content.impressum);
  return <>
    <h1 className="text-2xl">{home.title}</h1>
    <p>{home.content}</p>
    <br />
    <pre>{JSON.stringify(posts, undefined, 2)}</pre>

    <footer>
      Adresse: {impressum.address}
    </footer>
  </>;
}
