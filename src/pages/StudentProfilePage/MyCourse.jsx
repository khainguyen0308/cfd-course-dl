import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Empty } from "antd";
import CourseItem from "../../components/CourseItem";
import { COURSE_ITEM_TYPE } from "../../constants/general";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();
  console.log("courseInfo", courseInfo);
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {courseInfo?.length === 0 && (
          <Empty
            description="Không tìm thấy dữ liệu nào"
            style={{ margin: "0 auto" }}
          />
        )}
        {courseInfo?.length > 0 &&
          courseInfo.map((item, index) => (
            <CourseItem
              key={item.id || new Date().getTime() + index}
              type={COURSE_ITEM_TYPE.normal}
              {...item?.course}
            />
          ))}
      </div>
    </div>
  );
};

export default MyCourse;
