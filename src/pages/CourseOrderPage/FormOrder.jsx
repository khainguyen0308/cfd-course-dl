import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import { useAuthContext } from "../../context/AuthContext";

const FormOrder = ({ profile, types, disabled }, ref) => {
  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};
  // Handle profile form
  const { form, register, validate, setForm } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    {
      name: [requireRule("Vui lòng nhập tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requireRule("Vui lòng nhập phone"),
        regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      type: [requireRule("Vui lòng chọn hình thức học")],
    }
  );

  useEffect(() => {
    setForm({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      type: "",
    });
  }, [profileName, profileEmail, profilePhone]);

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  // use ImperativeHandle
  useImperativeHandle(ref, () => {
    return {
      validate,
      form,
    };
  });

  const typeOptions =
    types?.length > 0
      ? [
          { value: "", label: "--" },
          ...types.map((type) => ({ value: type, label: type })),
        ]
      : [{ value: "", label: "--" }];
  return (
    <div className="itemorder formorder">
      <h3 className="title --t3">Thông tin cá nhân</h3>
      <div className="boxorder">
        <form action="#" className="form">
          <div className="form-container">
            <Input
              label="Họ và tên"
              required
              placeholder="Họ và tên"
              {...register("name")}
              disabled={disabled}
            />

            <Input
              label="Email"
              required
              placeholder="Email"
              disabled
              {...register("email")}
            />
          </div>
          <div className="form-container">
            <Input
              label="Số điện thoại"
              required
              placeholder="Số điện thoại"
              {...register("phone")}
              disabled={disabled}
            />

            <Input
              label="Hình thức học"
              required
              renderInput={(inputProps) => {
                return <Select options={typeOptions} {...inputProps} />;
              }}
              {...register("type")}
              disabled={disabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default forwardRef(FormOrder);
