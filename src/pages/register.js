import React, { useContext, useState, useEffect } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Head from "next/head";
import { FaRegEnvelope, FaUnlockAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
  
  const Register = () => {
    
    return (
        <div>
            <header>
                <title>Registration</title>
            </header>
            <div className="d-flex align-items-center justify-content-center" style={{flexDirection:'column'}} >
                <h3 className="text-white mb-3">Registration Page</h3>
                {/* The actual form */}
                <form action="/" method="post" style={{width:'50%', minWidth:'192px', boxShadow:' 50px 50px 100px rgba(0, 0, 0, 0.7)'}}>
                    {/* firstName div */}
                    <div style={{display:'flex', alignItems:'center', paddingBottom:'10px', textAlign:'right'}}>
                        <label className="form__label" for="fname" style={{whiteSpace:'nowrap', width:'150px', marginRight:'10px'}}>First Name:</label>
                        <input className="form__input" type="text" id="fname" name="fname" required minlength="1" maxlength="255" style={{width:'70%'}} />
                    </div>
                    {/* lastname div */}
                    <div style={{display:'flex', alignItems:'center', paddingBottom:'10px', textAlign:'right'}}>
                        <label className="form__label" for="lname" style={{whiteSpace:'nowrap', width:'150px', marginRight:'10px'}}>Last Name:</label>
                        <input className="form__input" type="text" id="lname" name="lname" required minlength="1" maxlength="255" style={{width:'70%'}} />
                    </div>
                    {/* email div */}
                    <div style={{display:'flex', alignItems:'center', paddingBottom:'10px', textAlign:'right'}}>
                        <label className="form__label" for="email" style={{whiteSpace:'nowrap', width:'150px', marginRight:'10px'}}>E-mail:</label>
                        <input className="form__input" type="text" id="email" name="email" required minlength="7" maxlength="255" style={{width:'70%'}} />
                    </div>
                    {/* password div */}
                    <div style={{display:'flex', alignItems:'center', paddingBottom:'10px', textAlign:'right'}}>
                        <label className="form__label" for="password" style={{whiteSpace:'nowrap', width:'150px', marginRight:'10px'}}>Password:</label>
                        <input className="form__input" type="text" id="password" name="password" required minlength="8" maxlength="255" style={{width:'70%'}} />
                    </div>
                    {/* confirmPassword div */}
                    <div style={{display:'flex', alignItems:'center', paddingBottom:'10px', textAlign:'right'}}>
                        <label className="form__label" for="confirmPassword" style={{whiteSpace:'nowrap', width:'150px', marginRight:'10px'}}>Confirm Password:</label>
                        <input className="form__input" type="text" id="confirmPassword" name="confirmPassword" required minlength="8" maxlength="255" style={{width:'70%'}} />
                    </div>
                    {/* button to submit */}
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
        

    // <div className="form">
    //     <div className="form-body">
    //         <div className="username">
    //             <label className="form__label" for="firstName">First Name </label>
    //             <input className="form__input" type="text" id="firstName" required placeholder="First Name"/>
    //         </div>
    //         <div className="lastname">
    //             <label className="form__label" for="lastName">Last Name </label>
    //             <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
    //         </div>
    //         <div className="email">
    //             <label className="form__label" for="email">Email </label>
    //             <input  type="email" id="email" className="form__input" placeholder="Email"/>
    //         </div>
    //         <div className="password">
    //             <label className="form__label" for="password">Password </label>
    //             <input className="form__input" type="password"  id="password" placeholder="Password"/>
    //         </div>
    //         <div className="confirm-password">
    //             <label className="form__label" for="confirmPassword">Confirm Password </label>
    //             <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
    //         </div>
    //     </div>
    //     <div class="footer">
    //         <button type="submit" class="btn">Register</button>
    //     </div>
    // </div>
  );
  
  };
  
  export default Register;
