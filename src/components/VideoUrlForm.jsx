import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Spinner } from "react-bootstrap";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { updateLesson } from "../api/lessons";
import VideoPlayer from "./VideoPlayer";

export const VideoUrlForm = ({ initialData, lessonId, updateListLesson }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [videoData, setVideoData] = useState({
    playbackId: initialData?.playbackId || "",
  });

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const file = data.video?.[0];
    if (!file) {
      toast.error("Please select a video file");
      return;
    }

    try {
      setIsUploading(true);
      toast.info("📤 Uploading video...");

      // 1. Create MUX upload
      const resUpload = await fetch(
        "http://localhost:3005/api/mux/create-upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const { uploadUrl, uploadId } = await resUpload.json();

      // 2. Upload video file to MUX
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      toast.info("⏳ Video is processing...");

      // 3. Polling MUX asset status
      let asset = null;
      for (let i = 0; i < 20; i++) {
        const resAsset = await fetch(
          `http://localhost:3005/api/mux/asset/${uploadId}`
        );

        if (resAsset.status === 202) {
          await new Promise((res) => setTimeout(res, 3000));
          continue;
        }

        const assetData = await resAsset.json();

        if (assetData?.playback_ids?.[0]?.id) {
          const playbackId = assetData.playback_ids[0].id;
          asset = { playbackId }; 
          break;
        }

        await new Promise((res) => setTimeout(res, 3000));
      }
      console.log("asset", asset);
      if (!asset) throw new Error("Timeout: Asset not ready");

      // 4. Save to lesson
      const playbackId = asset.playbackId;
      const updatedLesson = await updateLesson(lessonId, { playbackId });
      updateListLesson(updatedLesson);
      setVideoData({ playbackId });

      toast.success("🎉 Video uploaded and saved");
      toggleEdit();
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border rounded p-3 bg-light mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Video</strong>
        <Button variant="outline-secondary" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil size={16} className="me-1" />
              Edit Video
            </>
          )}
        </Button>
      </div>

      {/* Video Player (non-edit mode) */}
      {!isEditing && videoData.playbackId && (
        <div className="mt-3">
          <VideoPlayer playbackId={videoData.playbackId} />
        </div>
      )}

      {/* Upload Form (edit mode) */}
      {isEditing && (
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Select Video File</Form.Label>
            <Form.Control
              type="file"
              {...register("video")}
              accept="video/*"
              disabled={isUploading}
            />
          </Form.Group>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default VideoUrlForm;
