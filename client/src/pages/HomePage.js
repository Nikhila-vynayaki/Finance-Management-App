import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Modal, Form, Select, message, Input, Table, DatePicker } from "antd";
import Spinner from "../components/layout/Spinner";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Enable the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [frequency, setFrequency] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [type, setType] = useState("all");

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) =>
        dayjs(text).tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A [IST]"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);
        let url;

        if (frequency === "custom") {
          if (!selectedDate || selectedDate?.length !== 2) {
            message.error("Please select a date range for custom frequency");
            setLoading(false);
            return;
          }
          const [start, end] = selectedDate;
          url = `/transactions/get-transactions?frequency=custom&startDate=${start.format(
            "YYYY-MM-DD"
          )}&endDate=${end.format("YYYY-MM-DD")}`;
        } else if (frequency) {
          url = `/transactions/get-transactions?frequency=${frequency}`;
        } else {
          url = `/transactions/get-transactions`;
        }
        if (type && type !== "all") {
          url += url.includes("?") ? `&type=${type}` : `?type=${type}`;
        }

        console.log("Fetching from:", url);
        const res = await axios.get(url);
        setTransactions(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        message.error("Something went wrong");
        console.log(error);
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("Data"));
      // 🚨 Check user validity before using it
      if (!user || !user._id) {
        message.error("User not found. Please log in again.");
        return; // Stop execution
      }

      setLoading(true);
      await axios.post("/api/v1/transactions/create-transaction/" + user._id, {
        ...values,
        userid: user._id,
      });
      setLoading(false);
      message.success("Transaction Created Successfully");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="text-center justify-content-center">
        <h1>Welcome to Home Page</h1>
        <div className="transactions">
          <div>
            <Select
              value={frequency || undefined}
              placeholder="Please Select"
              onChange={(value) => setFrequency(value)}
            >
              <Select.Option value="7">Past 1 Week</Select.Option>
              <Select.Option value="31">Past Month</Select.Option>
              <Select.Option value="360">Past Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <DatePicker.RangePicker
                format="YYYY-MM-DD"
                onChange={(dates) => {
                  setSelectedDate(dates);
                }}
              />
            )}
          </div>

          <div>
            <Select
              value={type || undefined}
              placeholder="Please Select"
              onChange={(value) => setType(value)}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
            {frequency === "custom" && (
              <DatePicker.RangePicker
                format="YYYY-MM-DD"
                onChange={(dates) => {
                  setSelectedDate(dates);
                }}
              />
            )}
          </div>

          <button
            className="btn btn-outline-success"
            onClick={() => setIsModalVisible(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="table-data">
        <Table columns={columns} dataSource={transactions} rowKey="_id" />
      </div>
      <Modal
        title="Add Transaction"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" className="full-width" required />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="groceries">Groceries</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="emi">EMI</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" className="full-width" required />
          </Form.Item>
          <Form.Item label="Description " name="desc">
            <Input type="text" className="full-width" required />
          </Form.Item>
          <Form.Item label="Date " name="date">
            <Input type="date" className="full-width" required />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success">SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
