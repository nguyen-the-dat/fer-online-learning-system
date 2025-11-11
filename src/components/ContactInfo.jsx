import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { updateUserByEmail } from "../api/auth";

const ContactInfo = () => {
  const { user, setUser } = useAuth();

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    socialMedia: "",
  });

  const [alert, setAlert] = useState(null); 

  useEffect(() => {
    if (user) {
      setContactInfo({
        phone: user?.phone || "",
        socialMedia: user?.socialMedia || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedPhone = contactInfo.phone.trim();
    const trimmedSocialMedia = contactInfo.socialMedia.trim();

    try {
      const updatedUser = await updateUserByEmail(user.email, {
        phone: trimmedPhone,
        socialMedia: trimmedSocialMedia,
      });

      setUser(updatedUser);
      setAlert({ type: "success", message: "Contact info updated successfully." });
    } catch (error) {
      setAlert({ type: "danger", message: error.message || "Update failed." });
    }
  };

  return (
    <div>
      <h5 className="mb-4 fw-semibold">Contact Info :</h5>

      {alert?.message && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone No. :</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Phone"
            value={contactInfo.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="socialMedia">
          <Form.Label>SocialMedia :</Form.Label>
          <Form.Control
            type="url"
            name="socialMedia"
            placeholder="SocialMedia"
            value={contactInfo.socialMedia}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">Save Contact Info</Button>
      </Form>
    </div>
  );
};

export default ContactInfo;
