import { renderToString } from 'react-dom/server'
import { Layout, pages } from './pages'
import fs from 'node:fs'
import path from 'node:path';

export function generate() {
  for(const page of pages) {
    const html = renderToString(<Layout>{page.element}</Layout>);
    
    const filePath = path.join(
      __dirname,
      'out',
      page.path,
      'index.html'
    );
  
  const dirPath = path.dirname(filePath);
  
  if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
    
  
    fs.writeFileSync(filePath, html);
  
  }
}


