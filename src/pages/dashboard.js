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
// axios.create({
//   baseURL: "http://localhost:3500",
// });
function dashboard() {
  const router = useRouter();
  // const [ticketHealth, setTicketHealth] = useState("Ticket Health");
  // const [ticketStatus, setTicketStatus] = useState("Ticket Status");
  // const [ticketYearCreated, setTicketYearCreated] = useState("Year Created");

  const [selectedRows, setSelectedRows] = useState([]);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/tickets").then((response) => {
      setTickets(response?.data);
    });
    console.log("useffect fomr dashboard");
  }, [selectedRows]);

  const handleButtonClick = (row) => {
    console.log("clicked Ticket #" + row.ticket_id);
  };

  const handleChange = useCallback((state) => {
    setSelectedRows(state?.selectedRows);
  }, []);

  const handleDeleteRow = (row) => {
    axios
      .delete("http://localhost:8080/ticket/delete/" + row.ticket_id)
      .then((response) => {
        console.log("Ticket deleted:", response?.data);
        // Update tickets state by filtering out the deleted ticket
        setTickets((prevTickets) =>
          prevTickets?.filter((ticket) => ticket?.ticket_id !== row?.ticket_id)
        );
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
  };

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
      {
        cell: (row) => (
          <button className="bg-red-700" onClick={() => handleButtonClick(row)}>
            Edit
          </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: "Delete",
        cell: (row) => (
          <button className="bg-red-700" onClick={() => handleDeleteRow(row)}>
            Delete
          </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    []
  );

  const sortedData = tickets?.sort(
    (a, b) => new Date(b.date_created) - new Date(a.date_created)
  );

  return (
    <div style={{ background: "white" }}>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>

      <div>
        <button
          onClick={() => {
            router.push("/ticket/create");
          }}
          className="bg-red-700"
        >
          New Ticket
        </button>
        <DataTable
          title="Aging Tickets"
          data={sortedData}
          columns={columns}
          selectableRows
          pagination
          onSelectedRowsChange={handleChange}
        />
      </div>
      {/* <div
        style={{
          backgroundColor: "#D9D9D9",
          paddingLeft: "10px",
          fontWeight: "bold",
          width: "100vw-10px",
          height: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        Search Filter
      </div>
      <div
        style={{
          backgroundColor: "white",
          border: "5px solid white",
          borderColor: "#D9D9D9",
          paddingLeft: "10px",
          fontWeight: "bold",
          width: "100vw-10px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            value={ticketHealth}
            style={{
              opacity: ticketHealth === "Ticket Health" ? 0.5 : 1,
              border: "1px solid black",
              marginRight: "20px",
              height: "40px",
              width: "227px",
              fontStyle: "italic",
            }}
          >
            <option disabled>{ticketHealth}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select
            value={ticketStatus}
            style={{
              border: "1px solid black",
              marginRight: "20px",
              height: "40px",
              width: "227px",
              fontStyle: "italic",
            }}
          >
            <option disabled>{ticketStatus}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select
            value={ticketYearCreated}
            style={{
              border: "1px solid black",
              marginRight: "20px",
              height: "40px",
              width: "227px",
              fontStyle: "italic",
            }}
          >
            <option disabled>{ticketYearCreated}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{
              backgroundColor: "#D9D9D9",
              color: "black",
              fontSize: "16px",
              marginRight: "10px",
              height: "40px",
              width: "227px",
              fontStyle: "italic",
            }}
          >
            Search
          </button>
          <button
            style={{
              backgroundColor: "#D9D9D9",
              color: "black",
              fontSize: "16px",
              marginRight: "10px",
              height: "40px",
              width: "227px",
              fontStyle: "italic",
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="search"
          placeholder="Search"
          style={{
            border: "1px solid black",
            scolor: "black",
            height: "40px",
            width: "350px",
            float: "right",
          }}
        ></input>
      </div>
      <br />
      <br />
      <table style={{ borderBottom: "2px solid black", marginBottom: "10px" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "#D9D9D9",
              color: "black",
              fontSize: "16px",
            }}
          >
            <td>Ticket Number</td>
            <td>Ticket Subject</td>
            <td>Ticket Description</td>
            <td>Date Created</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
          <tr>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
            <td>sample</td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "-50px",
        }}
      >
        <label style={{ marginLeft: "20px" }}>
          Showing 8 out of 20 entries
        </label>
        <div style={{ float: "right" }}>
          <button
            style={{
              backgroundColor: "#D9D9D9",
              color: "black",
              fontSize: "16px",
              marginRight: "10px",
              height: "40px",
              width: "227px",
              fontStyle: "italic",
            }}
          >
            Previous
          </button>
          <button
            style={{
              backgroundColor: "#D9D9D9",
              color: "black",
              fontSize: "16px",
              marginRight: "10px",
              height: "40px",
              width: "227px",
              fontStyle: "italic",
            }}
          >
            Next
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default dashboard;
