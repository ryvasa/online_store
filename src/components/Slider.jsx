import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/img/IMG_20230306_140407.jpg";
import img2 from "../assets/img/IMG_20230306_140501.jpg";
import img3 from "../assets/img/IMG_20230306_140431.jpg";
import img4 from "../assets/img/IMG_20230306_140512.jpg";
import img5 from "../assets/img/IMG_20230306_140534.jpg";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="overflow-hidden lg:h-screen h-1/2 pt-16">
      <Slider {...settings} className="  object-cover  h-full m-0 w-full p-0">
        <div className="relative">
          <img src={img1} alt="" className=" object-cover w-full" />
          <div className="hidden lg:block absolute z-10 top-1/3 right-20 text-end text-gray-100 ">
            <h3 className="font-bold text-3xl text-teal-600">Slide 1</h3>
            <p className="py-2 text-lg">
              Lorem ipsum dolor sit amet consectetur. <br /> Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Facere, voluptate?
            </p>
            <button className="btn  border-none shadow-lg hover:text-teal-600 hover:bg-white bg-teal-600 text-white  ">
              Buy Now
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={img2} alt="" className=" object-cover w-full" />
          <div className="hidden lg:block absolute z-10 top-1/3 left-20 text-gray-100 ">
            <h3 className="font-bold text-3xl text-teal-600">Slide 2</h3>
            <p className="py-2 text-lg">
              Lorem ipsum dolor sit amet consectetur. <br /> Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat!
            </p>
            <button className="btn  border-none shadow-lg hover:text-teal-600 hover:bg-white bg-teal-600 text-white  ">
              Buy Now
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={img3} alt="" className=" object-cover w-full" />
          <div className="hidden lg:block absolute z-10 top-1/3 right-20 text-end text-gray-100 ">
            <h3 className="font-bold text-3xl text-teal-600">Slide 3</h3>
            <p className="py-2 text-lg">
              Lorem ipsum dolor sit amet consectetur. <br /> Lorem ipsum dolor,
              sit amet consectetur adipisicing.
            </p>
            <button className="btn  border-none shadow-lg hover:text-teal-600 hover:bg-white bg-teal-600 text-white ">
              Buy Now
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={img4} alt="" className=" object-cover w-full" />
          <div className="hidden lg:block absolute z-10 top-1/3 left-20 text-gray-100 ">
            <h3 className="font-bold text-3xl text-teal-600">Slide 4</h3>
            <p className="py-2 text-lg">
              Lorem ipsum dolor sit amet consectetur. <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              aperiam!
            </p>
            <button className="btn  border-none shadow-lg hover:text-teal-600 hover:bg-white bg-teal-600 text-white  ">
              Buy Now
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={img5} alt="" className=" object-cover w-full" />
          <div className="hidden lg:block absolute z-10 top-1/3 left-20  text-gray-100 ">
            <h3 className="font-bold text-3xl text-teal-600">Slide 5</h3>
            <p className="py-2 text-lg">
              Lorem ipsum dolor sit amet consectetur. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              cupiditate minus itaque.
            </p>
            <button className="btn  border-none shadow-lg hover:text-teal-600 hover:bg-white bg-teal-600 text-white  ">
              Buy Now
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
