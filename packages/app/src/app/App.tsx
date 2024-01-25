import { useContent } from '../hooks';
import { content } from '../content';

export function App() {
  const settings = useContent(content.main.settings);

  return (
    <pre>{JSON.stringify(settings, undefined, 2)}</pre>
  );
}