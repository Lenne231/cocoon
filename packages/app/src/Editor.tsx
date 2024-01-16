import { useContent } from './hooks';
import { Tree, Doc } from 'core';
import { ChakraProvider, Heading } from '@chakra-ui/react'
import { useState } from 'react';


export function DocEditor(props: { doc: Doc }) {

  props.doc.schema['test'].kind

  return <form>

  </form>;
}


export function Editor(props: { tree: Tree }) {

  const [path, setPath] = useState<string[]>([]);


  return (
    <ChakraProvider>
      <Heading size="4xl" >data</Heading>
    </ChakraProvider>
  );
}
