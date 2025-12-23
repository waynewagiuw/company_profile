import React, { useState } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion } from "motion/react";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#our-work" },
    { label: "Contact Us", href: "#contact-us" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white dark:bg-gray-900/70"
    >
      <img
        src={theme === "dark" ? assets.logo_dark : assets.logo}
        className="w-32 sm:w-40"
        alt="logo"
      />

      <div
        className={`text-gray-700 dark:text-white sm:text-sm ${
          !sidebarOpen
            ? "max-sm:w-0 overflow-hidden"
            : "max-sm:w-60 max-sm:pl-10"
        } max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full
           max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20
           flex sm:items-center gap-6 transition-all`}
      >
        <img
          src={assets.close_icon}
          alt=""
          className="w-5 absolute right-4 top-4 sm:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />

        {navLinks.map((item, index) => (
          <div key={index} className="group w-fit">
            <a
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="cursor-pointer"
            >
              {item.label}
            </a>

            <span
              className="
                block mx-auto h-0.5 w-0
                bg-primary
                group-hover:w-full
                transition-all duration-500
                max-sm:bg-white
              "
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        <img
          src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
          alt=""
          onClick={() => setSidebarOpen(true)}
          className="w-8 sm:hidden cursor-pointer"
        />

        <a
          href="#contact-us"
          className="text-sm max-sm:hidden flex items-center gap-2 bg-linear-to-r from-[rgb(80,68,229)] to-[#4dd3ea] hover:shadow-[0_0px_30px_rgba(80,68,229,0.45)]
    hover:scale-103 text-white px-6 py-2 rounded-full cursor-pointer transition-transform"
        >
          Connect <img src={assets.arrow_icon} width={14} alt="" />
        </a>
      </div>
    </motion.div>
  );
};

export default Navbar;
