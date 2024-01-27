import { useContent } from '../hooks';
import postsContent from 'content/settings/posts';
import homeContent from 'content/home';
import impressumContent from 'content/impressum';

export function App() {
  const posts = useContent(postsContent);
  const home = useContent(homeContent);
  const impressum = useContent(impressumContent);
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