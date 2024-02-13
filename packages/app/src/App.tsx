import * as React from 'react';
import { Contact } from './sections/Contact';
import { Events } from './sections/Events';
import { Intro } from './sections/Intro';
import { Story } from './sections/Story';

export function App() {
  return <>
    <Intro />
    <Story />
    <Events />
    <Contact />
  </>;
}
