import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CustomCarousel = ({ images }) => {
  return (
    <Carousel autoPlay>
      {images &&
        images.map((img) => (
          <div>
            <img src={img} alt="item photos" width={400} />
            {/* <p className="legend">{img}</p> */}
          </div>
        ))}

      {/* <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg" />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-5.jpg" />
        <p className="legend">Legend 5</p>
      </div>
      <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-6.jpg" />
        <p className="legend">Legend 6</p>
      </div>
      <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-7.jpg" />
        <p className="legend">Legend 7</p>
      </div>
      <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-8.jpg" />
        <p className="legend">Legend 8</p>
      </div>
      <div>
        <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-9.jpg" />
        <p className="legend">Legend 9</p>
      </div> */}
    </Carousel>
  );
};

export default CustomCarousel;
