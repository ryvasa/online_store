import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <>
      <div className="relative  w-full">
        <Navbar className="relative z-[90]" />
        <div className="fixed w-full">
          <div className="flex w-full pt-[70px]  h-full">
            <Sidebar />
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
