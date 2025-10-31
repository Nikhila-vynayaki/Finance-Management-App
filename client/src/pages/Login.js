import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch, user } = useAuthContext();
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("/users/login", values);
      message.success("Login Successful");
      setLoading(false);
      localStorage.setItem(
        "Data",
        JSON.stringify(res.data.user) // Remove password before storing
      );
      dispatch({ type: "LOGIN", payload: res.data.user });
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Login error details:", {
        response: error.response?.data,
        status: error.response?.status,
        message: error.message,
      });
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="login-page">
        {loading && <Spinner />}

        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <div className="d-flex">
            <Link to="/register">No Account ? Click Here to SignUp</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
