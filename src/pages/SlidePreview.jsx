import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { refreshToken } from "../utils/refreshToken";

const SlidePreview = () => {
  const [slides, setSlides] = useState([]);
  const [previews, setPreviews] = useState([]);

  const getData = async (endpoint, setState) => {
    try {
      const res = await axios.get(`http://localhost:5000/${endpoint}`);
      setState(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshToken().then(() => {
      getData("slide", setSlides);
      getData("cat_preview", setPreviews);
    });
  }, []);
  return (
    <Layout>
      <div className="flex-[5] overflow-y-auto h-screen pb-16  w-full">
        <div className="pt-3 w-full flex flex-col justify-center pb-10 px-5 gap-10 bg-gradient-to-b from-gray-100 to-gray-200">
          <div className="w-full border rounded-lg p-3 bg-white">
            <div className="w-full flex justify-center">
              <h1 className="font-bold text-2xl">Slide</h1>
            </div>
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              {slides.map((slide) => (
                <div className="" key={slide.uuid}>
                  <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={slide.img}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="font-sembold text-lg py-3">{slide.title}</h3>
                  <p className="text-sm font-light">{slide.detail}</p>
                  <div className="flex w-full justify-center">
                    <Link
                      to={`/slide/${slide.uuid}`}
                      className="btn btn-sm bg-indigo-600 border-none hover:bg-indigo-500"
                    >
                      <MdEditDocument className="pr-2 w-6 h-6" /> Edit Slide
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full border rounded-lg p-3 bg-white">
            <div className="w-full flex justify-center">
              <h1 className="font-bold text-2xl">Preview</h1>
            </div>
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              {previews.map((preview) => (
                <div className="" key={preview.uuid}>
                  <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={preview.img}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="font-sembold text-lg py-3">{preview.title}</h3>
                  <div className="flex w-full justify-center">
                    <Link
                      to={`/preview/${preview.uuid}`}
                      className="btn btn-sm bg-indigo-600 border-none hover:bg-indigo-500"
                    >
                      <MdEditDocument className="pr-2 w-6 h-6" /> Edit Preview
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default SlidePreview;
