import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Navbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  function handleLoginClick() {
    setIsLogin(!isLogin);
  }

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

      <div style={{ justifyContent: "space-between", alignItems: "center", display: "left" }}>
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
          href="/reports"
        >
          Reports
        </Link>
        
        {isLogin ? (
          <Link
          className={router.asPath === "/settings" ? "active-link" : ""}
          href="/settings"
          onClick={handleLoginClick}
          >
            Settings
          </Link>
        ) : 
        <Link
          className={router.asPath === "/login" ? "active-link" : ""}
          href="/login"
          onClick={handleLoginClick}
        >
          Login
        </Link>
        }
      </div>
    </nav>
  );
}

export default Navbar;
