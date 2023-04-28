import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import {
  EditOutlined, DeleteOutlined,PlusOutlined,UserOutlined, UserAddOutlined, FileSearchOutlined,UserDeleteOutlined
} from '@ant-design/icons';

import React from "react";
import styles from "../styles/Home.module.css";
import { Space, Table, Tag, Button } from 'antd';
import { useState } from 'react';
import { Form, Modal, Row } from "react-bootstrap";
import { fontStyle } from "@mui/system";

function settings() {

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',

    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role Name',
      render: (record) => record.role.role_name,
      key: 'role',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status && (
           <  Tag color={status === 'Active' ? 'green' : 'red'} key={status}>
              {status.toUpperCase()}
          </Tag>
    )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><EditOutlined style={{color: 'green', fontSize: '20px', cursor: 'pointer'}}  onClick={() => {showEditUserModal(); console.log(record);}}/></a>
          <a><DeleteOutlined style={{color: 'red', fontSize: '20px'}} onClick={() => {showDeleteUserModal(); console.log(record.user_id);}} /></a>
        </Space>
      ),
    },
  ];

  const [addUserModal, setaddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setAllUsers(response?.data);
        console.log(response?.data);
      })
      .catch((err) => console.log(err));
  },[]);  

  // Upon creation of new users
  const [userCreate, setUserCreate] = useState({
    username: '',
    email: '',
    password: '',
    dataCreated: new Date(),
    status: "Active",
    role: {
      role_id: '',
    }
  });

  const handleOnChangeUser = (e) => {
    const { name, value } = e.target;
    if(name != null && name === 'role_id')
    {
      const intValue = parseInt(value);
      console.log("intvaue " + intValue);
      setUserCreate((prevState) => ({ ...prevState, [name]: intValue }));
    }
    else
      setUserCreate((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault(); //prevents refresh after sending a form
    console.log("Submit create users: " + JSON.stringify(userCreate));
    axios
      .post("http://localhost:8080/user/create", userCreate)
      .then((response) => {
        console.log(response.data);
        // authentication successful, do something here
        if (response.status === 200) {
          console.log("Success create user");
          hideaddUserModal();
        } else {
          console.log("Fail create user");
        }
      })
      .catch((error) => {
        // authentication failed, do something here
        console.log(error);
      });
  }
 // eend

  const handleRowClick = (record) => {
    setSelectedUserId({key: record.user_id, username: record.username, password: record.password, email: record.email, role : record.role.role_name, status: record.status});
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

  const showDeleteUserModal = () => {
    setDeleteUserModal(true);
  };
  const hideDeleteUserModal = () => {
    setDeleteUserModal(false);
  };


  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <h3 className={styles.title} style={{textAlign: "left", float: "left"}}> <UserOutlined />List of Users</h3>
      <Button className="btn_add" style={{boxShadow: "none", float: "right"}} onClick={showaddUserModal} icon={<PlusOutlined/>}>Add Users</Button>
      <Table columns={columns} dataSource={allUsers? allUsers.data : ''} onRow={(record) => ({ onClick: () => {handleRowClick(record);}})} />
  
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
          <form className="form1" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" onChange={handleOnChangeUser} className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <label>Password</label>
            <input type="password" name="password" onChange={handleOnChangeUser} className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <label>Email Address</label>
            <input type="email" name="email" onChange={handleOnChangeUser} className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <label>User Role</label>
            <Form.Select name="role.role_id" onChange={handleOnChangeUser} className="bg-gray-100 outline-none text-sm flex-1 mb-2">
              <option disabled value="" selected>Select a role</option>
              <option value='1'>Client</option>
              <option value='2'>Sales Team</option>
              <option value='3'>Billing In-Charge</option>
              <option value='4'>Collection In-Charge</option>
              <option value='5'>Treasury</option>
              <option value='6'>Super Admin</option>
            </Form.Select>  
            <button type="submit" style={{boxShadow: "none"}} className="w-full bg-red-700 hover:bg-cyan hover:text-white" onClick={handleSubmit}>
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
            <input type="password" defaultValue={selectedUserId ? selectedUserId.password : ''} className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <label>Email</label>
            <input type="email" defaultValue={selectedUserId ? selectedUserId.email : ''} className="bg-gray-100 outline-none text-sm flex-1 mb-2" required/>
            <label>Role</label>
            <Form.Select defaultValue={selectedUserId ? selectedUserId.role : ''}  className="bg-gray-100 outline-none text-sm flex-1 mb-2  selectRole">
              <option value="Client" selected={selectedUserId && selectedUserId.role === 'Client'}>Client</option>
              <option value="Super Admin" selected={selectedUserId && selectedUserId.role === 'Super Admin'}>Super Admin</option>
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
    {/* Modal for Delete */}
    <Modal show={deleteUserModal} onHide={hideDeleteUserModal} >
        <Modal.Header style={{padding: '10px', backgroundColor:'#963634', color:'white'}}>
          <Modal.Title style={{fontWeight: 'bold'}}><UserDeleteOutlined /> Delete User</Modal.Title>
          <svg
                style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', border:'1px solid gray' }}
                xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"
                onClick={hideDeleteUserModal}
            >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        </Modal.Header>
        <Modal.Body style={{ margin:'10px'}}>
          <h4 style={{fontWeight: 'bold'}}>Are you sure you want to delete this user?</h4>
          <p style={{fontStyle:'italic', fontSize: '14px'}}> *Deleting this user will remove the user information from your database.*</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" style={{width: '40%', height: '40px', boxShadow: "none", backgroundColor: '#963634', color: 'white' }}>Delete</Button>
          <Button variant="secondary" style={{width: '30%', height: '40px', boxShadow: "none", backgroundColor: 'white', color: 'black'}} >Cancel</Button>
        </Modal.Footer>

    </Modal>
   </>
  );
}

export default settings;
