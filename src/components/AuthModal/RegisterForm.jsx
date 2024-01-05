import React, { useState } from "react";
import validate, { regrexRule, requireRule } from "./../../utils/validate";
import useForm from "../../hooks/useForm";
import { message } from "antd";
import { MODAL_TYPES } from "../../constants/general";
import { useAuthContext } from "../../context/AuthContext";
import ComponentLoading from "../ComponentLoading";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import Button from "../Button";
import Input from "../Input";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, error, register, validate } = useForm(
    { name: "", email: "", password: "", confirmPassword: "" },
    {
      name: [requireRule("Vui lòng nhập họ và tên")],
      email: [
        requireRule("Vui lòng nhập Email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      password: [
        requireRule("Vui lòng nhập mật khẩu"),
        regrexRule(
          "password",
          "Mật khẩu gồm 8 ký tự có chữ cái, số và kí tự đặc biệt, viết thường và viết hoa"
        ),
      ],
      confirmPassword: [
        requireRule("Vui lòng xác nhận mật khẩu"),
        (value, values, errObj) => {
          if (
            values.password &&
            value !== values.password &&
            !errObj.password
          ) {
            return "Mật khẩu xác nhận không đúng";
          }
          return false;
        },
      ],
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
      handleRegister?.(form, () => {
        setTimeout(() => {
          setLoading(false);
          // message.success("Đăng ký thành công");
        }, 300);
      });
    }
  };
  return (
    <div
      className="modal__wrapper-content mdregister"
      style={{ position: "relative", display: "block" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModal(MODAL_TYPES.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form" noValidate="noValidate">
        <div className="form-group">
          <Input
            label="Họ và tên"
            placeholder="Họ và tên"
            required
            {...register("name")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Email"
            placeholder="Email"
            required
            {...register("email")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Mật khẩu"
            type="password"
            placeholder="Mật khẩu"
            required
            {...register("password")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Xác nhận mật khẩu"
            type="password"
            placeholder="Xác nhận mật khẩu"
            required
            {...register("confirmPassword")}
          />
        </div>
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý {` `}
          <Link
            className="color--primary"
            to={PATHS.PRIVACY}
            onClick={handleCloseModal}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className="form__btn-register" variant="primary" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
