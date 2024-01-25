import { useContent } from '../hooks';
import { content } from '../content';

export function App() {
  const settings = useContent(content.main.settings);
  const home = useContent(content.home);

  return <>
    <h1 className="text-2xl">{home.title}</h1>
    <p>{home.content}</p>
    <br />
    <pre>{JSON.stringify(settings, undefined, 2)}</pre>
  </>;
}