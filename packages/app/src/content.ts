import { Tree, createInMemoryStorageApi, doc, file, folder } from "core";

export const tree = {
  'home': doc('Home', {
    title: { kind: 'Text' },
    content: { kind: 'Markdown' }
  }, {
    title: "Hello",
    content: "Welcome to ..."
  }),
  'impressum': doc('Impressum', {
    address: { kind: 'Text' }
  }, { address: '' }),
  'settings': folder('Settings', {
    'posts': doc('Posts', {
        'numberOfPosts': { kind: 'Integer' }
    }, { numberOfPosts: 0 }),
    'logo': file('Logo')
  })
} satisfies Tree;


export const content = createInMemoryStorageApi(tree);