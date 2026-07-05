import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleReset = async ()=>{

        try{

            const res = await axios.post(`${API}/auth/forgot-password`,{
                email,
                password
            });

            toast.success(res.data.message);

            navigate("/login");

        }catch(err){

            toast.error(err.response?.data?.message || "Something went wrong");

        }

    }

    return(

        <div style={{
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            background:"#0b1120"
        }}>

            <div style={{
                width:"350px",
                padding:"30px",
                background:"#1e293b",
                borderRadius:"10px"
            }}>

                <h2 style={{color:"white"}}>Reset Password</h2>

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginTop:"20px"
                    }}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginTop:"15px"
                    }}
                />

                <button
                    onClick={handleReset}
                    style={{
                        width:"100%",
                        marginTop:"20px",
                        padding:"10px",
                        cursor:"pointer"
                    }}
                >
                    Reset Password
                </button>

            </div>

        </div>

    )

}