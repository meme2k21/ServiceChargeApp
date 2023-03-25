import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaLock,
  FaLockOpen,
  FaRegEnvelope,
  FaUnlockAlt,
  FaUserLock,
} from "react-icons/fa";
import styles from "../styles/Home.module.css";


function dashboard() {
  const [ticketHealth, setTicketHealth] = useState('Ticket Health');
  const [ticketStatus, setTicketStatus] = useState('Ticket Status');
  const [ticketYearCreated, setTicketYearCreated] = useState('Year Created');

  return (
    <div style={{background:'white'}}>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <div style={{display:'flex', alignItems:'center'}}>
          <select value={ticketYearCreated} style={{opacity: ticketYearCreated ==="Year Created"?0.5:1, border:'1px solid black', marginRight:'20px', height:'40px', width:'227px', fontStyle:'italic'}} >
            <option disabled>{ticketYearCreated}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      <br />
      <table style={{borderBottom:'2px solid black', marginBottom:'10px'}}>
        <thead>
          <tr style={{backgroundColor:'#D9D9D9', color:'black', fontSize:'16px'}}>
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
    </div>
  );
}

export default dashboard;
