import * as React from 'react';
import logoUri from '../assets/logo.png';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
export function Intro() {
  return <section className="bg-black bg-plant bg-right-bottom bg-no-repeat bg-[length:360px] text-white h-dvh w-dvh flex flex-col items-center">
    {/*} TODO: provide logo in correct size */ }
    <img className='w-96' src={logoUri} alt="cocoon" />
    <div className="text-3xl text-center">cafe - bar - creative hangout</div>
    <div className='flex flex-row space-x-8 mt-8'>
      <div>
      <div>Mo - Fr 2PM - 10PM</div>
      <div>Sa - So 2PM - 11PM</div>
      </div>
      <a target="_blank" href="https://maps.google.com/maps?hl=en&gl=de&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x47a8532d6c90eb47:0xc26a43abb5aaaea3">
      <address className="not-italic">
        Exerzierstraße 14<br />13357 Berlin
      </address>
      </a>
    </div>
    <a className='text-xl mt-12' href="#story">more
    <ChevronDownIcon /></a>
    {/* <div>About us / Impressions / get to know us (should be a gallery with markdown text, like a storybook)</div> */}
  </section>
}