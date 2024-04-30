import React from 'react';
import '../components/causes/Causes.css';


export function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement("script");
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
}


function Carousel() {
    return (
        <div className='flex bg-slate-100 justify-center'>
          <div class="w-2/3 h-[400px] carousel rounded-box mt-[50px]">
  <div class="carousel-item w-full mx-auto">
    <img className='object-none mx-auto overflow-hidden' src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" class="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div class="object-nonecarousel-item w-full">
    <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" class="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div class="object-none carousel-item w-full">
    <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" class="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div class="object-none carousel-item w-full">
    <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" class="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div class="object-none carousel-item w-full">
    <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" class="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div class="object-none carousel-itemw-full">
    <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" class="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  <div class="object-none carousel-item w-full">
    <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" class="w-full" alt="Tailwind CSS Carousel component" />
  </div>
</div>
        </div>
    );
}


export default Carousel;
