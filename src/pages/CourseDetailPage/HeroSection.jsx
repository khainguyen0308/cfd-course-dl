import React from "react";
import Button from "../../components/Button";
import { message } from "antd";

const HeroSection = ({
  title,
  name,
  startDate,
  duration,
  tags,
  orderLink,
  teacherInfo = {},
  price,
}) => {
  const _onCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    message.success("Đã copy đường dẫn khoá học này");
  };
  return (
    <section className="hero herodetail">
      <div className="hero__content">
        <div className="container">
          <h3 className="category label --white">{title || ""}</h3>
          <h2 className="title --white">{name || ""}</h2>
          <div className="infor">
            <div className="infor__item">
              <label className="label --white">Khai giảng</label>
              <p className="title --t3 --white">{startDate}</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Thời lượng</label>
              <p className="title --t3 --white">{duration}</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Hình thức</label>
              <p className="title --t3 --white">{tags?.join(" | ")}</p>
            </div>
          </div>
          {/* Chưa đăng ký */}
          <Button link={orderLink} className="btn btn--primary btn-regcourse">
            Đăng ký
          </Button>
          {/* Đã đăng ký */}
          {/* <div class="btn btn--primary btn-regcourse --disable">Đã đăng ký</div> */}
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          <a href className="user">
            <div className="user__img">
              <img src={teacherInfo.image} alt={teacherInfo.name} />
            </div>
            <p className="user__name --white">{teacherInfo.name}</p>
          </a>
          <div className="pricebox">
            <p className="title --t3 --white">{price}</p>
          </div>
          <a
            href="https://www.facebook.com/sharer/sharer.php?sdk=joey&u=https://cfdcircle.vn/khoa-hoc/khoa-hoc-lap-trinh-frontend-master-30&display=popup&ref=plugin&src=share_button"
            onClick={_onCopyLink}
            className="sharebox s--white"
          >
            Chia sẻ
            <i>
              <img
                src="https://cfdcircle.vn/img/iconshare.svg"
                alt="CFD Circle"
              />
            </i>
          </a>
        </div>
      </div>
      <div className="hero__background">
        <img
          className="hero__background-img"
          src="https://cfdcircle.vn/files/thumbnails/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
          alt="CFD Circle"
        />
      </div>
    </section>
  );
};

export default HeroSection;
