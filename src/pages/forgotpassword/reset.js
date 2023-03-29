import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegEnvelope, FaUnlockAlt } from "react-icons/fa";

function ResetPassword() {
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
            {/* <div className="w-full h-full bg-gray-400">Some pic</div> */}
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
              <p className="text-xs">
                Please create and enter your new password here.
              </p>
            </div>
            <div className="py-10">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-full p-0 flex items-center mb-2 border-b-2 border-red-700">
                  <FaUnlockAlt className="text-gray-400 m-2" />

                  <input
                    type="newpassword"
                    name="newpassword"
                    placeholder="New Password"
                    className="bg-gray-100 outline-none text-sm flex-1 border-hidden"
                  />
                </div>
                <div className="bg-gray-100 w-full p-0 flex items-center mb-2 border-b-2 border-red-700">
                  <FaUnlockAlt className="text-gray-400 m-2" />

                  <input
                    type="confirmnewpassword"
                    name="confirmnewpassword"
                    placeholder="Confirm New Password"
                    className="bg-gray-100 outline-none text-sm flex-1 border-hidden"
                  />
                </div>
                <Link
                  href="/login"
                  className="bg-red-700 text-white p-2 rounded-sm w-full font-semibold hover:bg-white hover:text-red-700 mb-2 text-lg"
                >
                  Reset Password
                </Link>
              </div>
            </div>
            <p className="mb-2"></p>
          </div>
        </div>
      </main>
    </>
  );
}

export default ResetPassword;
