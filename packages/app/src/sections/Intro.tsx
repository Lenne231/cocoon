import * as React from 'react';
import logoUri from '../assets/logo.png';
export function Intro() {
  return <div>
    <img src={logoUri} alt="cocoon" />
    <div className="text-2xl text-center">Cafe - Bar - Events</div>
  </div>
}