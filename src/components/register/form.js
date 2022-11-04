import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import bgImg from './Characters1.png'
import { useForm } from 'react-hook-form';
import "./form.css"
import { GoogleLogin } from 'react-google-login';
import { useCallback } from 'react';
// import { post } from 'utils/sdk';
import axios from 'axios';
import {gapi} from "gapi-script"

const clientId = "868476725043-56q2l17h7bf2a1fpvkqp04t5br7mti4p.apps.googleusercontent.com"

export default function Form() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);

    const {state} = useLocation();
    const { profileData, token } = state;

    // const profileData = window.sessionStorage.getItem("profileData");
    // const token = window.sessionStorage.getItem("tokenId");
    console.log(profileData);

    const postData = (profdata)=> {
        console.log(profdata)
        const mobile = Number(profdata.phone_number);
        if (isNaN(mobile)){
            console.log("wrong number")
            return;
        }
        if (profdata.Password !== profdata.ConfirmPassword){
            console.log("Password is not equal to confirm password")
            return;
        }

        const header= {
            "Authorization": token
        }
        const data = profdata;
        axios.post("http://127.0.0.1:8000/auth/google-login", header, data)
    }
    
  return (
    <section className="registerContainer">
        <div className="register">
            <div className="col-1">
                <h2>Sign In</h2>
                {/* <span>register and enjoy the service</span> */}

                <form id='form' className='flex flex-col' onSubmit={handleSubmit((data) => postData(data))}>
                    <input type="text" {...register("name")} value={profileData.givenName} placeholder={profileData.givenName} readOnly/>
                    <input type="text" {...register("email")} value={profileData.email} placeholder={profileData.email} readOnly/>
                    <input type="text" {...register("phone_number", { valueAsNumber: true})} placeholder='Whatsapp Number' required/>
                    <input type="text" {...register("college_name")} placeholder='College/Institute' required/>
                    <input  list="years" {...register("year")} placeholder='Year' required/>
                    <datalist id="years">
                        <option value="ONE">ONE</option>
                        <option value="TWO">TWO</option>
                        {/* <option value="3">Third</option>
                        <option value="4">Fourth</option>
                        <option value="5">Fifth</option> */}
                    </datalist>
                    {/* <select name="year" {...register("year")} placeholder='Year' required>
                        <option value="ONE">ONE</option>
                        <option value="TWO">TWO</option>
                    </select> */}
                    <input type="text" {...register("branch")} placeholder='Branch' required/>
                    <input type="password" {...register("Password")} placeholder='Password' required/>
                    <input type="password" {...register("ConfirmPassword")} placeholder='Confirm Password' required/>
                    {/* {errors.mobile?.type === "required" && "Some Fields are missing!!!"} */}
                    {/* {errors.college_name?.type === "required" && "College Name is required"} */}
                    {/* {errors.mobile?.type === "valueAsNumber" && "Enter correct mobile Number"} */}
                    {/* {errors.year?.type === "required" && "Year is required"} */}
                    {/* {errors.branch?.type === "required" && "Branch is required"} */}
                    {/* {errors.Password?.type === "required" && "password is required"} */}
                    {/* {errors.ConfirmPassword?.type === "required" && "confirm password is required"} */}
                    <button className='signinbtn'>Sign In</button>
                </form>

            </div>
            <div className="col-2">
                <img className="formimg" src={bgImg} alt="" />
            </div>
        </div>
    </section>
  )
}