import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";

// axios.create({
//   baseURL: "http://localhost:3500",
// });
export default function CreateTicket() {
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
          router.push("/dashboard");
          console.log("Success create ticket");
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
    <div>
      <h1>Create Ticket</h1>
      <h1>{JSON.stringify(ticket)}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ticket_title"
          value={ticket.ticket_title}
          onChange={handleOnChangeTicket}
          placeholder="Ticket Title"
          className="bg-gray-100 outline-none text-sm flex-1 border-hidden"
        />
        <input
          type="text"
          name="ticket_description"
          value={ticket.ticket_description}
          onChange={handleOnChangeTicket}
          placeholder="Description"
          className="bg-gray-100 outline-none text-sm flex-1 border-hidden autofill:bg-black"
        />

        <button
          type="submit"
          className="w-full bg-red-700 hover:bg-white hover:text-red-700"
          onClick={handleSubmit}
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
}
