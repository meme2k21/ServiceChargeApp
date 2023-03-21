import Head from "next/head";
import React from "react";
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
      </div>
    </>
  );
}

export default dashboard;
