import * as React from 'react';
import imageURL from '../assets/image.jpg';

export function Story() {
  return <section id="story" className='bg-white h-dvh w-dvh p-6 flex flex-col space-y-4'>
    <img className='rounded' src={imageURL} alt="TODO"/>
    <h1 className="text-lg font-bold" >About us</h1>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis varius pharetra. Pellentesque non nulla ex. Nam accumsan pulvinar nunc, et volutpat mi ultrices quis. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor elit vel augue gravida aliquet vitae eu sapien. Nulla tristique nulla libero, quis pellentesque urna tempus nec. Vivamus congue, metus in ultrices aliquet, risus nisi consequat risus, vitae tincidunt turpis tortor consequat orci. Aliquam ligula nulla, viverra pulvinar dignissim vel, convallis sit amet ligula. Praesent eget lorem a quam vestibulum tempor vitae nec diam. Donec sit amet enim nibh.
    </p>
  </section>;
}