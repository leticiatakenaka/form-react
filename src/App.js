import "./App.css";
import { useState, useEffect, useMemo } from "react";
import { Card, TextField, Stack, Button, InputAdornment } from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { validEmail, validPass, validUsername } from "./regex.js";

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const [formErr, setFormErr] = useState({});

  const [formSucc, setFormSucc] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const validate = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validEmail.test(formData.email)) {
      errors.email = "This is not a valid email";
    }
    if (!formData.username) {
      errors.username = "Username is required";
    } else if (!validUsername.test(formData.username)) {
      errors.username = "This is not a valid username";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!validPass.test(formData.password)) {
      errors.password = "This is not a valid password";
    }

    return errors;
  };

  const validateEmail = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validEmail.test(formData.email)) {
      errors.email = "This is not a valid email";
    } else {
      setFormSucc(true);
    }

    return errors;
  };

  useEffect(() => {
    console.log(formErr);
    if (Object.keys(formErr).length === 0 && isSubmit) {
      console.log("Ok");
    }
  }, [formErr]);

  return (
    <div className="container">
      <Card sx={{ padding: 5, minWidth: 300 }}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={(e) => {
              setFormErr(validateEmail(formData.email));
              setFormData({ ...formData, email: e.target.value });
            }}
            helperText={formErr.email || " "}
            error={formErr.email ? true : false}
            InputProps={
              formErr.email
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <ErrorIcon style={{ color: "red" }} />
                      </InputAdornment>
                    ),
                  }
                : formData.email == ""
                ? null
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheckCircleIcon style={{ color: "green" }} />
                      </InputAdornment>
                    ),
                  }
            }
            color={formSucc ? "success" : "primary"}
          />
          <TextField
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={(e) => {
              // setFormErr(validateUsername(formData.username));
              setFormData({ ...formData, username: e.target.value });
            }}
            helperText={formErr.username || " "}
            error={formErr.username ? true : false}
          />
          <TextField
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={(e) => {
              // setFormErr(validatePassword(formData.password));

              setFormData({ ...formData, password: e.target.value });
            }}
            helperText={formErr.password || " "}
            error={formErr.password ? true : false}
          />
          <Button disabled={!isSubmit} variant="contained">
            Create
          </Button>
        </Stack>
      </Card>
    </div>
  );
}
