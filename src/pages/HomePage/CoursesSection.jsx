import { Empty, Skeleton } from "antd";
import React from "react";
import { CourseItem } from "../../components/CourseItem";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const CoursesSection = ({ loading = true, courses = [] }) => {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Tất cả <span className="color--primary">khóa học</span>
          </h2>
        </div>
        <div className="courses__list">
          {/* render courses */}
          {!loading && courses?.length === 0 && (
            <Empty
              description="Không tìm thấy dữ liệu nào"
              style={{ margin: "0 auto" }}
            />
          )}
          {loading &&
            Array(4)
              .fill("")
              .map((_, index) => (
                <div key={index} className="courses__list-item">
                  <Skeleton
                    style={{ width: "521.14px", height: "515.13px" }}
                    active
                  />
                </div>
              ))}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}
          {/* <div className="courses__list-item">
            <div className="img">
              <a href="course-detail.html">
                <img
                  src="https://cfdcircle.vn/files/thumbnails/ahvVmtDlrzUPhKLDrc4YkdA8iFbACauYCN76TSGs.jpg"
                  alt="Khóa học CFD"
                  className="course__thumbnail"
                />
                <span className="course__img-badge badge">
                  Offline | Online
                </span>
              </a>
            </div>
            <div className="content">
              <p className="label">Front-End</p>
              <h3 className="title --t3">
                <a href="course-detail.html">Frontend Newbie</a>
              </h3>
              <div className="content__info">
                <div className="user">
                  <div className="user__img">
                    <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
                  </div>
                  <p className="user__name">Trần Nghĩa</p>
                </div>
                <div className="price">
                  <strong>4.500.000đ</strong>
                </div>
              </div>
              <div className="content__action">
                <a href="course-order.html" className="btn btn--primary">
                  Đăng ký ngay
                </a>
                <a href="course-detail.html" className="btn btn--default">
                  <img src="/img/icon-paper.svg" alt="icon paper" />
                </a>
              </div>
            </div>
          </div>
          <div className="courses__list-item">
            <div className="img">
              <a href="course-detail.html">
                <img
                  src="https://cfdcircle.vn/files/thumbnails/9VVXxGDc4ujKCegv4zcejuxJ4gC8C1qeXnECvy7s.jpg"
                  alt="Khóa học CFD"
                  className="course__thumbnail"
                />
                <span className="course__img-badge badge">
                  Offline | Online
                </span>
              </a>
            </div>
            <div className="content">
              <p className="label">Front-End</p>
              <h3 className="title --t3">
                <a href="https://cfdcircle.vn/files/thumbnails/9VVXxGDc4ujKCegv4zcejuxJ4gC8C1qeXnECvy7s.jpg">
                  Web Responsive
                </a>
              </h3>
              <div className="content__info">
                <div className="user">
                  <div className="user__img">
                    <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
                  </div>
                  <p className="user__name">Trần Nghĩa</p>
                </div>
                <div className="price">
                  <strong>4.900.000đ</strong>
                </div>
              </div>
              <div className="content__action">
                <a href="course-order.html" className="btn btn--primary">
                  Đăng ký ngay
                </a>
                <a href="course-detail.html" className="btn btn--default">
                  <img src="/img/icon-paper.svg" alt="icon paper" />
                </a>
              </div>
            </div>
          </div>
          <div className="courses__list-item">
            <div className="img">
              <a href="course-detail.html">
                <img
                  src="https://cfdcircle.vn/files/thumbnails/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
                  alt="Khóa học CFD"
                  className="course__thumbnail"
                />
                <span className="course__img-badge badge">
                  Offline | Online
                </span>
              </a>
            </div>
            <div className="content">
              <p className="label">Front-End</p>
              <h3 className="title --t3">
                <a href="#">Frontend Master</a>
              </h3>
              <div className="content__info">
                <div className="user">
                  <div className="user__img">
                    <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
                  </div>
                  <p className="user__name">Trần Nghĩa</p>
                </div>
                <div className="price">
                  <strong>14.700.000đ</strong>
                </div>
              </div>
              <div className="content__action">
                <a href="course-order.html" className="btn btn--primary">
                  Đăng ký ngay
                </a>
                <a href="course-detail.html" className="btn btn--default">
                  <img src="/img/icon-paper.svg" alt="icon paper" />
                </a>
              </div>
            </div>
          </div>
          <div className="courses__list-item">
            <div className="img">
              <a href="course-detail.html">
                <img
                  src="https://cfdcircle.vn/files/thumbnails/ZUTudJyluuW4DGhZ6iXS2z6jRnEe7RnKTKhDTR6h.jpg"
                  alt="Khóa học CFD"
                  className="course__thumbnail"
                />
                <span className="course__img-badge badge">
                  Offline | Online
                </span>
              </a>
            </div>
            <div className="content">
              <p className="label">Front-End</p>
              <h3 className="title --t3">
                <a href="course-detail.html">ReactJS Master</a>
              </h3>
              <div className="content__info">
                <div className="user">
                  <div className="user__img">
                    <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
                  </div>
                  <p className="user__name">Trần Nghĩa</p>
                </div>
                <div className="price">
                  <strong>6.000.000đ</strong>
                </div>
              </div>
              <div className="content__action">
                <a href="course-order.html" className="btn btn--primary">
                  Đăng ký ngay
                </a>
                <a href="course-detail.html" className="btn btn--default">
                  <img src="/img/icon-paper.svg" alt="icon paper" />
                </a>
              </div>
            </div>
          </div> */}
        </div>
        <div className="courses__btnall">
          <Link to={PATHS.COURSES} className="course__btn btn btn--grey">
            Tất cả khoá học
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
