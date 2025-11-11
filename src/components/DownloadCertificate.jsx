import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useProgress } from "../context/ProgressContext";
import { fetchCourseById } from "../api/courses";
import { useAuth } from "../context/AuthContext";
const fontkit = await import("fontkit");

const DownloadCertificate = ({ courseId }) => {
  const [courseInfo, setCourseInfo] = useState(null);
  const { totalProgress } = useProgress();
  const {user} = useAuth();
  useEffect(() => {
    async function getCourse() {
      try {
        const course = await fetchCourseById(courseId);
        setCourseInfo(course);
      } catch (error) {
        console.error("error while fetching course detail", error);
      }
    }

    getCourse();
  });
  const handleDownload = async () => {
    if (totalProgress < 100) {
      alert("Bạn cần hoàn thành 100% tiến độ trước khi tải chứng chỉ.");
      return;
    }

    try {
      const now = new Date();
      const completionDate = now.toLocaleDateString("vi-VN"); 

      const completionInfo = {
        name: `${user?.firstName} ${user?.lastName}`,
        completionDate: completionDate,
        courseName: courseInfo?.title,
        instructor: courseInfo?.instructor?.name,
        instructorDesignation: "Giảng viên chính",
        sign: "/sign.png",
      };

      const kalamFontBytes = await fetch("/fonts/kalam/Kalam-Regular.ttf").then(
        (res) => res.arrayBuffer()
      );
      const montserratFontBytes = await fetch(
        "/fonts/montserrat/Montserrat-Medium.ttf"
      ).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit);

      const kalamFont = await pdfDoc.embedFont(kalamFontBytes);
      const montserrat = await pdfDoc.embedFont(montserratFontBytes);

      const page = pdfDoc.addPage([841.89, 595.28]);
      const { width, height } = page.getSize();

      const logoBytes = await fetch("/logo.png").then((res) =>
        res.arrayBuffer()
      );
      const logo = await pdfDoc.embedPng(logoBytes);
      const logoDimns = logo.scale(0.5);
      page.drawImage(logo, {
        x: width / 2 - logoDimns.width / 2,
        y: height - 120,
        width: logoDimns.width,
        height: logoDimns.height,
      });

      const titleText = "Certificate Of Completion";
      const titleFontSize = 30;
      const titleTextWidth = montserrat.widthOfTextAtSize(
        titleText,
        titleFontSize
      );
      page.drawText(titleText, {
        x: width / 2 - titleTextWidth / 2,
        y: height - (logoDimns.height + 125),
        size: titleFontSize,
        font: montserrat,
        color: rgb(0, 0.53, 0.71),
      });

      const subtitleText = "This certificate is hereby bestowed upon";
      const subtitleFontSize = 20;
      const subtitleTextWidth = montserrat.widthOfTextAtSize(
        subtitleText,
        subtitleFontSize
      );
      page.drawText(subtitleText, {
        x: width / 2 - subtitleTextWidth / 2,
        y: height - (logoDimns.height + 170),
        size: subtitleFontSize,
        font: montserrat,
        color: rgb(0, 0, 0),
      });

      const nameFontSize = 40;
      const nameTextWidth = kalamFont.widthOfTextAtSize(
        completionInfo.name,
        nameFontSize
      );
      page.drawText(completionInfo.name, {
        x: width / 2 - nameTextWidth / 2,
        y: height - (logoDimns.height + 220),
        size: nameFontSize,
        font: kalamFont,
        color: rgb(0, 0, 0),
      });

      const detailsText = `This is to certify that ${completionInfo.name} successfully completed the "${completionInfo.courseName}" course on ${completionInfo.completionDate} by ${completionInfo.instructor}.`;
      page.drawText(detailsText, {
        x: 60,
        y: height - 330,
        size: 16,
        font: montserrat,
        color: rgb(0, 0, 0),
        maxWidth: 700,
      });

      const signatureBoxWidth = 300;
      page.drawText(completionInfo.instructor, {
        x: width - signatureBoxWidth,
        y: 90,
        size: 16,
        font: montserrat,
        color: rgb(0, 0, 0),
      });
      page.drawText(completionInfo.instructorDesignation, {
        x: width - signatureBoxWidth,
        y: 72,
        size: 10,
        font: montserrat,
        color: rgb(0, 0, 0),
      });
      page.drawLine({
        start: { x: width - signatureBoxWidth, y: 110 },
        end: { x: width - 60, y: 110 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });

      const signBytes = await fetch(completionInfo.sign).then((res) =>
        res.arrayBuffer()
      );
      const sign = await pdfDoc.embedPng(signBytes);
      page.drawImage(sign, {
        x: width - signatureBoxWidth,
        y: 120,
        width: 180,
        height: 54,
      });

      const patternBytes = await fetch("/pattern.jpg").then((res) =>
        res.arrayBuffer()
      );
      const pattern = await pdfDoc.embedJpg(patternBytes);
      page.drawImage(pattern, {
        x: 0,
        y: 0,
        width,
        height,
        opacity: 0.2,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "Certificate.pdf");
    } catch (err) {
      console.error("Failed to generate certificate:", err);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleDownload}
      className="w-100 mt-2"
      disabled={totalProgress < 100}
    >
      Tải chứng chỉ
    </Button>
  );
};

export default DownloadCertificate;
