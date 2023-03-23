import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="content">
      <Navbar />
      <div style={{margin:'20px', marginTop:'-50px'}}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
