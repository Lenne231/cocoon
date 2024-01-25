import { Tree, createInMemoryStorageApi, doc, file, folder } from "core";

export const tree = {
  'main': folder({
    'settings': doc({
        'numberOfPosts': { kind: 'Integer' }
    }, { numberOfPosts: 0 }),
    'logo': file()
  }),
  'home': doc({
    title: { kind: 'Text' },
    content: { kind: 'Markdown' }
  }, {
    title: "Hello",
    content: "Welcome to ..."
  })
} satisfies Tree;


export const content = createInMemoryStorageApi(tree);