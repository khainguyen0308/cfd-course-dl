import React from "react";
import Input from "../../components/Input";
import { useState } from "react";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import validate from "../../utils/validate";
import { requireRule } from "../../utils/validate";
import { regrexRule } from "../../utils/validate";
import useForm from "../../hooks/useForm";

// rules
const rules = {
  name: [requireRule("Vui lòng nhập tên")],
  email: [
    requireRule("Vui lòng nhập email"),
    regrexRule("email", "Vui lòng nhập đúng định dạng email"),
  ],
  phone: [
    requireRule("Vui lòng nhập phone"),
    regrexRule(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Vui lòng nhập đúng định dạng phone"
    ),
  ],
  topic: [requireRule("Vui lòng nhập topic")],
  content: [requireRule()],
};

const ContactForm = ({ handleFormSubmit }) => {
  const { form, register, validate } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      topic: "",
      content: "",
    },
    rules
  );
  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   topic: "",
  //   content: "",
  // });

  // const _onChange = (e) => {
  //   const value = e.target.value;
  //   const name = e.target.name;

  //   setForm({ ...form, [name]: value });
  // };

  // const [error, setError] = useState({});

  // const register = (registerField) => {
  //   return {
  //     name: registerField,
  //     error: error[registerField],
  //     value: form[registerField],
  //     onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
  //   };
  // };

  const _onSubmit = (event) => {
    event.preventDefault();

    // start validate
    // const errorObject = {};

    // if (!!!form.name) {
    //   errorObject.name = "Vui lòng nhập tên";
    // }

    // if (!!!form.email) {
    //   errorObject.email = "Vui lòng nhập email";
    // } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
    //   errorObject.email = "Vui lòng nhập đúng định dạng email";
    // }

    // if (!!!form.phone) {
    //   errorObject.phone = "Vui lòng nhập phone";
    // } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) {
    //   errorObject.phone = "Vui lòng nhập đúng định dạng phone";
    // }
    // const errorObject = validate(rules, form);

    // end validate

    // setError(errorObject);
    const errorObject = validate();
    // handle submit
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error", errorObject);
    } else {
      // call API
      console.log("Submit success", form);
      handleFormSubmit?.(form);
    }
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      {/* <div className="form-group">
        <label className="label">
          Họ và tên <span>*</span>
        </label>
        <input defaultValue type="text" className="form__input formerror" />
        <p className="error">Họ và tên không được để trống</p>
      </div> */}
      <Input
        label="Họ và tên"
        required
        placeholder="Họ và tên"
        {...register("name")}
      ></Input>
      {/* <div className="form-group">
        <label className="label">
          Email <span>*</span>
        </label>
        <input defaultValue type="text" className="form__input" />
      </div> */}
      <Input
        label="Email"
        required
        placeholder="Email"
        {...register("email")}
      ></Input>
      {/* <div className="form-group">
        <label className="label">
          Số điện thoại <span>*</span>
        </label>
        <input defaultValue type="text" className="form__input" />
      </div> */}
      <Input
        label="Số điện thoại"
        required
        placeholder="Số điện thoại"
        {...register("phone")}
      ></Input>

      {/* <div className="form-group">
        <label className="label">
          Chủ đề cần hỗ trợ <span>*</span>
        </label>
        <div className="select">
          <div className="head form__input">--</div>
          <div className="sub">
            <a href="#">Web Responsive</a>
            <a href="#">React &amp; Redux</a>
          </div>
        </div>
      </div> */}
      <Input
        label="Chủ đề cần hỗ trợ"
        required
        placeholder="Chủ đề cần hỗ trợ"
        {...register("topic")}
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJs" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
      ></Input>

      {/* <div className="form-group">
        <label className="label">
          Nội dung <span>*</span>
        </label>
        <textarea className="form__input" defaultValue={""} />
      </div> */}
      <Input
        label="Nội dung"
        required
        placeholder="Nội dung"
        {...register("content")}
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
      ></Input>

      <div className="btncontrol">
        {/* <button className="btn btn--primary">Gửi</button> */}
        <Button variant="primary" onClick={_onSubmit}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
