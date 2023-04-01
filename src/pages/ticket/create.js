import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import Modal from '@mui/material/Modal';

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
          router.push("/");
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
          <Modal
            open={show}
            onClose={onCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal d-block"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <div className="modal-dialog modal-dialog-centered" style={style}>
              <div className="modal-header" style={{padding: '10px'}} >
                <h5 className="modal-title">New Ticket</h5>
                <svg
                    style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', border:'1px solid gray' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"
                    onClick={onCancel}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="blue"></path>
                </svg>
              </div>
              <div className="modal-body" style={{paddingLeft: '3%'}}>
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
              </div>
            </div>
          </Modal>
  );
}