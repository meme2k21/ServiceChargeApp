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
    <nav className="CancelAllStylingNav">
          <div className="logo">
            <a href='/' onClick={(e)=>e.preventDefault()} style={{ display: "flex", textDecoration: 'none', alignItems:'center' }}>
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
              <div className="d-none d-xl-block" >
                <div style={{fontSize: '80%'}}>&nbsp;SERVICE CHARGE 5</div>
              </div>
            </a>
          </div>
          <Link href="/" style={{textDecoration:'none'}}>
            Home
          </Link>
          <Link href="https://www.alliance.com.ph/index" style={{textDecoration:'none'}}>
            About Us
          </Link>
          <Link href="https://www.alliance.com.ph/contact" style={{textDecoration:'none'}}>
            Contact Us
          </Link>
          <Link href="/login" style={{textDecoration:'none'}}>
            Login
          </Link>
        </nav>
  );

}

export default Navbar;
