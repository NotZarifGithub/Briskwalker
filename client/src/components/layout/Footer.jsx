import React from "react";
import Logo from "../common/logo";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center max-w-[600px] mx-auto w-full">
      <div>
        <p className="font-medium italic text-sm">Briskwalker</p>
      </div>
      <div>
        <Logo />
      </div>
      <div className="flex gap-3">
        <FaFacebook size={20} />
        <FaTiktok size={20} />
        <FaTelegram size={20} />
      </div>
    </footer>
  );
};

export default Footer;
