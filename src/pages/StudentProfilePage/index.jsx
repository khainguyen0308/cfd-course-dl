import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import PATHS from "../../constants/paths";

const StudentProfilePage = () => {
  const { profile, handleGetProfileCourse, handleGetProfilePayment } =
    useAuthContext();
  console.log("profile", profile);

  const { firstName, email, phone, introduce, website, facebookURL } =
    profile || {};
  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar__info">
              <div className="useravatar">
                <div className="avatar">
                  <div className="img">
                    <img src="/img/avatar_nghia.jpg" alt="avatar" />
                  </div>
                </div>
                <h3 className="title --t3">{firstName}</h3>
              </div>
            </div>
            <div className="sidebar__content">
              <h4>Giới thiệu</h4>
              <p className="description">{introduce}</p>
              <ul>
                <li>
                  <img src="/img/icon-mail-outline.svg" alt="icon" />
                  <span>{email}</span>
                </li>
                <li>
                  <img src="/img/icon-phone-outline.svg" alt="icon" />
                  <span>{phone}</span>
                </li>
                <li>
                  <img src="/img/icon-link.svg" alt="icon" />
                  <a href={website} target="_blank" rel="noreferrer">
                    {website}
                  </a>
                </li>
              </ul>
              <div className="social">
                <a href={facebookURL} target="_blank" rel="noreferrer">
                  <img src="/img/icon-fb-footer.svg" alt />
                </a>
                <a href="#">
                  <img src="/img/icon-linkedin-ft.svg" alt />
                </a>
                <a href="#">
                  <img src="/img/icon-ytb-ft.svg" alt />
                </a>
              </div>
            </div>
          </div>
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink end to={PATHS.PROFILE.INDEX}>
                  Thông tin cá nhân
                </NavLink>
                <NavLink to={PATHS.PROFILE.MY_COURSE}>Khóa học của tôi</NavLink>
                <NavLink to={PATHS.PROFILE.MY_PAYMENT}>
                  Lịch sử thanh toán
                </NavLink>
              </div>
              <div className="tab__content">
                <Outlet>
                  {/* Thông tin cá nhân */}

                  {/* Khoá học của tôi */}

                  {/* Lịch sử thanh thánh */}
                </Outlet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentProfilePage;
