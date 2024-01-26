import { Tree, createInMemoryStorageApi, doc, file, folder } from "core";

export const tree = {
  'home': doc('Home', {
    schema: {
      title: { kind: 'Text' },
      content: { kind: 'Markdown' }
    },
    initialValue: {
      title: "Hello",
      content: "Welcome to ..."
    }
  }),
  'impressum': doc('Impressum', {
    schema: {
      address: { kind: 'Text' }
    },
    initialValue: { 
      address: '' 
    }
  }),
  'settings': folder('Settings', {
    'posts': doc('Posts', {
      schema: {
        'numberOfPosts': { kind: 'Integer' },
        "test": { kind: 'Text' }
      }, 
      initialValue: { 
        numberOfPosts: 0,
        test: 'mmm'
      }
    }),
    'logo': file('Logo')
  })
} satisfies Tree;


export const content = createInMemoryStorageApi(tree);