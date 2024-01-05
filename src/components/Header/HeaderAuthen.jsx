import React, { useState } from "react";
import { MODAL_TYPES } from "../../constants/general";
import { useAuthContext } from "../../context/AuthContext";
import tokenMethod from "../../utils/token";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

const HeaderAuthen = () => {
  const {
    handleShowModal,
    profile,
    handleLogout,
    showDropdown,
    handleShowDropdown,
  } = useAuthContext();
  // console.log("profile", profile);
  const _onRegisterClick = (e) => {
    e.stopPropagation();
    handleShowModal(MODAL_TYPES.register);
  };
  const _onLoginClick = (e) => {
    e.stopPropagation();
    handleShowModal(MODAL_TYPES.login);
  };

  if (!!!tokenMethod.get()) {
    return (
      <div className="header__auth">
        <a
          href="javascript:void(0)"
          className="btn btn--transparent btnmodal"
          data-modal="mdlogin"
        >
          <span onClick={_onRegisterClick}>Đăng ký /&nbsp;</span>
          <span onClick={_onLoginClick}>Đăng nhập</span>
        </a>
      </div>
    );
  }
  return (
    <>
      {/* user logged */}
      <div className="header__logged">
        <div className="userlogged">
          <div
            className="userlogged__avatar user"
            data-dropdown="userlogged__dropdown"
            onClick={(e) => {
              e.stopPropagation();
              handleShowDropdown();
            }}
          >
            <div className="userlogged__avatar-img user__img">
              <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
            </div>
            <i className="userlogged__avatar-icon">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
              </svg>
            </i>
          </div>
          <div
            className={`userlogged__dropdown dropdown ${
              showDropdown ? "active" : ""
            }`}
          >
            <div className="userlogged__dropdown-info">
              <div className="user__img">
                <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
              </div>
              <Link to={PATHS.PROFILE.INDEX} className="user__info">
                <p className="title --t4">
                  <strong>{profile?.firstName || ""}</strong>
                </p>
                <span className="email">Thông tin tài khoản</span>
              </Link>
            </div>
            <div className="userlogged__dropdown-list">
              <Link to={PATHS.PROFILE.MY_COURSE}>Khóa học của tôi</Link>
              <Link to={PATHS.PROFILE.MY_PAYMENT}>Lịch sử thanh toán</Link>
              <Link to={PATHS.CONTACT}>Hỗ trợ</Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Đăng xuất{" "}
                <i>
                  <img src="/img/iconlogout.svg" alt />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAuthen;
