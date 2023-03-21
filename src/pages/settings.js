import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";

function settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <h1 className={styles.title}>Settings</h1>
      <Link href="/login">Logout</Link>
    </>
  );
}

export default settings;
