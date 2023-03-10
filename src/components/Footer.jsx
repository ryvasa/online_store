import React from "react";

const Footer = () => {
  return (
    <>
      <svg
        className="bg-gradient-to-b from-gray-100 to-white w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0D9488"
          fill-opacity="1"
          d="M0,128L80,149.3C160,171,320,213,480,218.7C640,224,800,192,960,186.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <footer className="footer footer-center p-4 bg-teal-600  text-white w-full">
        <div>
          <p>Copyright © 2023 - All right reserved by NTStore Industries Ltd</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
