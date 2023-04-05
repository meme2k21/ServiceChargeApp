import React, { useContext, useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Head from "next/head";
import { FaRegEnvelope, FaUnlockAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
const LOGIN_URL = "/login";

// axios.create({
//   baseURL: "http://localhost:3500",
// });

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        if (response.status === 200 && response.data !== "") {
          router.push("/");
          console.log("Success fetch user");
          // setUser({ loggedIn: true, data: response.data });
        } else {
          console.log("Fail fetch user");
          // setUser({ loggedIn: false });
        }
      })
      .catch((error) => {
        // authentication failed, do something here
        console.log(error);
      });
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl">
          {/* LOGO SECTION */}
          <div className="w-1/2 bg-white rounded-l-lg p-10">
            <p className="font-semibold text-left">powered by</p>
            <Image
              style={{ borderRadius: 5 }}
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
          </div>
          {/* LOGIN SECTION */}
          <div className="w-1/2 p-5 rounded-r-lg bg-gray-100">
            <div className="text-left mt-10 mb-5">
              <h3 className="font-bold text-lg">SERVICE CHARGE 5</h3>
              <p className="text-xs">
                Please input your credentials to proceed
              </p>
            </div>
            <div className="py-10">
              {/* <h2 className="text-3xl font-bold text-red-700">Sign in</h2> */}
              {/* <div className="border-2 w-10 border-red-700 inline-block mb-2"></div> */}
              <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit}>
                  <div className="bg-gray-100 w-full p-0 flex items-center mb-2 border-b-2 border-red-700">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
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
                <div className="text-sm">
                  <p>
                    Don't have an account?{" "}
                    <Link href="#" className="text-red-700">
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <p className="mb-2"></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
