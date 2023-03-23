import Head from "next/head";
import React from "react";
import styles from "../../styles/Home.module.css";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { tickets: data },
  };
};

function Tickets({ tickets }) {
  return (
    <>
      <Head>
        <title>Tickets</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <div>
        <h1 className={styles.title}>Tickets</h1>
        {tickets.map((ticket) => (
          <div key={ticket.id}>
            <a className={styles.single}>
              <h3>{ticket.name}</h3>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Tickets;
