// @ts-nocheck
import { Empty, Skeleton } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CourseItem } from "../../components/CourseItem";
import { Input } from "../../components/Input";
import useDebounce from "../../hooks/useDebounce";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";

const CoursesPage = () => {
  const { data, loading, error, refetch } = useQuery((query) =>
    courseService.getCourses(query)
  );
  const courses = data?.courses || [];

  // handle Search
  const [searchTerm, setSearchTerm] = useState(undefined);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // console.log('searchTerm', searchTerm)
  // console.log('debouncedSearchTerm', debouncedSearchTerm)


  useEffect(() => {
    //  refetch API
    if (typeof debouncedSearchTerm === "string") {
      refetch(debouncedSearchTerm ? `?search=${debouncedSearchTerm}` : "");
    }
  }, [debouncedSearchTerm]);


  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="search" style={{ width: "30%", margin: "0 auto" }}>
          <Input
            type="text"
            value={searchTerm || ""}
            placeholder="Tìm kiếm khoá học"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            Array(6)
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
        </div>
      </div>
    </main>
  );
};

export default CoursesPage;
