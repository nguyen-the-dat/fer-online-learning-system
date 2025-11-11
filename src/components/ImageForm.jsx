import React, { useEffect, useState } from "react";
import { Form, Button, Image as RBImage, Ratio } from "react-bootstrap";
import { Pencil, PlusCircle, Image as ImageIcon } from "react-bootstrap-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { toast } from "react-toastify";
import { updateCourse } from "../api/courses";

export const ImageForm = ({ initialData = {}, courseId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || ""); 
  const toggleEdit = () => setIsEditing((prev) => !prev);

  useEffect(() => {
    if (file) {
      const uploadToFirebase = async () => {
        const filePath = `courses/${courseId}_${file.name}`;
        const storageRef = ref(storage, filePath);

        await toast.promise(
          (async () => {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            await updateCourse(courseId, { thumbnail: downloadURL });
            setImageUrl(downloadURL);
            onUpdate?.({ thumbnail: downloadURL });
            toggleEdit();
          })(),
          {
            pending: "Uploading image...",
            success: "Image uploaded successfully 🎉",
            error: "Upload failed ❌",
          }
        );
      };

      uploadToFirebase();
    }
  }, [file]);

  useEffect(() => {
  if (initialData.imageUrl) {
    setImageUrl(initialData.imageUrl);
  }
}, [initialData.imageUrl]);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="mt-4 border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Course Image</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : !imageUrl ? (
            <>
              <PlusCircle className="me-2" />
              Add an image
            </>
          ) : (
            <>
              <Pencil className="me-2" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {!imageUrl ? (
            <div
              className="d-flex align-items-center justify-content-center rounded bg-secondary bg-opacity-10"
              style={{ height: "240px" }}
            >
              <ImageIcon size={48} className="text-muted" />
            </div>
          ) : (
            <Ratio aspectRatio="16x9" className="mb-2">
              <RBImage
                src={imageUrl}
                alt="Course"
                className="rounded object-fit-cover w-100 h-100"
                style={{ objectFit: "cover" }}
                fluid
              />
            </Ratio>
          )}
        </>
      )}

      {isEditing && (
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            Select an image (16:9 aspect ratio recommended)
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>
      )}
    </div>
  );
};
