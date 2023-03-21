import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";

function settings() {
  return (
    <div>
      <h1 className={styles.title}>Settings</h1>
      <Link className={styles.title} href="/login">
        Logout
      </Link>
    </div>
  );
}

export default settings;
