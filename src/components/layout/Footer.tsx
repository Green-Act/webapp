import React from "react";
import { FaDiscord, FaTelegramPlane, FaTwitter } from "react-icons/fa";

const Footer: React.FC<Record<string, never>> = () => {
  return (
    <footer className="bg-transparent w-full flex items-center justify-between shadow-md shadow-inner shadow-black-10 h-[60px] absolute bottom-0 left-0 px-4 md:px-0">
      <div className="flex items-center justify-center md:flex-1">
        <FaDiscord size={25} />
        <FaTwitter size={25} className="mx-4 md:mx-8" />
        <FaTelegramPlane size={25} />
      </div>
      <div className="flex items-center md:absolute right-8">
        <img src="/polygon.svg" alt="Built on Polygon" className="mr-1" />
        <span className="text-sm font-bold">Built on Polygon</span>
      </div>
    </footer>
  );
};

export default Footer;
