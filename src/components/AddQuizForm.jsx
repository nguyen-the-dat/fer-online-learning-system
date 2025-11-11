// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, Row, Col, Button, Card, Alert } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { FaPlusCircle } from "react-icons/fa";
// import * as z from "zod";
// import { addQuestionToQuizSet } from "../api/quiz-set";

// const formSchema = z.object({
//   title: z.string().min(1, { message: "Title is required" }),
//   description: z.string().min(1, { message: "Description is required" }),
//   optionA: z.object({
//     label: z.string().min(1, { message: "Option A is required" }),
//     isTrue: z.boolean().default(false),
//   }),
//   optionB: z.object({
//     label: z.string().min(1, { message: "Option B is required" }),
//     isTrue: z.boolean().default(false),
//   }),
//   optionC: z.object({
//     label: z.string().min(1, { message: "Option C is required" }),
//     isTrue: z.boolean().default(false),
//   }),
//   optionD: z.object({
//     label: z.string().min(1, { message: "Option D is required" }),
//     isTrue: z.boolean().default(false),
//   }),
// });

// export const AddQuizForm = ({ quizSetId, handleQuizsets }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//     mode: "all",
//     defaultValues: {
//       title: "",
//       description: "",
//       optionA: { label: "", isTrue: false },
//       optionB: { label: "", isTrue: false },
//       optionC: { label: "", isTrue: false },
//       optionD: { label: "", isTrue: false },
//     },
//   });

//   const onSubmit = async (values) => {
//     const correctCount = [
//       values.optionA.isTrue,
//       values.optionB.isTrue,
//       values.optionC.isTrue,
//       values.optionD.isTrue,
//     ].filter(Boolean).length;

//     if (correctCount !== 1) {
//       toast.error("Please mark exactly one option as correct");
//       return;
//     }

//     try {
//       const res = await addQuestionToQuizSet(quizSetId, values);
//       handleQuizsets(res);
//       toast.success("Quiz added successfully");

//       reset();
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Card className="my-4">
//       <Card.Body>
//         <Card.Title className="mb-3 d-flex justify-content-between align-items-center">
//           Add New Quiz
//         </Card.Title>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <Form.Group className="mb-3">
//             <Form.Label>Quiz Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter quiz question"
//               {...register("title")}
//               isInvalid={!!errors.title}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.title?.message}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Quiz Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter quiz description"
//               {...register("description")}
//               isInvalid={!!errors.description}
//             />
//             <Form.Control.Feedback type="invalid">
//               {errors.description?.message}
//             </Form.Control.Feedback>
//           </Form.Group>

//           {/* Options A-D */}
//           {["A", "B", "C", "D"].map((key) => (
//             <Row className="mb-3" key={key}>
//               <Col md={1} className="pt-2">
//                 <Form.Check
//                   type="checkbox"
//                   {...register(`option${key}.isTrue`)}
//                   label=""
//                 />
//               </Col>
//               <Col>
//                 <Form.Label>{`Option ${key}`}</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder={`Option ${key}`}
//                   {...register(`option${key}.label`)}
//                   isInvalid={!!errors?.[`option${key}`]?.label}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors?.[`option${key}`]?.label?.message}
//                 </Form.Control.Feedback>
//               </Col>
//             </Row>
//           ))}

//           <div className="d-flex justify-content-end">
//             <Button type="submit" disabled={isSubmitting}>
//               <FaPlusCircle className="me-2" />
//               Save
//             </Button>
//           </div>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";
import * as z from "zod";
import { addQuestionToQuizSet } from "../api/quiz-set";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  optionA: z.object({
    label: z.string().min(1, { message: "Option A is required" }),
    isTrue: z.boolean().default(false),
  }),
  optionB: z.object({
    label: z.string().min(1, { message: "Option B is required" }),
    isTrue: z.boolean().default(false),
  }),
  optionC: z.object({
    label: z.string().min(1, { message: "Option C is required" }),
    isTrue: z.boolean().default(false),
  }),
  optionD: z.object({
    label: z.string().min(1, { message: "Option D is required" }),
    isTrue: z.boolean().default(false),
  }),
});

export const AddQuizForm = ({ quizSetId, handleQuizsets, selectedQuiz, clearSelectedQuiz }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      optionA: { label: "", isTrue: false },
      optionB: { label: "", isTrue: false },
      optionC: { label: "", isTrue: false },
      optionD: { label: "", isTrue: false },
    },
  });

  useEffect(() => {
    if (selectedQuiz) {
      setValue("title", selectedQuiz.title);
      setValue("description", selectedQuiz.description);
      setValue("optionA.label", selectedQuiz.options[0].text);
      setValue("optionA.isTrue", selectedQuiz.options[0].is_correct);
      setValue("optionB.label", selectedQuiz.options[1].text);
      setValue("optionB.isTrue", selectedQuiz.options[1].is_correct);
      setValue("optionC.label", selectedQuiz.options[2].text);
      setValue("optionC.isTrue", selectedQuiz.options[2].is_correct);
      setValue("optionD.label", selectedQuiz.options[3].text);
      setValue("optionD.isTrue", selectedQuiz.options[3].is_correct);
    }
  }, [selectedQuiz, setValue]);

  const onSubmit = async (values) => {
    const correctCount = [
      values.optionA.isTrue,
      values.optionB.isTrue,
      values.optionC.isTrue,
      values.optionD.isTrue,
    ].filter(Boolean).length;

    if (correctCount !== 1) {
      toast.error("Please mark exactly one option as correct");
      return;
    }

    try {
      let res;
      if (selectedQuiz) {
        // res = await updateQuestionInQuizSet(quizSetId, selectedQuiz.id, values);
        toast.success("Quiz updated successfully");
      } else {
        res = await addQuestionToQuizSet(quizSetId, values);
        toast.success("Quiz added successfully");
      }
      handleQuizsets(res);
      reset();
      clearSelectedQuiz();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="my-4">
      <Card.Body>
        <Card.Title className="mb-3 d-flex justify-content-between align-items-center">
          {selectedQuiz ? "Edit Quiz" : "Add New Quiz"}
        </Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Quiz Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quiz question"
              {...register("title")}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quiz Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter quiz description"
              {...register("description")}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Options A-D */}
          {["A", "B", "C", "D"].map((key) => (
            <Row className="mb-3" key={key}>
              <Col md={1} className="pt-2">
                <Form.Check
                  type="checkbox"
                  {...register(`option${key}.isTrue`)}
                  label=""
                />
              </Col>
              <Col>
                <Form.Label>{`Option ${key}`}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Option ${key}`}
                  {...register(`option${key}.label`)}
                  isInvalid={!!errors?.[`option${key}`]?.label}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.[`option${key}`]?.label?.message}
                </Form.Control.Feedback>
              </Col>
            </Row>
          ))}

          <div className="d-flex justify-content-end">
            <Button type="submit" disabled={isSubmitting}>
              <FaPlusCircle className="me-2" />
              {selectedQuiz ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
