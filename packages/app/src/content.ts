import { Tree, createInMemoryStorageApi, doc, file, folder } from "core";

export const tree = {
  'main': folder({
    'settings': doc({
        'numberOfPosts': { kind: 'Integer' }
    }),
    'logo': file()
  }),
  'home': doc({
    title: { kind: 'Text' },
    content: { kind: 'Markdown' }
  })
} satisfies Tree;


export const content = createInMemoryStorageApi(tree);