import React, { useEffect, useRef, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import { useNavigate, useParams } from "react-router-dom";
import { courseService } from "../../services/courseService";
import useMutation from "../../hooks/useMutation";
import { formatCurrency } from "../../utils/format";
import { ROLES } from "../../constants/role";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import PATHS from "../../constants/paths";
import { message } from "antd";
import { orderService } from "../../services/orderService";

const CourseOrderPage = () => {
  const formRef = useRef({});
  //
  // InfoOrder
  //
  const { courseSlug } = useParams();
  //   console.log("courseSlug", courseSlug);
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
    courseService.getCoursesBySlug
  );

  useEffect(() => {
    if (courseSlug) executeCourseDetail(courseSlug, {});
  }, [courseSlug]);
  // Modify render data
  const { teams, price, tags } = courseDetailData || {};

  // Child props
  const InfoOrderProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)) || {},
    price: formatCurrency(price),
  };
  //
  // FormOrder
  //
  const { profile } = useAuthContext();
  //
  // PaymentOrder
  //
  // Handle paymentMethod change
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };

  const navigate = useNavigate();
  const { courseInfo, handleGetProfileCourse, handleGetProfilePayment } =
    useAuthContext();

  // console.log(
  //   "arrSlug",
  //   courseInfo.map((item) => {
  //     return item.course.slug;
  //   })
  // );
  // console.log("courseInfo", courseInfo);
  // console.log("paymentInfo", paymentInfo);
  // Handle orderCourse
  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );
  // Handle when user click
  const _onOrder = () => {
    const form = formRef?.current?.form;
    const validate = formRef?.current?.validate;
    const profileError = validate();

    if (Object.keys(profileError).length > 0) {
      console.log("Profile form validate failed", profileError);
    } else {
      if (paymentMethod) {
        // setup payload
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseDetailData?.id,
          type: form?.type,
          paymentMethod,
        };
        // call api order
        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATHS.PROFILE.MY_COURSE);
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn hình thức thanh toán");
      }
    }
  };
  // Handle isAlreadyOrder
  const isAlreadyOrder = courseInfo?.some(
    (item) => item?.course?.slug === courseSlug
  );

  // console.log("isAlreadyOrder", isAlreadyOrder);
  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder
            ref={formRef}
            profile={profile}
            types={tags}
            disabled={isAlreadyOrder}
          />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            selectedPayment={paymentMethod}
            disabled={isAlreadyOrder}
          />
          {/* addclass --processing khi bấm đăng ký */}
          <Button
            style={{ width: "100%" }}
            onClick={_onOrder}
            loading={orderLoading}
            disabled={isAlreadyOrder}
          >
            <span>{!!isAlreadyOrder ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
