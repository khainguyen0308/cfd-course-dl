import React, { useEffect } from "react";
import Accordion from "../../components/Accordion";

const FaqSection = ({ questions = [], loading = false }) => {
  // useEffect(() => {
  //   function accordion() {
  //     $(document).on(
  //       "click",
  //       ".accordion .accordion__content-title",
  //       function () {
  //         $(this).next().stop().slideToggle(200);
  //         $(this).closest(".accordion__content").toggleClass("active");
  //         $(this)
  //           .closest(".accordion__content")
  //           .siblings(".active")
  //           .removeClass("active")
  //           .find(".accordion__content-text")
  //           .stop()
  //           .slideUp(200);
  //       }
  //     );
  //   }
  //   accordion();
  // }, []);

  const modifyQuestions = questions.map((question) => {
    return {
      id: question.id || "",
      title: question.question || "",
      content: question.answer || "",
    };
  });
  const commonQuestions = modifyQuestions.slice(0, 6);
  const otherQuestions = modifyQuestions.slice(6);
  // console.log("commonQuestions", commonQuestions);
  return (
    <section className="faq --scpadding">
      <div className="container">
        <div className="faq__inner">
          <div className="heading --noline --center">
            <h2 className="heading__title title --t2">
              Câu hỏi <span className="color--primary">thường gặp</span>
            </h2>
          </div>
          <div className="faq__list">
            {!loading && (
              <Accordion label="Thông tin chung" data={commonQuestions} />
            )}
            {!loading && (
              <Accordion label="Đăng kí, thanh toán" data={otherQuestions} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
