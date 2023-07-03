// @ts-nocheck
import React, { useMemo } from "react";
import { PageLoading } from "../../components/PageLoading";
import useDebounce from "../../hooks/useDebounce";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { questionService } from "../../services/questionService";
import { teamService } from "../../services/teamService";
import CallRegisterSection from "./CallRegisterSection";
import ComingCourseSection from "./ComingCourseSection";
import CoursesSection from "./CoursesSection";
import FAQSection from "./FAQSection";
import FeatureSection from "./FeatureSection";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import TeacherSection from "./TeacherSection";
import TestimonialSection from "./TestimonialSection";
import { galleryService } from "../../services/galleryService";

const HomePage = () => {
  // call API couses
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourses
  );

  const { data: teamsData, loading: teamsLoading } = useQuery(
    teamService.getTeams
  );

  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getQuestions
  );

  const { data: galleriesData, loading: galleriesLoading } = useQuery(
    galleryService.getGalleries
  );

  // Modify data
  const comingCourses = useMemo(
    () =>
      coursesData?.courses.filter(
        (course) => course?.startDate && new Date(course.startDate) < new Date()
      ) || [],
    [coursesData]
  );

  const allLoading =
    coursesLoading || teamsLoading || questionsLoading || galleriesLoading;
  const isLoadingPage = useDebounce(allLoading, 1000);
  if (isLoadingPage) return <PageLoading />;

  return (
    <main className="mainwrapper">
      <HeroSection />
      <ComingCourseSection
        comingCourses={comingCourses}
        loading={coursesLoading}
      />
      <CoursesSection
        courses={coursesData?.courses || []}
        loading={coursesLoading}
      />
      <TeacherSection teams={teamsData?.teams || []} />
      <FeatureSection />
      <TestimonialSection />
      <FAQSection questions={questionsData?.questions || []} />
      <GallerySection images={galleriesData?.galleries?.[0]?.images || []} />
      <CallRegisterSection />
    </main>
  );
};

export default HomePage;
