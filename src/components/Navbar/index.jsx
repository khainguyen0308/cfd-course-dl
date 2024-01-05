import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__main">
        <li className="navbar__link">
          <Link to="./" className="navbar__item active">
            Trang chủ
          </Link>
        </li>
        <li className="navbar__link">
          <Link to={PATHS.ABOUT} className="navbar__item">
            Về CFD Circle
          </Link>
        </li>
        <li className="navbar__link">
          <Link to={PATHS.COURSE.INDEX} className="navbar__item">
            Khóa học
          </Link>
        </li>
        <li className="navbar__link">
          <Link to={PATHS.BLOG} className="navbar__item">
            Bài viết
          </Link>
        </li>
        <li className="navbar__link">
          <Link to={PATHS.CONTACT} className="navbar__item">
            Liên hệ
          </Link>
        </li>
      </ul>
      <div className="navbar__overlay" />
    </nav>
  );
};

export default Navbar;
