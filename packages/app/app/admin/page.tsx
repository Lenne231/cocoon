"use client";

if(typeof window !== 'undefined') {
  import('./init').then(i => i.init()).catch(console.error);
}

export default function Admin() {
  return <></>;
}
