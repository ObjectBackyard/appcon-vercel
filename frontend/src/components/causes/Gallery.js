import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Causes.css';

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Import images from the /images folder dynamically
  const importAll = (r) => r.keys().map(r);
  const images = importAll(require.context('./gallery', false, /\.(png|jpe?g|svg)$/));

  const settings = {
    dots: true, // Show dots for navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: setCurrentIndex,
  };

  return (
    <div className="gallery-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Gallery;
