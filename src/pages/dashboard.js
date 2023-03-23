import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  FaLock,
  FaLockOpen,
  FaRegEnvelope,
  FaUnlockAlt,
  FaUserLock,
} from "react-icons/fa";
import styles from "../styles/Home.module.css";

function dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <div>
        <h1 className={styles.title}>Dashboard</h1>
        <p className="text-3xl font-bold underline">hello</p>
      </div>
    </>
  );
}

export default dashboard;
