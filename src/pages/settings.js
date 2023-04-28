import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  UserAddOutlined,
  FileSearchOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

import React from "react";
import styles from "../styles/Home.module.css";
import { Space, Table, Tag, Button } from "antd";
import { useState } from "react";
import { Form, Modal, Row } from "react-bootstrap";

function settings() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  async function fetchRoles() {
    try {
      const result = await axios.get("http://localhost:8080/roles");
      setRoles(result?.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUsers() {
    try {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result?.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const handleUpdateUser = (newUserDetails) => {
    axios
      .put(
        `http://localhost:8080/user/update/${newUserDetails.user_id}`,
        newUserDetails
      )
      .then((response) => {
        console.log(response?.data.message);
      })
      .catch((err) => console.log("Error in updating" + err));
  };

  const handleAddUser = (userDetails) => {
    console.log(JSON.stringify(userDetails));
    axios
      .post(`http://localhost:8080/user/create`, userDetails)
      .then((response) => {
        console.log(response?.data.message);
      })
      .catch((err) => console.log("Error in creating user" + err));
  };

  const handleDeleteUser = (user_id) => {
    axios
      .delete(`http://localhost:8080/user/delete/${user_id}`)
      .then((response) => {
        console.log(response?.data.message);
        window.location.reload(); // Reload the page after a successful delete
      })
      .catch((err) => console.log(err));
    setShowDeleteModal(false);
  };

  const [addUserModal, setaddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "password123",
    email: "",
    status: "Active",
    dateCreated: new Date(),
    role: {
      role_id: null,
    },
  });
  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "role" ? { role_id: value } : value,
    }));
    console.log(JSON.stringify(user));
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Role Name",
      dataIndex: "role",
      key: "role",
      render: (role) => role?.role_name || "-",
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <>
          {status === "Active" ? (
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="volcano">{status}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EditOutlined
              style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
              onClick={() => {
                showEditUserModal();
                setSelectedUserId(record);
              }}
            />
          </a>
          <a>
            <DeleteOutlined
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => {
                setShowDeleteModal(true);
                setSelectedUser(record);
              }}
            />
          </a>
        </Space>
      ),
    },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedUserId((prevSelectedUser) => ({
      ...prevSelectedUser,
      [name]: name === "role" ? { role_id: value } : value,
    }));
    console.log(JSON.stringify(selectedUserId));
  };

  const handleRowClick = (record) => {
    console.log("lol" + record);
    setSelectedUserId({
      user_id: record.user_id,
      username: record.username,
      password: record.password,
      email: record.email,
      role: record.role,
      status: record.status,
      dateCreated: record.dateCreated,
    });
  };

  useEffect(() => {
    console.log(selectedUserId);
  }, [selectedUserId]);

  const showaddUserModal = () => {
    setaddUserModal(true);
  };
  const hideaddUserModal = () => {
    setaddUserModal(false);
  };

  const showEditUserModal = () => {
    setEditUserModal(true);
  };
  const hideEditUserModal = () => {
    setEditUserModal(false);
  };

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <h3 className={styles.title} style={{ textAlign: "left", float: "left" }}>
        {" "}
        <UserOutlined />
        List of Users
      </h3>
      <Button
        className="btn_add"
        style={{ boxShadow: "none", float: "right" }}
        onClick={showaddUserModal}
        icon={<PlusOutlined />}
      >
        Add Users
      </Button>
      <Table
        columns={columns}
        dataSource={users ?? []}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record);
          },
        })}
      />

      {/* Modal for Add */}
      <Modal show={addUserModal} onHide={hideaddUserModal}>
        <div>
          <Modal.Header
            style={{
              padding: "10px",
              backgroundColor: "#963634",
              color: "white",
            }}
          >
            <Modal.Title style={{ fontWeight: "bold" }}>
              <UserAddOutlined /> Add New User
            </Modal.Title>
            <svg
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                border: "1px solid gray",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
              onClick={hideaddUserModal}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
            </svg>
          </Modal.Header>
          <Modal.Body className="text-center" style={{ margin: "10px" }}>
            <form
              onSubmit={() => {
                handleAddUser(user);
                setaddUserModal(false);
              }}
            >
              <input
                name="username"
                value={user.username}
                onChange={handleUserInputChange}
                type="text"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
              />
              <input
                name="email"
                value={user.email}
                onChange={handleUserInputChange}
                type="email"
                placeholder="Email Address"
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
              />
              <Form.Select
                name="role"
                value={user.role.role_id}
                onChange={handleUserInputChange}
                required
                className="bg-gray-100 outline-none text-sm flex-1 mb-2 selectRole"
              >
                {roles.map((role) => (
                  <option
                    key={role.role_id}
                    value={role.role_id}
                    selected={user.role.role_id === role.role_id}
                  >
                    {role.role_name}
                  </option>
                ))}
              </Form.Select>

              <button
                type="submit"
                style={{ boxShadow: "none" }}
                className="w-full bg-red-700 hover:bg-cyan hover:text-white"
              >
                Add User
              </button>
            </form>
          </Modal.Body>
        </div>
      </Modal>
      {/* Modal for Edit */}
      <Modal
        show={editUserModal}
        onHide={hideEditUserModal}
        data={selectedUserId}
      >
        <div>
          <Modal.Header
            style={{
              padding: "10px",
              backgroundColor: "#963634",
              color: "white",
            }}
          >
            <Modal.Title style={{ fontWeight: "bold" }}>
              <FileSearchOutlined /> Edit User
            </Modal.Title>
            <svg
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                border: "1px solid gray",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
              onClick={hideEditUserModal}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
            </svg>
          </Modal.Header>

          <Modal.Body style={{ margin: "10px" }}>
            <form
              className="form1"
              onSubmit={() => {
                handleUpdateUser(selectedUserId);
                setEditUserModal(false);
              }}
            >
              <label>Username</label>
              <input
                name="username"
                value={selectedUserId?.username}
                onChange={handleInputChange}
                type="text"
                placeholder="Username"
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
              />
              <label>Email</label>
              <input
                name="email"
                value={selectedUserId?.email}
                onChange={handleInputChange}
                type="email"
                placeholder="Email Address"
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
              />
              <label>Password</label>
              <input
                name="password"
                value={selectedUserId?.password}
                onChange={handleInputChange}
                type="password"
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
              />
              <label>Role</label>
              <Form.Select
                name="role"
                value={selectedUserId?.role.role_id}
                onChange={handleInputChange}
                className="bg-gray-100 outline-none text-sm flex-1 mb-2 selectRole"
              >
                {roles.map((role) => (
                  <option
                    key={role.role_id}
                    value={role.role_id}
                    selected={selectedUserId?.role.role_id === role.role_id}
                  >
                    {role.role_name}
                  </option>
                ))}
              </Form.Select>
              <label>Status</label>
              <Form.Select
                name="status"
                value={selectedUserId?.status}
                onChange={handleInputChange}
                className="bg-gray-100 outline-none text-sm  flex-1 mb-2 selectStatus"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
              <button
                type="submit"
                style={{ boxShadow: "none" }}
                className="w-full bg-red-700 hover:bg-cyan hover:text-white"
              >
                Update User
              </button>
            </form>
          </Modal.Body>
        </div>
      </Modal>

      {/* Modal for Delete Confirmation */}
      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <div>
            <Modal.Header
              style={{
                padding: "10px",
                backgroundColor: "#963634",
                color: "white",
              }}
            >
              <Modal.Title style={{ fontWeight: "bold" }}>
                <UserDeleteOutlined /> Delete Confirmation
              </Modal.Title>
              <svg
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  cursor: "pointer",
                  border: "1px solid gray",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
                onClick={() => setShowDeleteModal(false)}
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
              </svg>
            </Modal.Header>
            <Modal.Body className="text-center" style={{ margin: "10px" }}>
              <h5>Are you sure you want to delete this user?</h5>
              <div className="flex-row">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  type="submit"
                  style={{ boxShadow: "none", width: "45%" }}
                  className="w-full  hover:bg-red-700 hover:text-white text-red-700 border border-red-700 border-solid"
                >
                  Cancel{" "}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteUser(selectedUser?.user_id)}
                  style={{ boxShadow: "none", width: "45%" }}
                  className="w-full bg-red-700 hover:bg-cyan hover:text-white border "
                >
                  Yes
                </button>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      )}
    </>
  );
}

export default settings;
