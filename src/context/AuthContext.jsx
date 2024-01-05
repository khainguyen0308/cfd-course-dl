import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authService } from "../services/authService";
import { message } from "antd";
import tokenMethod from "../utils/token";
import { orderService } from "../services/orderService";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState();

  const handleShowModal = (modalType) => {
    setShowedModal(modalType || "");
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowDropdown = (e) => {
    e?.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleCloseDropdown = (isShow) => {
    setShowDropdown(isShow);
  };

  const handleLogout = () => {
    tokenMethod.remove();
    setProfile(undefined);
  };

  const handleGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfile(profileRes.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  useEffect(() => {
    if (tokenMethod.get()) {
      // call api get profile
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);

  const handleLogin = async (loginData, callback) => {
    // payload
    const payload = { ...loginData };
    // api login
    try {
      const res = await authService.login(payload);
      const { token: accessToken, refreshToken } = res?.data?.data || {};
      // console.log("res", res);
      // Lưu vào cookie
      tokenMethod.set({
        accessToken,
        refreshToken,
      });

      if (!!tokenMethod) {
        // Lấy thông tin profile
        handleGetProfile();
        handleGetProfileCourse();
        handleGetProfilePayment();
        message.success("Đăng nhập thành công");
        handleCloseModal();
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 404) {
        message.error("Sai email hoặc password");
      } else {
        message.error("Đăng nhập thất bại");
      }
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    const { name, email, password } = registerData || {};
    // payload
    const payload = {
      firstName: name,
      lastName: "",
      email,
      password,
    };
    console.log("payload", payload);
    // api register
    try {
      const res = await authService.register(payload);
      console.log("res", res);
      if (res?.data?.data?.id) {
        message.success("Đăng kí thành công");
        // handle login
        handleLogin({
          email,
          password,
        });
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }
    } finally {
      callback?.();
    }
  };

  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
    } catch (error) {
      console.log("getCourseHistories error", error);
    }
  };

  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("getPaymentHistories error", error);
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const {
        firstName,
        email,
        password,
        facebookURL,
        introduce,
        phone,
        website,
      } = profileData;
      const payload = {
        firstName: firstName,
        lastName: "",
        email,
        password,
        facebookURL,
        website,
        introduce,
        phone,
      };
      const res = await authService.updateProfile(payload);
      if (res?.data?.data?.id) {
        message.success("Cập nhật thông tin thành công");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(() => {

  // }, [third])

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        showDropdown,
        handleShowDropdown,
        handleCloseDropdown,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleGetProfileCourse,
        handleGetProfilePayment,
        handleUpdateProfile,
        handleLogout,
        profile,
        courseInfo,
        paymentInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
