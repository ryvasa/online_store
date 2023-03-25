import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/img/IMG_20230306_140407.jpg";
import img2 from "../assets/img/IMG_20230306_140501.jpg";
import img3 from "../assets/img/IMG_20230306_140431.jpg";
import img4 from "../assets/img/IMG_20230306_140512.jpg";
import img5 from "../assets/img/IMG_20230306_140534.jpg";
import axios from "axios";

const SliderComponent = () => {
  const [slides, setSlides] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const getSlides = async () => {
    try {
      const response = await axios.get("http://localhost:5000/slide");
      localStorage.setItem("slide", JSON.stringify(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSlides();
    setSlides(JSON.parse(localStorage.getItem("slide")));
  }, []);
  return (
    <div className="overflow-hidden lg:h-screen h-1/2 pt-16">
      <Slider {...settings} className="  object-cover  h-full m-0 w-full p-0">
        {slides?.map((slide) => (
          <div key={slide.uuid} className="relative">
            <img src={slide.img} alt="" className=" object-cover w-full" />
            <div className="hidden lg:block absolute z-10 top-1/3 right-20 text-end text-gray-100 ">
              <h3 className="font-bold text-3xl text-teal-600">
                {slide.title}
              </h3>
              <p className="py-2 text-lg">{slide.detail}</p>
              <button className="btn  border-none shadow-lg hover:text-teal-600 hover:bg-white bg-teal-600 text-white  ">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
