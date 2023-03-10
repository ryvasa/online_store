import React from "react";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductsComponent from "../components/ProductsComponent";
import SliderComponent from "../components/Slider";

const Home = () => {
  return (
    <>
      <Navbar />
      <SliderComponent />
      <ProductsComponent />
      <Category />
      <Footer />
    </>
  );
};

export default Home;
