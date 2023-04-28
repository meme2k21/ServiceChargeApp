import React, { useContext, useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Head from "next/head";
import { FaRegEnvelope, FaUnlockAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
const LOGIN_URL = "/login";

// axios.create({
//   baseURL: "http://localhost:3500",
// });

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  console.log("samepl");

  const router = useRouter();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const credentials = { email: email, password: password };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handlesubmit");
    axios
      .post("http://localhost:8080/login", credentials)
      .then((response) => {
        // authentication successful, do something here
        // --------------------------------------------------------------
        const user = response?.data?.data;
        console.log(response.data);
        if (response.data.status === "ERROR" && user === null) {
          setShowModal(true);
          return;
        }

        localStorage.setItem("id", user.user_id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("role", user.role.role_id);

        if (user.role.role_id === 1) router.push("/clientDashboard");
        else router.push("/dashboard");
        // THIS IS WITH NEW BACKEND
        // --------------------------------------------------------------

        // if (response.status === 200 && response.data !== "") {
        //   localStorage.setItem("id", response.data.user_id);
        //   localStorage.setItem("username", response.data.username);
        //   localStorage.setItem("email", credentials.email);
        //   localStorage.setItem("role", response.data.user_role_id);

        //   console.log(response.data.user_role_id);
        //   if (response.data.user_role_id === 1) router.push("/clientDashboard");
        //   else router.push("/dashboard");
        //   console.log("Success fetch user");
        // } else {
        //   setShowModal(true);
        //   console.log("Fail fetch user");
        // }
      })
      .catch((error) => {
        // authentication failed, do something here
        console.log(error);
      });
  };

  function WrongCredentialsModal({ showModal }) {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Login failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Your email or password is incorrect. Please try again.</h6>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setShowModal(false)}
            type="button"
            className="w-full bg-red-700 hover:bg-white hover:text-red-700"
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <Head>
        <title>Service Charge 5 Login</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <main
        className="flex flex-col items-center justify-center w-full px-20 text-center"
        style={{ marginBottom: "-5%" }}
      >
        {showModal && <WrongCredentialsModal showModal={showModal} />}
        <div className="mt-4 rounded-2xl shadow-2xl flex w-full max-w-4xl border border-white">
          {/* LOGIN SECTION */}
          <div
            className="w-1/2 "
            style={{ borderTopLeftRadius: "5%", borderBottomLeftRadius: "5%" }}
          >
            <div className="text-left mt-10 mb-5 text-white">
              <h2 className="font-bold text-center">Login to Your Account</h2>
              <p className="text-xs text-center">
                Please input your credentials to proceed
              </p>
            </div>
            <div className="">
              {/* <h2 className="text-3xl font-bold text-red-700">Sign in</h2> */}
              {/* <div className="border-2 w-10 border-red-700 inline-block mb-2"></div> */}
              <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit}>
                  <div className="bg-gray-100 w-full p-0 flex items-center mb-2 border-b-2 border-red-700">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Email"
                      className="bg-gray-100 outline-none text-sm flex-1 border-hidden"
                    />
                  </div>
                  <div className="bg-gray-100 w-full p-0 flex items-center border-b-2  border-red-700 mb-4">
                    <FaUnlockAlt className="text-gray-400 m-2" />
                    <input
                      required
                      type="password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm flex-1 border-hidden autofill:bg-black"
                    />
                  </div>
                  <div className="flex justify-between w-full mb-5">
                    <label className="flex items-center text-xs">
                      <input
                        type="checkbox"
                        name="remember"
                        className="mr-1 flex-1"
                      />
                      Remember me
                    </label>
                    <Link href="/forgotpassword" className="text-xs">
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-700 hover:bg-white hover:text-red-700"
                  >
                    Login
                  </button>
                </form>

                {/* <Link
                  href="/#"
                  className="bg-red-700 text-white p-2 rounded-sm w-full font-semibold hover:bg-white hover:text-red-700 mb-2 text-lg"
                >
                  LOGIN
                </Link> */}
              </div>
            </div>
            <p className="mb-2"></p>
          </div>
          {/* LOGO SECTION */}
          <div
            className=" w-1/2 p-10"
            style={{
              borderTopRightRadius: "3%",
              borderBottomRightRadius: "3%",
              backgroundColor: "white",
            }}
          >
            <p className="font-semibold text-left">powered by</p>
            <Image
              style={{ borderRadius: 5, opacity: 1 }}
              src="/logo-alliance-comp.png"
              width={200}
              height={200}
              alt="Logo Alliance"
            />
            {/* <div className="w-full h-full bg-gray-400">Some pic</div> */}
            <Image
              style={{ borderRadius: 5 }}
              src="/login-pic.jpg"
              width={500}
              height={500}
            />
            <div className="text-sm">
              <p>
                Don't have an account?{" "}
                <Link href="/register" className="text-red-700">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
