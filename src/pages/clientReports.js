import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "jspdf-autotable";

function reports() {
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  const [ticketYearCreated, setTicketYearCreated] = useState("Year Created");

  // get list of tickets & data from localStorage
  const [tickets, setTickets] = useState([]);

  // get data from local storage
  useEffect(() => {
    setId(localStorage.getItem("id"));
    setUsername(localStorage.getItem("username"));
    setRole(localStorage.getItem("role"));
    setEmail(localStorage.getItem("email"));
  }, []);
  useEffect(() => {
    getData();
  }, [id]);
  async function getData() {
    try {
      const user_id = await id;
      axios
        .get(`http://localhost:8080/tickets/owner/${user_id}`)
        .then(async (response) => {
          const data = response?.data.data;
          setTickets(data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  const columns = useMemo(
    () => [
      {
        id: 1,
        name: "Ticket Number",
        selector: (row) => row.ticket_id,
        sortable: true,
        reorder: true,
        grow: 2,
      },
      {
        id: 2,
        name: "Ticket Subject",
        selector: (row) => row.ticket_title,
        sortable: true,
        reorder: true,
      },
      {
        id: 3,
        name: "Ticket Description",
        selector: (row) => row.ticket_description,
        sortable: true,
        reorder: true,
        right: true,
      },
      {
        id: 4,
        name: "Date Created",
        selector: (row) => new Date(row.date_created).toLocaleString(),
        sortable: true,
        reorder: true,
        right: true,
      },
      {
        id: 5,
        name: "Status",
        selector: (row) => row.ticket_status,
        sortable: true,
        reorder: true,
        right: true,
      },
    ],
    []
  );
  const exportCSV = () => {
    const headers = [
      "ID",
      "TITLE",
      "DESCRIPTION",
      "DATE FILED",
      "STATUS",
      "OWNER",
    ];

    const data = tickets.map((ticket) => [
      ticket.ticket_id,
      ticket.ticket_title,
      ticket.ticket_description,
      ticket.date_created,
      ticket.ticket_status,
      ticket.ticket_owner,
    ]);

    const csv = [headers, ...data].map((row) => row.join(",")).join("\n");
    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", "tickets_report.csv");
    link.click();
  };

  const handleSelectChange = (event) => {
    setTicketYearCreated(event.target.value);
  };

  return (
    <div style={{ background: "white" }}>
      <Head>
        <title>Reports</title>
        <meta name="keywords" content="reports" />
      </Head>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <select
          value={ticketYearCreated}
          onChange={handleSelectChange}
          style={{
            display: "flex",
            opacity: ticketYearCreated === "Year Created" ? 0.5 : 1,
            border: "1px solid black",
            marginRight: "20px",
            height: "40px",
            width: "227px",
            fontStyle: "italic",
          }}
        >
          <option disabled>Year Created</option>
          <option>All</option>
          <option>2023</option>
          <option>2022</option>
        </select>
        {/* TO PRINT REPORTS */}
        <a
          href=""
          onClick={(e) => {
            e.preventDefault(), exportCSV();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width={50}
            height={50}
            right="10px"
          >
            <rect width="256" height="256" fill="none" />
            <rect x="24" y="128" width="208" height="80" rx="8" opacity="0.2" />
            <path
              d="M176,128h48a8,8,0,0,1,8,8v64a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V136a8,8,0,0,1,8-8H80"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="128"
              y1="24"
              x2="128"
              y2="128"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <polyline
              points="80 80 128 128 176 80"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <circle cx="188" cy="168" r="12" />
          </svg>
        </a>
      </div>
      {/* <button onClick={exportPDF}>Print Report</button> */}

      <br />
      <div>
        <DataTable
          title="Tickets"
          data={tickets}
          columns={columns}
          defaultSortFieldId={1}
          pagination={true}
          paginationComponentOptions={{
            selectAllRowsItem: true,
            selectAllRowsItemText: "All",
          }}
          paginationStyle={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
          }}
        />
      </div>
    </div>
  );
}

export default reports;
