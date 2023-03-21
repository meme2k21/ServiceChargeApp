import React, { useContext, useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Head from "next/head";
const LOGIN_URL = "/login";

axios.create({
  baseURL: "http://localhost:8080",
});

const Login = () => {
  //   const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        userEmail: email,
        userPassword: password,
      })
      .then((response) => {
        // authentication successful, do something here
        if (response.status === 200 && response.data !== "") {
          console.log("Success fetch user");
          setUser({ loggedIn: true, data: response.data });
        } else {
          console.log("Fail fetch user");
          setUser({ loggedIn: false });
        }
      })
      .catch((error) => {
        // authentication failed, do something here
        console.log(error);
      });
  };

  return (
    <>
      {" "}
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <div className="loginPage">
        {/* {user.loggedIn ? <p>Successfully logged in</p> : <></>} */}
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <label
            htmlFor="email"
            style={{ alignSelf: "flex-start", fontWeight: "bold" }}
          >
            Email:
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <FaUserAlt size={30} color="#e40707" style={{ marginRight: 10 }} />
            <input type="email" id="email" onChange={handleEmailChange} />
          </div>
          <label
            htmlFor="password"
            style={{
              alignSelf: "flex-start",
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Password:
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <FaLock size={30} color="#e40707" style={{ marginRight: 10 }} />
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
          </div>
          <button
            style={{
              alignSelf: "center",
              width: "100%",
              fontWeight: "bold",
              marginTop: 20,
            }}
            type="submit"
          >
            Login
          </button>

          <button className="forgotPassword" type="submit">
            Forgot Password?
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
