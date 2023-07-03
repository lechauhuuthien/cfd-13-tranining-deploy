import React, { useMemo } from "react";
import { Roles } from "../../constants/roles";
import { Link } from "react-router-dom";
import { formatCurrency, formatTimeDisplay } from "../../utils/format";
import { Button } from "../Button";
import { PATHS } from "../../constants/pathnames";

const CourseItemM = (props) => {
  // type coure includes normal/comming
  // @ts-ignore
  const {
    name,
    title,
    price,
    tags,
    image,
    teams,
    id,
    startDate,
    slug,
    type = "normal",
  } = props || {};

  const teacherInfo = useMemo(() => {
    return teams?.find((team) => team.tags.includes(Roles.Teacher));
  }, [teams]);

  if (type === "coming") {
    return (
      <div className="coursecoming__item">
        <div className="coursecoming__item-img">
          <Link to={PATHS.COURSES + `/${slug}`}>
            <img src={image} alt={slug} className="course__thumbnail" />
          </Link>
        </div>
        <div className="coursecoming__item-content">
          <p className="category label">{title}</p>
          <h2 className="title --t2">
            <Link to={PATHS.COURSES + `/${slug}`}>{name}</Link>
          </h2>
          <div className="user">
            {teacherInfo && (
              <>
                <div className="user__img">
                  <img src={teacherInfo.image} alt="Avatar teacher" />
                </div>
                <p className="user__name">{teacherInfo.name}</p>
              </>
            )}
          </div>
          <div className="info">
            <div className="labeltext">
              <span className="label --blue">Ngày khai giảng</span>
              <p className="title --t2">
                {startDate ? formatTimeDisplay(startDate) : "Chưa xác định"}
              </p>
            </div>
            <div className="labeltext">
              <span className="label --blue">Hình thức học</span>
              <p className="title --t2">{tags ? tags.join(" | ") : ""}</p>
            </div>
          </div>
          <div className="btnwrap">
            <Link to={`/register/${slug}`} className="btn btn--primary">
              Đăng ký ngay
            </Link>
            <Link to={`/register/${slug}`} className="btn btn--default">
              <img src="/img/icon-paper.svg" alt="icon paper" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses__list-item">
      <div className="img">
        <Link to={PATHS.COURSES + `/${slug}`}>
          <img src={image} alt={slug} className="course__thumbnail" />
          {tags && (
            <span className="course__img-badge badge">
              {tags.join(" | ") || ""}
            </span>
          )}
        </Link>
      </div>
      <div className="content">
        <p className="label">{title}</p>
        <h3 className="title --t3">
          <Link to={PATHS.COURSES + `/${slug}`}>{name}</Link>
        </h3>
        <div className="content__info">
          <div className="user">
            {teacherInfo && (
              <>
                <div className="user__img">
                  <img src={teacherInfo.image} alt="Avatar teacher" />
                </div>
                <p className="user__name">{teacherInfo.name}</p>
              </>
            )}
          </div>
          <div className="price">
            <strong>{formatCurrency(price)} đ</strong>
          </div>
        </div>
        <div className="content__action">
          <Link to={`/register/${slug}`} className="btn btn--primary">
            Đăng ký ngay
          </Link>
          <Link to={`/register/${slug}`} className="btn btn--default">
            <img src="/img/icon-paper.svg" alt="icon paper" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const CourseItem = React.memo(CourseItemM);
