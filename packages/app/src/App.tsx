import * as React from 'react';
import { Contact } from './sections/Contact';
import { Events } from './sections/Events';
import { Intro } from './sections/Intro';
import { About } from './sections/About';

export function App() {
  return <div className='d-flex'>
    <Intro />
    <Events />
    <About />
    <Contact />
  </div>;
}
