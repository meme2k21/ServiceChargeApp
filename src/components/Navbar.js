import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Navbar() {
  const router = useRouter();

  return (
    <nav>
      <div className="logo">Service Charge 5</div>

      <div style={{ justifyContent: "space-evenly", display: "flex" }}>
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
