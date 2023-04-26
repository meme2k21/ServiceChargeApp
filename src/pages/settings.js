import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import {
  EditOutlined, DeleteOutlined,PlusOutlined,UserOutlined, UserAddOutlined, FileSearchOutlined
} from '@ant-design/icons';

import React from "react";
import styles from "../styles/Home.module.css";
import { Space, Table, Tag, Button } from 'antd';
import { useState } from 'react';
import { Form, Modal, Row } from "react-bootstrap";

function settings() {

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role Name',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = 'green';
            if (tag === 'Inactive') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><EditOutlined style={{color: 'green', fontSize: '20px', cursor: 'pointer'}}  onClick={() => {showEditUserModal(); console.log(record);}}/></a>
          <a><DeleteOutlined style={{color: 'red', fontSize: '20px'}}  /></a>
        </Space>
      ),
    },
  ];
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios
        .get("http://localhost:8080/users")
        .then((response) => {
          setUsers(response?.data);
          console.log(response?.data);
        })
        .catch((err) => console.log(err));
    }, []);

  const data = [
    {
      key: '1',
      username: 'John Brown',
      email: 'r@gmail.com',
      role: 'Admin',
      status:['Active'],
    },
    {
      key: '2',
      username: 'John Brown 2',
      email: 'r@gmail.com',
      role: 'Admin',
      status:['Active'],
    },
    {
      key: '3',
      username: 'John Brown 3',
      email: 'r@gmail.com',
      role: 'Client ',
      status:['Inactive'],
    },
    
  ];
  

  const [addUserModal, setaddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  const handleRowClick = (record) => {
    setSelectedUserId({key: record.key, username: record.username, password: record.password, email: record.email, role : record.role, status: record.status});
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
      <h3 className={styles.title} style={{textAlign: "left", float: "left"}}> <UserOutlined />List of Users</h3>
      <Button className="btn_add" style={{boxShadow: "none", float: "right"}} onClick={showaddUserModal} icon={<PlusOutlined/>}>Add Users</Button>
      <Table columns={columns} dataSource={data} onRow={(record) => ({ onClick: () => {handleRowClick(record);}})} />
  
    {/* Modal for Add */}
    <Modal show={addUserModal} onHide={hideaddUserModal}>
      <div>
        <Modal.Header style={{padding: '10px', backgroundColor:'#963634', color:'white'}}>
          <Modal.Title style={{fontWeight: 'bold'}}><UserAddOutlined /> Add New User</Modal.Title>
          <svg
                style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', border:'1px solid gray' }}
                xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"
                onClick={hideaddUserModal}
            >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        </Modal.Header>
        <Modal.Body className="text-center" style={{ margin:'10px'}}>
          <form>
            <input type="text" placeholder="Username" className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <input type="email" placeholder="Email Address" className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <Form.Select className="bg-gray-100 outline-none text-sm flex-1 mb-2">
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </Form.Select>  
            <button type="submit" style={{boxShadow: "none"}} className="w-full bg-red-700 hover:bg-cyan hover:text-white"
            >
              Add User
            </button>
          </form>
        </Modal.Body>
      </div>
    </Modal>
    {/* MOdal for Edit */}
    <Modal show={editUserModal} onHide={hideEditUserModal} data={selectedUserId}>
      <div>
        <Modal.Header style={{padding: '10px', backgroundColor:'#963634', color:'white'}}>
          <Modal.Title style={{fontWeight: 'bold'}}><FileSearchOutlined /> Edit User</Modal.Title>
          <svg
                style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', border:'1px solid gray' }}
                xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"
                onClick={hideEditUserModal}
            >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        </Modal.Header>
        <Modal.Body style={{ margin:'10px'}}>
          <form className="form1">
            <label>Username</label>
            <input type="text" defaultValue={selectedUserId ? selectedUserId.username : ''} className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <label>Password</label>
            <input type="password" className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <label>Email</label>
            <input type="email" defaultValue={selectedUserId ? selectedUserId.email : ''} className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <label>Role</label>
            <Form.Select defaultValue={selectedUserId ? selectedUserId.role : ''}  className="bg-gray-100 outline-none text-sm flex-1 mb-2  selectRole">
              <option value="Client" selected={selectedUserId && selectedUserId.role === 'Client'}>Client</option>
              <option value="Admin" selected={selectedUserId && selectedUserId.role === 'Admin'}>Admin</option>
            </Form.Select>
            <label>Status</label>
            <Form.Select defaultValue={selectedUserId ? selectedUserId.status : ''}  className="bg-gray-100 outline-none text-sm  flex-1 mb-2 selectStatus">
              <option value="Active" selected={selectedUserId && selectedUserId.status === 'Active'}>Active</option>
              <option value="Inactive" selected={selectedUserId && selectedUserId.status === 'Inactive'}>Inactive</option>
            </Form.Select>
            <button type="submit" style={{boxShadow: "none"}} className="w-full bg-red-700 hover:bg-cyan hover:text-white">
              Update User
            </button>
          </form>
        </Modal.Body>
      </div>
    </Modal>
   </>
  );
}

export default settings;
