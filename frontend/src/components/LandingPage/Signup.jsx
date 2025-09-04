import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import OAuth from "../../OAuth/oauth";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setRole] = useState("employee"); // Default role (lowercase)
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            console.log("Request going...");

            const response = await axios.post("https://gg-wb8q.onrender.com/api/auth/register", {
                name,
                email,
                password,
                role: role.toLowerCase(), // Ensure lowercase
            });

            console.log("Response:", response.data);

            if (response.status === 201) {
                alert(response.data.message);
                navigate("/Signin");
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            alert(error.response?.data?.error || "An error occurred. Please check your details and try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-teal-200 h-auto w-110 rounded-md p-6">
                <div className="flex justify-center pt-2 font-bold text-4xl">
                    Sign up
                </div>

                <div className="flex justify-center pt-2 font-light text-xl">
                    Enter your Information to create an Account
                </div>

                <div className="flex flex-col m-5">
                    <label>Name</label>
                    <input 
                        onChange={(e) => setName(e.target.value)}  
                        type="text" 
                        placeholder="Enter your Name"  
                        className="border-2 rounded-md p-2 mt-2"
                        value={name}
                    />
                </div>

                <div className="flex flex-col m-5">
                    <label>Email</label>
                    <input 
                        onChange={(e) => setemail(e.target.value)} 
                        type="email" 
                        placeholder="Enter your Email"  
                        className="border-2 rounded-md p-2 mt-2"
                        value={email}
                    />
                </div>

                <div className="flex flex-col m-5">
                    <label>Password</label>
                    <input 
                        onChange={(e) => setpassword(e.target.value)}  
                        type="password" 
                        placeholder="Enter your Password"  
                        className="border-2 rounded-md p-2 mt-2"
                        value={password}
                    />
                </div>

                <div className="flex flex-col m-5">
                    <label>Role</label>
                    <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border-2 rounded-md p-2 mt-2"
                    >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={handleSignup}
                        className="bg-zinc-900 text-white px-6 py-2 rounded-md cursor-pointer w-full mx-5"
                    >
                        Sign up
                    </button>
                </div>

                <div className="flex items-center justify-center mx-5">
                    <OAuth role={role} />
                </div>

                <div className="flex justify-center pt-2">
                    Already have an Account?
                    <span 
                        className="text-blue-500 underline cursor-pointer ml-1" 
                        onClick={() => navigate('/Signin')}
                    >
                        Sign in
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Signup;