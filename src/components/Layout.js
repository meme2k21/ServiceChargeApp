import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";
import { useRouter } from 'next/router';

function Layout({ children }) {
  const router = useRouter();
  const hideNavbar = router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/';

  return (
    <div className="content" 
    style={!hideNavbar? 
          {display:'flex', flexDirection:'column', minHeight:'100vh' }: 
          {display:'flex', flexDirection:'column', minHeight:'100vh', backgroundImage:'url(bgAll.jpg)', backgroundSize:'cover', backgroundPosition:'center', boxShadow: 'inset 300px 300px 1000px rgba(0, 0, 0, .9)'}
          }>
      {!hideNavbar? <AdminNavbar />: <Navbar/>}
      <div style={{paddingTop:'80px', margin:'20px', flexGrow:1}} >{children}</div>
      <Footer/>
    </div>
  );
}

export default Layout;
