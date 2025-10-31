import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/layout/Spinner";
import Layout from "../components/layout/Layout";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Registration Failed");
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("Data");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register</h1>
          <Form.Item label="Username" name="name">
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <div className="d-flex">
            <Link to="/login">Already Registered? Click Here to Login</Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
