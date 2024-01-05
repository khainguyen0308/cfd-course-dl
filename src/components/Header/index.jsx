import React, { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";
import HeaderBackground from "./HeaderHumbeurger";
import { useLocation } from "react-router-dom";
import PATHS from "../../constants/paths";
import HeaderLogo from "./HeaderLogo";
import HeaderAuthen from "./HeaderAuthen";

const Header = () => {
  const { pathname } = useLocation();
  const isTransparent = [PATHS.HOME, PATHS.ABOUT].includes(pathname);

  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        // console.log("isTransparent", isTransparent);
        if (isTransparent) {
          header.removeClass("--bgwhite");
        }
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }

    window.addEventListener("scroll", scrollBgHeader);

    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);
  return (
    <header
      id="header"
      className={`header --transparent ${!isTransparent ? "--bgwhite" : ""}`}
    >
      <div className="container-fluid">
        <HeaderBackground />
        <HeaderLogo />
        <HeaderAuthen />
      </div>
    </header>
  );
};

export default Header;
