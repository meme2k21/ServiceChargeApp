import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaRegEnvelope, FaUnlockAlt } from "react-icons/fa";

function ForgotPassword() {
  const router = useRouter();

  const [validEmail, setValidEmail] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);

  // Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const sendEmail = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    // Validate the email address here
    const emailExists = await checkEmailExist(email);
    if (emailExists) {
      // Sent token to email
      sendNewToken(email);
      // router.push("/forgotpassword/code");
    }
  };

  const sendNewToken = async (email) => {
    await axios
      .post(`http://localhost:8080/forgot-password?email=${email}`)
      .then((response) => {
        if (response.status === 200 && response.data !== null) {
          setEmail(email);
          console.log(response); //email sent success
        }
      })
      .catch((error) => {
        console.log(error); //email sent fail
      });
  };

  const checkEmailExist = async (email) => {
    const response = await axios.get(
      `http://localhost:8080/user/email/${email}`
    );
    if (response.data.status === "ERROR" && response.data.data === null) {
      alert("User not found");
      setValidEmail(false);
      setStep(0);
      return false;
    }
    setValidEmail(true);
    setStep(1);
    return true;
  };

  const checkTokenIfValid = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      `http://localhost:8080/forgot-password/token?token=${token}`
    );
    if (response.status === 200 && response.data !== null) {
      const tokenData = response.data.data;
      const tokenDate = new Date(tokenData.expiryDate);
      const now = new Date();
      if (tokenDate < now) {
        alert("Token has expired. Please request another one.");
        return;
      }
      setStep(2);
    } else {
      alert("Token not valid");
    }
  };

  const updateUserPassword = async (email, newPassword, confirmNewPassword) => {
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm new password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/update-password",
        {
          email: email,
          newPassword: newPassword,
        }
      );
      router.push("/");

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="keywords" content="dashboard" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl">
          {/* LOGO SECTION */}
          <div className="w-1/2 bg-white rounded-l-lg p-10">
            <p className="font-semibold text-left">powered by</p>
            <Image
              alt="Alliance Logo"
              style={{ borderRadius: 5 }}
              src="/logo-alliance-comp.png"
              width={200}
              height={200}
            />
            <Image
              style={{ borderRadius: 5 }}
              src="/login-pic.jpg"
              width={500}
              height={500}
            />
          </div>
          {/* FORGOT PASSWORD SECTION */}
          <div className="w-1/2 p-5 rounded-r-lg bg-gray-100">
            <div className="text-center mt-10 mb-5">
              <h3 className="font-bold text-lg">FORGOT PASSWORD</h3>
              {validEmail && step === 1 && (
                <p className="text-xs">
                  A code was sent to your email. If you cannot find the message
                  in your inbox, please check your spam.
                </p>
              )}
              {validEmail && step === 2 && (
                <p className="text-xs">
                  Please create and enter your new password here.
                </p>
              )}
            </div>
            {!validEmail && step === 0 && (
              <form onSubmit={sendEmail}>
                <div className="py-10">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 w-full p-0 flex items-center mb-2 border-b-2 border-red-700">
                      <FaRegEnvelope className="text-gray-400 m-2" />
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="bg-gray-100 outline-none text-sm flex-1 border-hidden"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-red-700 text-white p-2 rounded-sm w-full font-semibold hover:bg-white hover:text-red-700 mb-2 text-lg text-decoration-none"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}

            {validEmail && step === 1 && (
              <>
                <form onSubmit={checkTokenIfValid}>
                  <div className="py-10">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 w-full p-0 flex items-center mb-2 border-b-2 border-red-700">
                        <FaRegEnvelope className="text-gray-400 m-2" />

                        <input
                          required
                          onChange={handleTokenChange}
                          type="code"
                          name="code"
                          placeholder="Code"
                          className="bg-gray-100 outline-none text-sm flex-1 border-hidden"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-red-700 text-white p-2 rounded-sm w-full font-semibold hover:bg-white hover:text-red-700 mb-2 text-lg"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
                <button
                  onClick={() => sendNewToken(email)}
                  className="bg-red-700 text-white p-2 rounded-sm w-full font-semibold hover:bg-white hover:text-red-700 mb-2 text-lg"
                >
                  Request new token
                </button>
              </>
            )}
            {validEmail && step === 2 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  updateUserPassword(email, newPassword, confirmNewPassword);
                }}
              >
                <div className="py-10">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 w-full p-0 flex items-center mb-2 border-b-2 border-red-700">
                      <FaUnlockAlt className="text-gray-400 m-2" />
                      <input
                        required
                        type="password"
                        name="newpassword"
                        onChange={handleNewPasswordChange}
                        placeholder="New Password"
                        className="bg-gray-100 outline-none text-sm flex-1 border-hidden"
                      />
                    </div>
                    <div className="bg-gray-100 w-full p-0 flex items-center mb-2 border-b-2 border-red-700">
                      <FaUnlockAlt className="text-gray-400 m-2" />

                      <input
                        required
                        type="password"
                        name="confirmnewpassword"
                        onChange={handleConfirmNewPasswordChange}
                        placeholder="Confirm New Password"
                        className="bg-gray-100 outline-none text-sm flex-1 border-hidden"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-red-700 text-white p-2 rounded-sm w-full font-semibold hover:bg-white hover:text-red-700 mb-2 text-lg"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
            )}
            <p className="mb-2"></p>
          </div>
        </div>
      </main>
    </>
  );
}

export default ForgotPassword;
