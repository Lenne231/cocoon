import { useContent } from './hooks';
import { Tree } from 'core';
import { ChakraProvider, Heading } from '@chakra-ui/react'
import { useState } from 'react';

export function Editor(props: { tree: Tree }) {

  const [path, setPath] = useState<string[]>([]);


  return (
    <ChakraProvider>
      <Heading size="4xl" >data</Heading>
    </ChakraProvider>
  );
}
