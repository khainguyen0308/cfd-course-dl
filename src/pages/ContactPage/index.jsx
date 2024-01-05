import React from "react";
import ContactTitle from "./ContactTitle";
import ContactSidebar from "./ContactSidebar";
import ContactForm from "./ContactForm";
import axios from "axios";
import useMutation from "../../hooks/useMutation";
import { subscribesService } from "../../services/subscribesService";
import { useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";

const ContactPage = () => {
  // const handleFormSubmit = (formData) => {
  //   console.log("formData", formData);
  // };
  const navigate = useNavigate();
  const { execute, data, error, loading } = useMutation(
    subscribesService.subscribes
  );

  const handleFormSubmit = async (formData) => {
    const payload = {
      name: formData?.name || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      title: formData?.topic || "",
      description: formData?.content || "",
    };
    execute?.(payload, {
      onSuccess: (data) => {
        console.log("data", data);
        navigate(PATHS.HOME);
      },
      onFail: (error) => {
        console.log("error", error);
      },
    });
    //   try {
    //     const res = await axios.post(
    //       "https://cfdcourses.cfdcircle.vn/api/v1/subscribes",
    //       payload
    //     );
    //     console.log("res", res);
    //     if (res.data) {
    //       alert("thanh cong");
    //     }
    //   } catch (error) {
    //     console.log("error", error);
    //   }
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
