import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";

import { fetchCourseById, updateCourse } from "../api/courses";
import { fetchCategories } from "../api/categories";
import { getModuleDetail } from "../api/modules";
import { getQuizSetById } from "../api/quiz-set";

import CourseActions from "../components/CourseAction";
import { TitleForm } from "../components/TitleForm";
import { SubTitleForm } from "../components/SubTitleForm";
import { DescriptionForm } from "../components/DescriptionForm";
import { ImageForm } from "../components/ImageForm";
import { CategoryForm } from "../components/CategoryForm";
import { ModulesForm } from "../components/ModuleForm";
import { PriceForm } from "../components/PriceForm";
import { QuizSetForm } from "../components/QuizsetForm";
import { getAllActiveQuizSetsByInstructorId } from "../api/quiz-set";
import {useAuth} from "../context/AuthContext"
const EditCourseDetailPage = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courseModule, setCourseModule] = useState([]);
  const [courseQuizSet, setCourseQuizSet] = useState(null);
  const [activeQuizSet, setActiveQuizSet] = useState([]);
  const {user} = useAuth();
  // Load course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id]);

  // Load categories
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const list = await fetchCategories();
        setCategories(list);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategoryData();
  }, []);

  // Load modules
  useEffect(() => {
    const fetchModules = async () => {
      if (!course?.modules?.length) {
        setCourseModule([]);
        return;
      }

      try {
        const fetched = await Promise.all(
          course.modules.map((moduleId) => getModuleDetail(moduleId))
        );
        const sorted = fetched.sort((a, b) => a.order - b.order);
        setCourseModule(sorted);
      } catch (error) {
        console.error("Failed to fetch module details:", error);
      }
    };
    fetchModules();
  }, [course?.modules]);

  // ✅ Load quiz set
  useEffect(() => {
    const fetchQuizSet = async () => {
      if (!course?.quizSetId) return;
      try {
        const quizSet = await getQuizSetById(course.quizSetId);
        setCourseQuizSet(quizSet);
      } catch (error) {
        console.error("Error fetching quiz set:", error);
      }
    };
    fetchQuizSet();
  }, [course?.quizSetId]);

  const handleCourseUpdate = (updatedValues) => {
    setCourse((prev) => ({
      ...prev,
      ...updatedValues,
    }));
  };

  // load active quiz sets
  useEffect(() => {
    const fetchActiveQuizSets = async () => {
      try {
        const response = await getAllActiveQuizSetsByInstructorId(
         user?.id
        );
        setActiveQuizSet(response);
      } catch (error) {
        console.error("Error fetching active quiz sets:", error);
      }
    };
    fetchActiveQuizSets();
  }, []);

  function mapQuizSetsToProps(quizSetArray) {
    const options = quizSetArray.map((qs) => ({
      value: String(qs.id),
      label: qs.title,
    }));
    
    return  options ;
  }

  return (
    <>
      {course?.active === false && (
        <Alert variant="warning">
          This course is unpublished. It will not be visible in the course.
        </Alert>
      )}

      <Container className="my-4">
        <div>
          <CourseActions
            courseId={course?.id}
            isActive={course?.active}
            onUpdate={handleCourseUpdate}
          />
        </div>

        <div className="row mt-5 gx-3 gy-3">
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-gear"></i>
              <h5 className="mb-0">Customize your course</h5>
            </div>

            <TitleForm
              courseId={course?.id}
              initialData={{ title: course?.title }}
              onUpdate={handleCourseUpdate}
            />
            <SubTitleForm
              initialData={{ subtitle: course?.subtitle }}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />
            <DescriptionForm
              initialData={{ description: course?.description }}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />
            <ImageForm
              initialData={{ imageUrl: course?.thumbnail }}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />
            <CategoryForm
              initialData={{ value: course?.category?.title }}
              courseId={course?.id}
              options={categories}
              onUpdate={handleCourseUpdate}
            />

            <QuizSetForm
              initialData={{ quizSetTitle: courseQuizSet?.title || "" }}
              courseId={course?.id}
              options={mapQuizSetsToProps(activeQuizSet) || []}
              onUpdate={handleCourseUpdate}
            />
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-sliders"></i>
              <h5 className="mb-0">Courses Module</h5>
            </div>
            <ModulesForm
              initialData={courseModule}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />
            <div className="d-flex align-items-center gap-2 mt-3">
              <i className="bi bi-coin"></i>
              <h5 className="mb-0">Sell your course</h5>
            </div>
            <PriceForm
              initialData={{ price: course?.price }}
              courseId={course?.id}
              onUpdate={handleCourseUpdate}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditCourseDetailPage;
