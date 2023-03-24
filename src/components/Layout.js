import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="content">
      <Navbar />
      <div style={{ width: '100vw', height: '130px', marginTop:'-50px'}}> </div>
      <div style={{margin:'20px'}} >{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
