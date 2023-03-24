import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Navbar() {
  const router = useRouter();

  return (
    <nav style={{marginTop:'40px'}}>
      <div className="logo" style={{height:'50px'}}>
        <a href="/" style={{ display: "flex"}}>
        <Image
          style={{ borderRadius: 5, marginTop:'-10px', marginBottom:'10px' }}
          src="/alliance-logo.jpeg"
          width={50}
          height={50}
        /><div style={{marginLeft:'10px', fontSize: '30px'}}>SERVICE CHARGE 5</div>
        </a>
      </div>

      <div style={{ justifyContent: "space-evenly", alignItems: "center", display: "left" }}>
        <Link
          className={router.asPath === "/dashboard" ? "active-link" : ""}
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={router.asPath === "/tickets" ? "active-link" : ""}
          href="/tickets"
        >
          Tickets
        </Link>
        <Link
          className={router.asPath === "/reports" ? "active-link" : ""}
          href="#"
        >
          Reports
        </Link>
        <Link
          className={router.asPath === "/settings" ? "active-link" : ""}
          href="/settings"
        >
          Settings
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
