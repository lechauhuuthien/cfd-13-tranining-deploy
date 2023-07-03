import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/pathnames";
const MainLayout = lazy(() => import("./layout/MainLayout"));
const ProfileLayout = lazy(() => import("./layout/ProfileLayout"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Page404 = lazy(() => import("./pages/Page404"));
const MyCourses = lazy(() => import("./pages/ProfilePage/MyCourses"));
const MyInfo = lazy(() => import("./pages/ProfilePage/MyInfo"));
const MyPayment = lazy(() => import("./pages/ProfilePage/MyPayment"));
const CourseOrder = lazy(() => import("./pages/CourseOrder"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Main */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.COURSES} element={<CoursesPage />} />
          <Route path={PATHS.COURSE_DETAIL} element={<CourseDetail />} />

          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.BLOG} element={<BlogPage />} />
          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.COURSE_REGISTER} element={<CourseOrder />} />
            <Route path={PATHS.PROFILE.INDEX} element={<ProfileLayout />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.COURSES} element={<MyCourses />} />
              <Route path={PATHS.PROFILE.PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
