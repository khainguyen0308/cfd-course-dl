import { COURSE_ITEM_TYPE } from "../../constants/general";
import PATHS from "../../constants/paths";
import { formatDate, formatCurrency } from "../../utils/format";
import { Link } from "react-router-dom";
import Button from "../Button";
import { ROLES } from "../../constants/role";
const CourseItem = ({
  type = COURSE_ITEM_TYPE.normal,
  name,
  slug,
  tags,
  title,
  teams,
  image,
  startDate,
  price,
}) => {
  const teacherInfo = teams?.find((item) => item.tags.includes(ROLES.teacher));

  const detailPath = PATHS.COURSE.INDEX + `/${slug}`;
  const detailOrderPath = `/course` + `/${slug}`;
  if (type === COURSE_ITEM_TYPE.coming)
    return (
      <div className="coursecoming__item">
        <div className="coursecoming__item-img">
          <Link to={detailPath}>
            <img src={image || ""} alt="Khóa học sắp ra mắt CFD" />
          </Link>
        </div>
        <div className="coursecoming__item-content">
          <p className="category label">{title}</p>
          <h2 className="title --t2">
            <Link to={detailPath}>{name || ""}</Link>
          </h2>
          {!!teacherInfo && (
            <div className="user">
              <div className="user__img">{teacherInfo.image || ""}</div>
              <p className="user__name">{teacherInfo.name || ""}</p>
            </div>
          )}
          <div className="info">
            {!!startDate && (
              <div className="labeltext">
                <span className="label --blue">Ngày khai giảng</span>
                <p className="title --t2">{formatDate(startDate)}</p>
              </div>
            )}
            {tags?.length > 0 && (
              <div className="labeltext">
                <span className="label --blue">Hình thức học</span>
                <p className="title --t2">{tags.join(" | ")}</p>
              </div>
            )}
          </div>
          <div className="btnwrap">
            <Button link={detailOrderPath}>Đăng Ký Học</Button>
            <Button link={detailPath} variant="border">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    );
  // not type coming
  return (
    <div className="courses__list-item">
      <div className="img">
        <Link to={detailPath}>
          <img
            src={image || ""}
            alt="Khóa học CFD"
            className="course__thumbnail"
          />
          {tags?.length > 0 && (
            <span className="course__img-badge badge">{tags.join(" | ")}</span>
          )}
        </Link>
      </div>
      <div className="content">
        <p className="label">{title || ""}</p>
        <h3 className="title --t3">
          <Link to={detailPath}>{name || ""}</Link>
        </h3>
        <div className="content__info">
          {!!teacherInfo && (
            <div className="user">
              <div className="user__img">
                <img src={teacherInfo.image || ""} alt="Avatar teacher" />
              </div>
              <p className="user__name">{teacherInfo.name || ""}</p>
            </div>
          )}
          <div className="price">
            <strong>{formatCurrency(price || 0)}</strong>
          </div>
        </div>
        <div className="content__action">
          <Button link={PATHS.COURSE.ORDER}>Đăng Ký Học</Button>
          <Button link={detailPath} variant="border">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
