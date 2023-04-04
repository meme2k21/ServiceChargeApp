import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaLock,
  FaLockOpen,
  FaRegEnvelope,
  FaUnlockAlt,
  FaUserLock,
} from "react-icons/fa";
import styles from "../styles/Home.module.css";
import CreateTicket from "./ticket/create";
import Modal from '@mui/material/Modal';

function dashboard() {
  const router = useRouter();

  const [selectedRows, setSelectedRows] = useState([]);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/tickets")
      .then((response) => {
        setTickets(response?.data);
      })
      .catch((err) => console.log(err));
  }, [selectedRows]);
  const handleButtonClick = (row) => {
    console.log("clicked Ticket #" + row.ticket_id);
  };
  const handleChange = useCallback((state) => {
    setSelectedRows(state?.selectedRows);
  }, []);
  
  const columns = useMemo(
    () => [
      {
        name: "Ticket Number",
        selector: (row) => row.ticket_id,
        sortable: true,
        grow: 2,
      },
      {
        name: "Ticket Subject",
        selector: (row) => row.ticket_title,
        sortable: true,
      },
      {
        name: "Ticket Description",
        selector: (row) => row.ticket_description,
        sortable: true,
        right: true,
      },
      {
        name: "Date Created",
        selector: (row) => row.date_created,
        sortable: true,
        right: true,
      },
      {
        name: "Status",
        selector: (row) => row.ticket_status,
        sortable: true,
        right: true,
      },
      // {
      //   cell: (row) => (
      //     <button className="bg-red-700" onClick={() => handleButtonClick(row)}>
      //       Edit
      //     </button>
      //   ),
      //   ignoreRowClick: true,
      //   allowOverflow: true,
      //   button: true,
      // },
      // {
      //   name: "Delete",
      //   cell: (row) => (
      //     <button className="bg-red-700" onClick={() => handleDeleteRow(row)}>
      //       Delete
      //     </button>
      //   ),
      //   ignoreRowClick: true,
      //   allowOverflow: true,
      //   button: true,
      // },
    ],
    []
  );
  const sortedData = tickets?.sort(
    (a, b) => new Date(b.date_created) - new Date(a.date_created)
  );

  //Modal Create component
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreate =() => {
    setShowCreateModal(true);
    console.log(showCreateModal);
  }
  const onCreate = () => {
    onCancelCreate();
  } 
  const onCancelCreate = () => {
    handleChange;
    setShowCreateModal(false);
  }

  //For Viewing a single ticket
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRow = (row) => {
    setShowViewTicketModal(true);;
    setSelectedRow(row);
    console.log(selectedRow);
  }

  const onShow = () => {
    onCancelShow();
  }
  
  const onCancelShow = () => {
    setShowViewTicketModal(false);
  }

  return (
    <div style={{ background: "white" }}>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>

      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gridGap: "20px", color: "white" }}>
          <div style={{ background: "#F27B53", padding: "20px", borderRadius: "5px", display:'flex', alignItems:'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} fill="none">
              <path fill="white" fillRule="evenodd" d="M3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.929-1.542-2.391 1.594a1 1 0 0 1-1.18-.051L12 20.28l-1.875 1.5a1 1 0 0 1-1.18.051l-2.391-1.594-1.93 1.543A1 1 0 0 1 3 21V5zm5 1a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z" clipRule="evenodd"></path>
              </svg>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px"}}> {sortedData.length} </div>
            <div style={{ fontSize: "16px" }}>{(sortedData.length>1) ? 'tickets':'ticket'}</div>
            <a onClick={handleCreate}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> 
                <path fillRule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
              </svg>
            </a>
            {showCreateModal && <CreateTicket show={showCreateModal} onYes={onCreate} onCancel={onCancelCreate}/>}
          </div>
          <div style={{ background: "#DF577B", padding: "20px", borderRadius: "5px", display:'flex', alignItems:'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} fill="none">
              <path fill="white" fillRule="evenodd" d="M3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.929-1.542-2.391 1.594a1 1 0 0 1-1.18-.051L12 20.28l-1.875 1.5a1 1 0 0 1-1.18.051l-2.391-1.594-1.93 1.543A1 1 0 0 1 3 21V5zm5 1a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z" clipRule="evenodd"></path>
            </svg>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px"}}> {sortedData.length} </div>
            <div style={{ fontSize: "16px" }}>{(sortedData.length>1) ? 'tickets':'ticket'}</div>
            <a onClick={() => {
              router.push("/ticket/create");
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> 
                <path fillRule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
              </svg>
            </a>
          </div>
          <div style={{ background: "#847CC5", padding: "20px", borderRadius: "5px", display:'flex', alignItems:'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} fill="none">
              <path fill="white" fillRule="evenodd" d="M3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.929-1.542-2.391 1.594a1 1 0 0 1-1.18-.051L12 20.28l-1.875 1.5a1 1 0 0 1-1.18.051l-2.391-1.594-1.93 1.543A1 1 0 0 1 3 21V5zm5 1a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z" clipRule="evenodd"></path>
              </svg>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px"}}> {sortedData.length} </div>
            <div style={{ fontSize: "16px" }}>{(sortedData.length>1) ? 'tickets':'ticket'}</div>
            <a onClick={() => {
            router.push("/ticket/create");
          }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> 
                <path fillRule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
              </svg>
            </a>
          </div>
          <div style={{ background: "#28B79B", padding: "20px", borderRadius: "5px", display:'flex', alignItems:'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} fill="none">
              <path fill="white" fillRule="evenodd" d="M3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.929-1.542-2.391 1.594a1 1 0 0 1-1.18-.051L12 20.28l-1.875 1.5a1 1 0 0 1-1.18.051l-2.391-1.594-1.93 1.543A1 1 0 0 1 3 21V5zm5 1a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z" clipRule="evenodd"></path>
            </svg>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px"}}> {sortedData.length} </div>
            <div style={{ fontSize: "16px" }}>{(sortedData.length>1) ? 'tickets':'ticket'}</div>
            <a onClick={() => {
              router.push("/ticket/create");
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> 
                <path fillRule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
              </svg>
            </a>
          </div>
        </div>

        <DataTable
          title="Aging Tickets"
          data={sortedData}
          columns={columns}
          selectableRows
          pagination
          onSelectedRowsChange={handleChange}
          onRowClicked={handleRow}
        />
        {showViewTicketModal && <ShowTicketModal show={showViewTicketModal} onCancel={onCancelShow} row={selectedRow} />}
      </div>
    </div>
  );
}

export default dashboard;


export function ShowTicketModal({show, onCancel, row}) {
  const style = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    width: '80%', 
    maxWidth:'600px', 
    bgcolor: 'background.paper', 
    border: '2px solid #000', 
    boxShadow: 24, 
    backgroundColor:'white',
    minWidth:'418px'
  };

    const date = new Date(row.date_created);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const mm = months[date.getMonth()]; // Returns month name from the array
    const dd = date.getDate();
    const yyyy = date.getFullYear();
    const formattedTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const displayDate = `${mm} ${dd} ${yyyy} (${formattedTime})`;
  return (
          <Modal
            open={show}
            onClose={onCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal d-block"
          >
            <div className="modal-dialog modal-dialog-centered" style={style}>
              <div className="modal-header" style={{padding: '10px', backgroundColor:'#963634', color:'white'}} >
                <h5 className="modal-title" style={{fontWeight: 'bold'}}>Ticket View</h5>
                <svg
                    style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', border:'1px solid gray' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"
                    onClick={onCancel}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                </svg>
              </div>
              <div className="modal-body text-center" style={{ margin:'10px'}}>
                <p style={{fontWeight:'bold'}}>ALLIANCE SOFTWARE INC.<br/></p>
                <p style={{fontSize:'12px'}}>
                  14th Floor, Buildcomm Center, Sumilon Road, Cebu Business Park<br/>
                  Cebu City, Cebu, Philippines 6000<br/>
                  <b>Contact No.:</b>&nbsp;+63-32-261-1705
                </p>
                <br/>
                <p><b>OFFICIAL TICKET</b></p>
                <br/>
                <table className="CancelAllStyling">
                <tr className="CancelAllStyling">
                  <td className="CancelAllStyling" style={{width:'20%', fontSize:'14px'}}>Reference No. </td>
                  <td className="CancelAllStyling" style={{borderBottom:'1px solid black', paddingLeft:'10px', width:'30%', color: 'red'}}>{row.ticket_id}</td>
                  <td className="CancelAllStyling" style={{width:'13%', paddingLeft:'4%', fontSize:'14px'}}>Date: </td>
                  <td className="CancelAllStyling" style={{borderBottom:'1px solid black', textAlign:'center', width:'30%', minWidth:'187px'}}>{displayDate}</td>
                </tr>
                <br/>
                <tr>
                  <td className="CancelAllStyling" style={{width:'10%', fontSize:'14px'}}>Owner: </td>
                  <td colSpan={3} className="CancelAllStyling" style={{borderBottom:'1px solid black', width:'30%', paddingLeft:'10px'}}>{row.ticket_owner}</td>
                </tr>
                <tr>
                  <td className="CancelAllStyling" style={{width:'10%', fontSize:'14px'}}>Title: </td>
                  <td colSpan={3} className="CancelAllStyling" style={{borderBottom:'1px solid black', width:'30%', paddingLeft:'10px'}}>{row.ticket_title}</td>
                </tr>
                <tr>
                  <td className="CancelAllStyling" style={{width:'10%', fontSize:'14px'}}>Description: </td>
                  <td colSpan={3} className="CancelAllStyling" style={{borderBottom:'1px solid black', width:'30%', paddingLeft:'10px', wordBreak:'break-all', wordWrap:'break-word' }}>{row.ticket_description}</td>
                </tr>
                <br/><br/>
                <tr>
                  <td colSpan={4} className="CancelAllStyling" style={{borderBottom:'2px solid black', width:'100%' }}></td>
                </tr>
                <br/><br/><br/>
                <tr>
                  <td colSpan={2}></td>
                  <td colSpan={2} className="CancelAllStyling" style={{width:'20%', borderTop: '1px solid black', textAlign:'center', fontSize:'14px'}}>Owner's Signature</td>
                </tr>
                </table>
                </div>
            </div>
          </Modal>
  );
}

{/* <div style={{display:'flex', justifyContent:'space-between' }}>
                  <div>No. <label style={{textDecoration: 'underline' }}>&nbsp;&nbsp;{row.ticket_id}&nbsp;&nbsp;</label></div>
                  <div>Date: <label style={{textDecoration: 'underline' }}>&nbsp;&nbsp;{displayDate}&nbsp;&nbsp;</label></div>
                </div>
                <div>Owner: <label style={{textDecoration: 'underline' }}>&nbsp;&nbsp;{row.ticket_owner}&nbsp;&nbsp;</label></div>
                <div style={{padding:'20px'}}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }}>Title:&nbsp;&nbsp;</div>
                    <div><label style={{ textAlign: 'right' }}>{row.ticket_title}</label></div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }}>Description:&nbsp;&nbsp;</div>
                    <div><label style={{ textAlign: 'right', wordBreak:'break-all', wordWrap:'break-word' }}>{row.ticket_description}</label></div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }}>Status:&nbsp;&nbsp;</div>
                    <div><label style={{ textAlign: 'right' }}>{row.ticket_status}</label></div>
                  </div>
                </div> */}