import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';

axios.create({
  baseURL: "http://localhost:3500",
});


export default function CreateTicket({show, onYes, onCancel}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth:'500px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor:'white'
  };

  const router = useRouter();
  const [ticket, setTicket] = useState({
    ticket_title: "",
    ticket_description: "",
    date_created: new Date(),
    ticket_status: "case-filed",
    ticket_owner: 1,
  });

  const handleOnChangeTicket = (e) => {
    const { name, value } = e.target;
    setTicket((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault(); //prevents refresh after sending a form
    console.log("Submit create ticket: " + JSON.stringify(ticket));
    axios
      .post("http://localhost:8080/ticket/create", ticket)
      .then((response) => {
        console.log(response.data);
        // authentication successful, do something here
        if (response.status === 200) {
          console.log("Success create ticket");
          onCancel();
        } else {
          console.log("Fail create ticket");
        }
      })
      .catch((error) => {
        // authentication failed, do something here
        console.log(error);
      });
  }

  return (
    <Modal show={show} onHide={onCancel}>
      <div>
        <Modal.Header style={{padding: '10px', backgroundColor:'#963634', color:'white'}}>
          <Modal.Title style={{fontWeight: 'bold'}}>Add New Ticket</Modal.Title>
          <svg
                style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', border:'1px solid gray' }}
                xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"
                onClick={onCancel}
            >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        </Modal.Header>
        <Modal.Body className="text-center" style={{ margin:'10px'}}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="ticket_title"
              value={ticket.ticket_title}
              onChange={handleOnChangeTicket}
              placeholder="Ticket Title"
              className="bg-gray-100 outline-none text-sm flex-1 mb-2"
            />
            <input
              type="text"
              name="ticket_description"
              value={ticket.ticket_description}
              onChange={handleOnChangeTicket}
              placeholder="Description"
              className="bg-gray-100 outline-none text-sm flex-1  autofill:bg-black mb-2"
            />

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-cyan hover:text-black"
              onClick={handleSubmit}
            >
              Create Ticket
            </button>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export function ClientCreateTicket({show, onYes, onCancel}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth:'500px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor:'white'
  };

  const router = useRouter();
  const [ticket, setTicket] = useState({
    ticket_title: "",
    ticket_description: "",
    date_created: new Date(),
    ticket_status: "pending",
    ticket_owner: localStorage.getItem('id'),
  });

  const handleOnChangeTicket = (e) => {
    const { name, value } = e.target;
    setTicket((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault(); //prevents refresh after sending a form
    console.log("Submit create ticket: " + JSON.stringify(ticket));
    axios
      .post("http://localhost:8080/ticket/create", ticket)
      .then((response) => {
        console.log(response.data);
        // authentication successful, do something here
        if (response.status === 200) {
          console.log("Success create ticket");
          onCancel();
        } else {
          console.log("Fail create ticket");
        }
      })
      .catch((error) => {
        // authentication failed, do something here
        console.log(error);
      });
  }

  return (
    <Modal show={show} onHide={onCancel}>
      <div>
        <Modal.Header style={{padding: '10px', backgroundColor:'#963634', color:'white'}}>
          <Modal.Title style={{fontWeight: 'bold'}}>Add New Ticket</Modal.Title>
          <svg
                style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', border:'1px solid gray' }}
                xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"
                onClick={onCancel}
            >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        </Modal.Header>
        <Modal.Body className="text-center" style={{ margin:'10px'}}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="ticket_title"
              value={ticket.ticket_title}
              onChange={handleOnChangeTicket}
              placeholder="Ticket Title"
              className="bg-gray-100 outline-none text-sm flex-1 mb-2"
            />
            <input
              type="text"
              name="ticket_description"
              value={ticket.ticket_description}
              onChange={handleOnChangeTicket}
              placeholder="Description"
              className="bg-gray-100 outline-none text-sm flex-1  autofill:bg-black mb-2"
            />

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-cyan hover:text-black"
              onClick={handleSubmit}
            >
              Create Ticket
            </button>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
}