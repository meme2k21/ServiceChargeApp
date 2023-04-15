import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Login from "./login";

export default function index() {
  return (
    <div >
      <Head>
        <title>Service Charge 5</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{textAlign:'center', flex:1, background: 'linear-gradient(to right, white, red)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent' }}>
      <h1>Welcome to Our Service Charge Website</h1>
        <p>We are a team of experts that specialize in helping businesses navigate the complexities of service charges.</p>
        {/* <button>Contact Us</button> */}
        
      </main>
      <Login/><br/>
    </div>
  );
}