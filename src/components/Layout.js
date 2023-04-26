import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";
import ClientNavbar from "./ClientNavbar";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setUsername(localStorage.getItem("username"));
    setRole(localStorage.getItem("role"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const hideNavbar =
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/" ||
    router.pathname === "/forgotpassword";
  const isAdmin = `${role}` !== `1`;

  return (
    <div
      className="content"
      style={
        !hideNavbar
          ? { display: "flex", flexDirection: "column", minHeight: "100vh" }
          : {
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              backgroundImage: "url(bgAll.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "inset 300px 300px 1000px rgba(0, 0, 0, .9)",
            }
      }
    >
      {!hideNavbar ? isAdmin ? <AdminNavbar /> : <ClientNavbar /> : <Navbar />}
      <div style={{ paddingTop: "80px", margin: "20px", flexGrow: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
