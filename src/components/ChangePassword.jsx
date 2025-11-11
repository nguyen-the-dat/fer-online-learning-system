import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { changePassword } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const ChangePassword = () => {
  const { user } = useAuth();

  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    reTypeNewPassword: "",
  });

  const [alert, setAlert] = useState(null); // { type: 'success' | 'danger', message: string }

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const oldPassword = passwordState.oldPassword.trim();
    const newPassword = passwordState.newPassword.trim();
    const reTypeNewPassword = passwordState.reTypeNewPassword.trim();

    // ✅ Validation
    if (!oldPassword || !newPassword || !reTypeNewPassword) {
      return setAlert({ type: "danger", message: "All fields are required." });
    }

    if (newPassword.length < 6) {
      return setAlert({ type: "danger", message: "New password must be at least 6 characters." });
    }

    if (newPassword !== reTypeNewPassword) {
      return setAlert({ type: "danger", message: "New password and confirmation do not match." });
    }

    try {
      const result = await changePassword({
        email: user.email,
        oldPassword,
        newPassword,
      });

      if (!result?.success) {
        setAlert({ type: "danger", message: result.message || "Failed to change password." });
      } else {
        setAlert({ type: "success", message: "Password changed successfully." });
      }
    } catch (error) {
      setAlert({ type: "danger", message: error.message || "Error occurred." });
    }

    // Reset form
    setPasswordState({
      oldPassword: "",
      newPassword: "",
      reTypeNewPassword: "",
    });
  };

  return (
    <div>
      <h5 className="mb-4 fw-semibold">Change Password :</h5>

      {alert?.message && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3" controlId="oldPassword">
          <Form.Label>Old Password:</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            placeholder="Old password"
            value={passwordState.oldPassword}
            onChange={handleChangePassword}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="New password"
            value={passwordState.newPassword}
            onChange={handleChangePassword}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="reTypeNewPassword">
          <Form.Label>Re-type New Password:</Form.Label>
          <Form.Control
            type="password"
            name="reTypeNewPassword"
            placeholder="Re-type new password"
            value={passwordState.reTypeNewPassword}
            onChange={handleChangePassword}
            required
          />
        </Form.Group>

        <Button type="submit">Save Password</Button>
      </Form>
    </div>
  );
};

export default ChangePassword;
