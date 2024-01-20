import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../State/Auth/Action";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
    navigate("/");
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="w-full"
              type="submit"
              size="large"
              sx={{ padding: ".8rem 0" }}
              style={{ backgroundColor: "#380e86", color: "#fff" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="mt-3 text-center">
        <p className="mb-2">If you don't have an account?</p>
        <Button
          onClick={() => navigate("/register")}
          size="small"
          style={{ color: "#380e86" }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
