import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import OAuth from "../../OAuth/oauth";

const Signin = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const { user, login } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.name) {
            if (user.role === "admin") {
                navigate('/admin-dashboard');
            } else {
                navigate('/employee-dashboard');
            }
        }
    }, [user, navigate]);

    const handleSignin = async () => {
        try {
            const response = await axios.post("https://gg-wb8q.onrender.com/api/auth/login", {
                email,
                password
            });
            
            console.log(response.data);

            if (response.status === 200) {
                const { token, user } = response.data;
            
                localStorage.setItem("token", token);
                login(user); // ✅ update user context
                alert("Login success");
            
                // ✅ Navigate based on role
                if (user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            console.error("Signin error:", error.response?.data || error.message);
            alert(error.response?.data?.error || "An error occurred. Please check your details and try again.");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-teal-200 h-auto w-110 rounded-md p-6">
                    <div className="flex justify-center pt-5 font-bold text-4xl">
                        Sign in
                    </div>

                    <div className="flex justify-center pt-4 font-light text-xl">
                        Enter your Information to access your Account
                    </div>

                    <div className="flex flex-col m-5">
                        <label>E-mail</label>
                        <input 
                            onChange={(e) => setemail(e.target.value)} 
                            type="email" 
                            placeholder="Enter your E-mail"  
                            className="border-2 rounded-md p-2 mt-2"
                            value={email}
                        />
                    </div>

                    <div className="flex flex-col m-5">
                        <label>Password</label>
                        <input 
                            onChange={(e) => setpassword(e.target.value)} 
                            type="password" 
                            placeholder="Enter your password"  
                            className="border-2 rounded-md p-2 mt-2"
                            value={password}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button 
                            onClick={handleSignin}
                            className="bg-zinc-900 text-white px-6 py-2 rounded-md cursor-pointer w-full mx-5"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="flex items-center justify-center mx-5">
                        <OAuth role="employee" />
                    </div>    

                    <div className="flex justify-center pt-2">
                        Don't have an Account?
                        <span className="text-blue-500 underline cursor-pointer ml-1" onClick={() => navigate('/Signup')}>
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;