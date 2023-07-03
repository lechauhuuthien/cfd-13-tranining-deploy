//@ts-nocheck
import React from "react";
import { useAuthen } from "../../components/AuthenContext";
import { CourseItem } from "../../components/CourseItem";

const MyCourses = () => {
  const { courseInfo } = useAuthen();

  const hasCourseInfo = !!courseInfo?.length;

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {hasCourseInfo && (
        <div className="courses__list">
          {courseInfo?.map((info) => {
            const courseInfo = info?.course || {};
            return <CourseItem key={courseInfo.id} {...courseInfo} />
          })}
        </div>
      )}
      {!hasCourseInfo && <p className="text">Bạn chưa đăng ký khóa học nào!</p>}
    </div>
  );
};

export default MyCourses;
