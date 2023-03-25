import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { refreshToken } from "../utils/refreshToken";
import { handleClickUpdate } from "../utils/imageUpload";
import { MdFileUpload, MdImage } from "react-icons/md";

const EditSlide = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [slide, setSlide] = useState({});
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const getSlide = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/slide/${id}`);
      setSlide(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  useEffect(() => {
    refreshToken().then(() => {
      getSlide();
    });
  }, []);

  const handleClick = () => {
    const endpoint = "slide";
    handleClickUpdate(endpoint, file, id, inputs, handleCallback);
  };
  const handleCallback = (response) => {
    navigate("/slide&preview");
  };
  return (
    <Layout>
      <div className="flex-[5] overflow-y-auto h-screen pb-16  w-full">
        <div className="pt-3 w-full flex flex-col justify-center pb-10 px-5 gap-10 bg-gradient-to-b from-gray-100 to-gray-200">
          <div className="w-full border rounded-lg p-3 bg-white">
            <div className="w-full flex justify-center">
              <h1 className="font-bold text-2xl">Slide</h1>
            </div>
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="" key={slide.uuid}>
                <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                  <img
                    src={
                      preview
                        ? preview
                        : slide.img
                        ? slide.img
                        : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                    className="h-96 w-full object-contain"
                  />
                </div>
                <div className="flex w-full px-10 py-5 justify-center">
                  <div className="flex-1 w-full flex  justify-center">
                    <input
                      type="file"
                      onChange={loadImage}
                      id="img"
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="img"
                      className="flex gap-1 btn btn-sm justify-center border-none bg-indigo-600  text-white shadow-xl hover:bg-indigo-600"
                    >
                      <MdImage />
                      <span>Edit Picture</span>
                    </label>
                  </div>
                </div>
                <div className="flex w-full gap-3 py-3">
                  <div className="flex flex-1 justify-between  text-md font-medium border-b border-transparent">
                    <span>Slide Title</span>
                    <span>:</span>
                  </div>
                  <input
                    name="title"
                    onChange={handleChange}
                    type="text"
                    placeholder={slide.title}
                    className="bg-transparent outline-none border-b flex-1"
                  />
                </div>
                <div className="flex w-full gap-3 py-3">
                  <div className="flex flex-1 justify-between  text-md font-medium border-b border-transparent">
                    <span>Slide Detail</span>
                    <span>:</span>
                  </div>
                  <input
                    name="detail"
                    onChange={handleChange}
                    type="text"
                    placeholder={slide.detail}
                    className="bg-transparent outline-none border-b flex-1"
                  />
                </div>
                <div className="flex w-full justify-center py-5">
                  <button
                    onClick={handleClick}
                    className="btn btn-sm bg-indigo-600 border-none hover:bg-indigo-500"
                  >
                    <MdFileUpload className="pr-2 w-7 h-7" />
                    Update Slide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default EditSlide;
