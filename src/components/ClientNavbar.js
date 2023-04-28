import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AdminNavbar(props) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [email, getEmail] = useState(false);

  let loggedin = false;
  if(email != null | email != "")
    loggedin = true;
  else 
    loggedin = false;
  
  function handleLoginClick() {
    setIsLogin(!isLogin);
  }
  function handleLogOutClick() {
    const logout = localStorage.removeItem('email');
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isLoggedIn = props.isLoggedIn;
  const currentPage = props.currentPage;

  useEffect(() => {
    getEmail(localStorage.getItem('email'));
  }, [])

  return (
    <nav className="CancelAllStyling">
      <div className="logo" >
        <a href="" onClick={(e) => e.preventDefault()} style={{ display: "flex", textDecoration: 'none', alignItems:'center' }}>
          <Image
            alt="Alliance logo"
            style={{
              borderRadius: 5,
              minWidth:'50px'
            }}
            src="/alliance-logo.jpeg"
            width={50}
            height={50}
          />
          <div className="d-none d-xl-block">
            <div style={{fontSize: '80%'}}>&nbsp;SERVICE CHARGE 5</div>
          </div>
        </a>
      </div>
        <Link
          className={router.asPath === "/clientDashboard" ? "active-link" : ""} href="/clientDashboard" style={{textDecoration:'none'}}
        >
          Dashboard
        </Link>
        <Link
          className={router.asPath === "/clientReports" ? "active-link" : ""} href="/clientReports" style={{textDecoration:'none'}}
        >
          Reports
        </Link>

        {loggedin ? (
          <Link
          className={router.asPath === "/" ? "active-link" : ""} href="/" style={{textDecoration:'none'}} onClick={handleLogOutClick}
        >
          Log Out
        </Link>
        ) : (
          <Link
            className={router.asPath === "/" ? "active-link" : ""} href="/" style={{textDecoration:'none'}} onClick={handleLoginClick}
          >
            Log Out
          </Link>
        )}
    </nav>
  );

}

export default AdminNavbar;
