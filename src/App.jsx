import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseOrderPage from "./pages/CourseOrderPage";
import CoursesPage from "./pages/CoursesPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PrivacyPage from "./pages/PrivicyPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import PATHS from "./constants/paths";
import MyCourse from "./pages/StudentProfilePage/MyCourse";
import MyPayment from "./pages/StudentProfilePage/MyPayment";
import MyInfo from "./pages/StudentProfilePage/MyInfo";

function App() {
  return (
    <>
      {/* <MainLayout> */}
      {/* <Homepage /> */}
      {/* <ContactPage /> */}
      {/* <ErrorPage /> */}
      {/* <AboutPage /> */}
      {/* <BlogDetailPage /> */}
      {/* <BlogPage /> */}
      {/* <CourseDetailPage /> */}
      {/* <CourseOrderPage /> */}
      {/* <CoursesPage /> */}
      {/* <PaymentMethodPage /> */}
      {/* <PrivacyPage /> */}
      {/* <StudentProfilePage /> */}
      {/* </MainLayout> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
              <Route path="/profile" element={<StudentProfilePage />}>
                <Route index element={<MyInfo />} />
                <Route path="/profile/my-course" element={<MyCourse />} />
                <Route path="/profile/my-payment" element={<MyPayment />} />
              </Route>
            </Route>
            <Route path="/course" element={<CoursesPage />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />

            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:blogId" element={<BlogDetailPage />} />

            <Route path="/payment-method" element={<PaymentMethodPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
