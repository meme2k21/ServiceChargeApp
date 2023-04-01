import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateTicket from "../ticket/create";
import { ClassNameConfigurator } from "@mui/base";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { tickets: data },
  };
};
// for ticketManagement

function Tickets() {
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

  const [ticketHealth, setTicketHealth] = useState('Ticket Health');
  const [ticketStatus, setTicketStatus] = useState('Ticket Status');
  const [ticketYearCreated, setTicketYearCreated] = useState('Year Created');

  //For Modal shared variables
  const [clickedId, setClickedId] = useState('');

  //Modal Delete component
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdateModal = (id) => {
    setShowUpdateModal(true);
    console.log(showUpdateModal);
    setClickedId(id);
  }

  const onUpdate = () => {
    handleUpdateTicket()
    onCancelUpdate();
  }

  const onCancelUpdate = () => {
    setShowUpdateModal(false);
  }

  //Modal Delete component
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  const handleshowDeleteModal = (id) => {
      setshowDeleteModal(true);
      console.log(showDeleteModal);
      setClickedId(id);
  };

  const onDelete = () => {
      // Perform delete action
      axios
      .delete("http://localhost:8080/ticket/delete/" + clickedId)
      .then((response) => {
        console.log("Ticket deleted:", response?.data);
        // Update tickets state by filtering out the deleted ticket
        setTickets((prevTickets) =>
          prevTickets?.filter((ticket) => ticket?.ticket_id !== clickedId)
        );
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
      onCancelDelete();      
  };

  const onCancelDelete = () => {
      setshowDeleteModal(false);
  };

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
    setShowCreateModal(false);
  }

  return (
    <>
      <Head>
        <title>Tickets</title>
        <meta name="keywords" content="tickets" />
      </Head>

      {/* For Ticket Search Filtering */}
      <div  style={{ backgroundColor: '#D9D9D9', paddingLeft:'10px', fontWeight:'bold', width: '100vw-10px', height: '30px', display: 'flex', alignItems: 'center' }}> Search Filter</div>
      <div  style={{ backgroundColor: 'white', border:'5px solid white', borderColor:'#D9D9D9', paddingLeft:'10px', fontWeight:'bold', width: '100vw-10px', height: '60px', display: 'flex', alignItems: 'center', justifyContent:'space-between' }}> 
        <div style={{display:'flex', alignItems:'center'}}>
          <select value={ticketHealth} style={{opacity: ticketHealth ==="Ticket Health"? 0.5 : 1, border:'1px solid black', marginRight:'20px', height:'40px', width:'227px', fontStyle:'italic'}} >
            <option disabled>{ticketHealth}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select value={ticketStatus} style={{opacity: ticketStatus ==="Ticket Status"? 0.5 : 1, border:'1px solid black', marginRight:'20px', height:'40px', width:'227px', fontStyle:'italic'}} >
            <option disabled>{ticketStatus}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select value={ticketYearCreated} style={{opacity: ticketYearCreated ==="Year Created"? 0.5 : 1, border:'1px solid black', marginRight:'20px', height:'40px', width:'227px', fontStyle:'italic'}} >
            <option disabled>{ticketYearCreated}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div style={{display:'flex', alignItems:'center'}}>
          <button style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px', marginRight:'10px', height:'40px', width:'227px', fontStyle:'italic'}} >Search</button>
          <button style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px', marginRight:'10px', height:'40px', width:'227px', fontStyle:'italic'}} >Clear</button>
        </div>
      </div>

      {/* For ticket searching */}
      <div style={{marginTop:'50px', marginBottom: '-40px', display:'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <input type='search' placeholder='Search' style={{border: '1px solid black', color:'black', height:'40px', width:'350px', bottom: 0}}></input>
        {/* <button type='search' style={{backgroundColor:'#D9D9D9', fontSize:'16px', marginRight:'15px', color:'black', height:'40px', width:'227px', float:'right'}}>Add Email Reminder</button>
        <select type='search' style={{backgroundColor:'#D9D9D9', fontSize:'16px', marginRight:'10px', color:'black', height:'40px', width:'227px', float:'right'}}>
          <option>Ticket Number</option>
          <option>Ticket Subject</option>
          <option>Ticket Status</option>
        </select> */}
          <a onClick={handleCreate} style={{ background: "#963634", padding: "20px", borderRadius: "5px", display:'flex', right: 0, alignItems:'center', color:'white' }}
          onMouseEnter={(e) => { e.target.style.background = "#F27B53"; }}
          onMouseLeave={(e) => { e.target.style.background = "#963634"; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16" >
              <path fillRule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> 
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> 
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
            </svg>
            <div style={{ fontSize: "20px", fontWeight: "bold", marginRight: "10px"}}>New Ticket</div>
          </a>
          {showCreateModal && <CreateTicket show={showCreateModal} onYes={onCreate} onCancel={onCancelCreate}/>}
      </div>
      <br /><br />

      {/* table display */}
      <table style={{borderBottom:'2px solid black', marginBottom:'10px', paddingLeft:'1000px', textAlign:'left'}}>
        <thead>
          <tr style={{backgroundColor:'#28B79B', color:'white', fontSize:'16px', fontWeight: "bold" }}>
            <td className="table-cell flex-row" >Ticket Number</td>
            <td className="table-cell">Ticket Subject</td>
            <td className="table-cell">Ticket Description</td>
            <td className="table-cell">Date Created</td>
            <td className="table-cell">Status</td>
            <td className="table-cell">Action</td>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => {
            return (
              <tr key={ticket.ticket_id} className='table-row' style={{borderBottom: '1px solid rgba(0, 0, 0, 0.3)'}}>
                <td className="table-cell flex-row" >
                  {ticket.ticket_id}
                </td>
                <td className="table-cell">
                  {ticket.ticket_title}
                </td>
                <td className="table-cell">
                  {ticket.ticket_description}
                </td>
                <td className="table-cell">
                  {ticket.date_created}
                </td>
                <td className="table-cell" onClick={() => handleUpdateModal(ticket.ticket_id)}>
                  <a href="" onClick={(e)=> e.preventDefault()} title='update'>
                    {ticket.ticket_status}
                  </a>
                </td>
                {showUpdateModal && clickedId===ticket.ticket_id && <ModalEdit title='Update Ticket' label={`Are you sure to update '${ticket.ticket_title}'?`} onYes={onUpdate} onCancel={onCancelUpdate} show={showUpdateModal} row={ticket}/>}
                <td onClick={() => handleshowDeleteModal(ticket.ticket_id)}>
                  <a href="" onClick={(e)=> e.preventDefault()} title="delete">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='30' height='30' > 
                    <g>
                      <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="red"></path> 
                    </g> 
                  </svg>
                  </a>
                </td>
                {showDeleteModal && clickedId===ticket.ticket_id && <ModalComponent title='Delete Ticket' label={`Are you sure to delete '${ticket.ticket_title}'?`} onYes={onDelete} onCancel={onCancelDelete} show={showDeleteModal}/>}
                </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', marginBottom:'-50px' }}>
        <label style={{marginLeft:'20px'}}>Showing 8 out of 20 entries</label>
        <div style={{float:'right'}}>
            <button style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px', marginRight:'10px', height:'40px', width:'227px', fontStyle:'italic'}} >Previous</button>
            <button style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px', marginRight:'10px', height:'40px', width:'227px', fontStyle:'italic'}} >Next</button>
          </div>
        </div>
    </>
  );
}
export default Tickets;

export const ModalComponent = ({ title, label, onYes, onCancel, show }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor:'white', 
    height:'25%'
  };

  return (
          <Modal
            open={show}
            onClose={onCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal d-block"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <div className="modal-dialog modal-dialog-centered" style={style}>
              <div className="modal-header" style={{padding: '10px', border: '1px solid gray', backgroundColor: '#963634', color: 'white'}} >
                <h5 className="modal-title">{title}</h5>
                <svg
                    style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', border:'1px solid gray' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"
                    onClick={onCancel}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" ></path>
                </svg>
              </div>
              <div className="modal-body" style={{padding: '3%'}}>
                <h6 style={{ color: 'black' }}>{label}</h6>
              </div>
              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', position:'absolute', bottom: '10px', right: '10%', alignItems:'center', textAlign:'center'}}>
                <button type="button" className="btn btn-primary" onClick={onYes} style={{ flex: '1 0 auto', backgroundColor:'#963634', marginRight:'10%' }}>Yes</button>
                <button type="button" className="btn btn-primary" onClick={onCancel} style={{ flex: '1 0 auto', backgroundColor: '#929292' }}>Cancel</button>
              </div>
            </div>
          </Modal>
  );
};

const handleUpdateTicket = ({ticketId}) => {
  axios.put("http://localhost:8080/ticket/update/"+ticketId).then(()=>{
    console.log("ticket updated successfully").catch((error)=>{
      console.log("Error" + error)
    })
  })
}




export const ModalEdit = ({ title, label, onYes, onCancel, show, row }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor:'white', 
    height:'50%'
  };

  return (
          <Modal
            open={show}
            onClose={onCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal d-block"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <div className="modal-dialog modal-dialog-centered" style={style}>
              <div className="modal-header" style={{padding: '10px', border: '1px solid gray', backgroundColor: '#963634', color: 'white'}} >
                <h5 className="modal-title">{title}</h5>
                <svg
                    style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', border:'1px solid gray' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"
                    onClick={onCancel}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" ></path>
                </svg>
              </div>
              <div className="modal-body" style={{padding: '3%'}}>
                <h6 style={{ color: 'black' }}>{label}</h6>
                <div>Id: {row.ticket_id}</div>
                  <div>Date: {row.date_created}</div>
                </div>
                <div>Title: {row.ticket_title}</div>
                <div>Description: {row.ticket_description}</div>
                <div>Status: <input type="input"/></div>
                <div>Owner Id: {row.ticket_owner}</div>
              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', position:'absolute', bottom: '10px', right: '10%', alignItems:'center', textAlign:'center'}}>
                <button type="button" className="btn btn-primary" onClick={()=>{handleUpdateTicket()}} style={{ flex: '1 0 auto', backgroundColor:'#963634', marginRight:'10%' }}>Yes</button>
                <button type="button" className="btn btn-primary" onClick={onCancel} style={{ flex: '1 0 auto', backgroundColor: '#929292' }}>Cancel</button>
              </div>
            </div>
          </Modal>
  );
};