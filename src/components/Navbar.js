import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Navbar(props) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  function handleLoginClick() {
    setIsLogin(!isLogin);
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isLoggedIn = props.isLoggedIn;
  const currentPage = props.currentPage;

  return (
    <nav style={{ marginTop: "40px" }}>
      <div className="logo" style={{ height: "50px" }}>
        <a href="/" style={{ display: "flex" }}>
          <Image
            alt="Alliance logo"
            style={{
              borderRadius: 5,
              marginTop: "-10px",
              marginBottom: "10px",
              minWidth:'50px'
            }}
            src="/alliance-logo.jpeg"
            width={50}
            height={50}
          />
          <div className="d-none d-xl-block">
            <div style={{fontSize: '80%', textDecoration: 'none'}}>SERVICE CHARGE 5</div>
          </div>
        </a>
      </div>
        <Link
          className={router.asPath === "/dashboard" ? "active-link" : ""} href="/dashboard" style={{textDecoration:'none'}}
        >
          Dashboard
        </Link>
        <Link
          className={router.asPath === "/tickets" ? "active-link" : ""} href="/tickets" style={{textDecoration:'none'}}
        >
          Tickets
        </Link>
        <Link
          className={router.asPath === "/reports" ? "active-link" : ""} href="/reports" style={{textDecoration:'none'}}
        >
          Reports
        </Link>

        {isLogin ? (
          <Link
            className={router.asPath === "/settings" ? "active-link" : ""} href="/settings" style={{textDecoration:'none'}} onClick={handleLoginClick}
          >
            Settings
          </Link>
        ) : (
          <Link
            className={router.asPath === "/login" ? "active-link" : ""} href="/login" style={{textDecoration:'none'}} onClick={handleLoginClick}
          >
            Login
          </Link>
        )}
    </nav>
  );

}

export default Navbar;
