import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRouter } from 'next/router';

function Layout({ children }) {
  const router = useRouter();
  const hideNavbar = router.pathname === '/login';

  return (
    <div className="content">
      {!hideNavbar && <Navbar />}
      <div style={{ width: '100vw', height: '130px', marginTop:'-50px'}}> </div>
      <div style={{margin:'20px'}} >{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
