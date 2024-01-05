import React, { useEffect } from "react";
import ContentDetailSection from "./ContentDetailSection";
import FeaturedSection from "./FeaturedSection";
import FaqSection from "../Homepage/FaqSection";
import CoursesSection from "./CoursesSection";
import { questionService } from "../../services/questionService";
import { courseService } from "../../services/courseService";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { useParams } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utils/format";
import { ROLES } from "../../constants/role";
import HeroSection from "./HeroSection";
import HeaderTop from "../../components/HeaderTop";

const CourseDetailPage = () => {
  const params = useParams();
  const { courseId: courseSlug } = params;
  const { data: questionsData, loading: questionLoading } = useQuery(
    questionService.getQuestions
  );
  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourses
  );
  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCoursesBySlug);

  useEffect(() => {
    if (courseSlug) execute(courseSlug || "", {});
  }, [courseSlug]);

  // modify data
  const questions = questionsData?.questions || [];
  const courses = courseData?.courses || [];
  const orderLink = `/course-order/` + courseSlug;

  const { teams, startDate, price } = courseDetailData || {};
  const modifiedProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };
  // console.log("courseDetailData", courseDetailData);
  // console.log("modifiedProps", modifiedProps);
  // console.log("params", params);
  // console.log("courseSlug", courseSlug);

  const apiLoading = courseDetailLoading || questionLoading || courseLoading;

  // const pageLoading = useDebounce(apiLoading, 500);

  // if (pageLoading) {
  //   return <PageLoading />;
  // }
  return (
    <>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection {...modifiedProps} />
        <FaqSection questions={questions} loading={questionLoading} />
        <CoursesSection courses={courses} loading={courseLoading} />
      </main>
    </>
  );
};

export default CourseDetailPage;
