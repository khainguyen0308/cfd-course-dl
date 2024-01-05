import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { requireRule, regrexRule } from "../../utils/validate";
import { message } from "antd";
import ComponentLoading from "../ComponentLoading";
import { MODAL_TYPES } from "../../constants/general";
import useForm from "./../../hooks/useForm";
import Input from "../Input";

const LoginForm = () => {
  const { handleShowModal, handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, error, register, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      password: [requireRule("Vui lòng nhập password")],
    }
  );
  const _onSubmit = (e) => {
    e.preventDefault();
    const errObj = validate();
    if (Object.keys(errObj)?.length > 0) {
      console.log("Submit error", errObj);
    } else {
      setLoading(true);
      console.log("Submit success", form);
      handleLogin?.(form, () => {
        setTimeout(() => {
          setLoading(false);
          // message.success("Đăng nhập thành công");
        }, 300);
      });
    }
  };
  // console.log("error", error);
  return (
    <div
      className="modal__wrapper-content mdlogin"
      style={{ position: "relative", display: "block" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPES.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form" noValidate="noValidate">
        <div className="form-group">
          <Input
            label="Email"
            placeholder="Email"
            type="text"
            required
            {...register("email")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Password"
            placeholder="Password"
            required
            type="password"
            {...register("password")}
          />
        </div>

        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
