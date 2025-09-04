// import axios from "axios";
// import React, { useState } from "react";
// import { useAuth } from "../context/authContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setIsLoading(true);

//         try {
//             const response = await axios.post(
//                 "https://gg-wb8q.onrender.com/api/auth/login",
//                 { email, password },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             // Changed res.data to response.data
//             if (response.data.success) {
//                 login(response.data.user);
//                 localStorage.setItem("token", response.data.token);
                
//                 // Add token to axios default headers for subsequent requests
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

//                 if (response.data.user.role === "admin") {
//                     navigate('/admin-dashboard');
//                 } else {
//                     navigate('/employee-dashboard');
//                 }
//             }
//         } catch (error) {
//             if (error.response && !error.response.data.success) {
//                 setError(error.response.data.error);
//             } else {
//                 setError("Server error. Please try again later.");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center h-screen justify-center 
//         bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
//             <h2 className="font-pacific text-3xl text-white">
//                 Employee Management System
//             </h2>
//             <div className="border shadow p-6 w-80 bg-white rounded-lg">
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>
//                 {error && (
//                     <p className="text-red-500 bg-red-50 p-2 rounded mb-4 text-sm">
//                         {error}
//                     </p>
//                 )}
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-gray-700">Email</label>
//                         <input 
//                             id="email"
//                             type="email" 
//                             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//                             placeholder="Enter Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="password" className="block text-gray-700">Password</label>
//                         <input 
//                             id="password"
//                             type="password" 
//                             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//                             placeholder="******"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-4 flex items-center justify-between">
//                         <label className="inline-flex items-center">
//                             <input type="checkbox" className="form-checkbox text-teal-600" />
//                             <span className="ml-2 text-gray-700">Remember me</span>
//                         </label>
//                         <a href="#" className="text-teal-600 hover:text-teal-700">
//                             Forgot password?
//                         </a>
//                     </div>
//                     <div className="mb-4">
//                         <button
//                             type="submit"
//                             className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors disabled:bg-teal-400"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? 'Logging in...' : 'Login'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForms = () => {
    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // Card flip state
    const [isFlipped, setIsFlipped] = useState(false);
    
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("jdnvn")
        if(user.name){
            if (user.role === "admin") {
                navigate('/admin-dashboard');
            } else {
                navigate('/employee-dashboard');
            }
        }
    }, [])

    // Login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://gg-wb8q.onrender.com/api/auth/login",
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);

                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                toast.success("Login successful!");

                setTimeout(() => {
                    if (response.data.user.role === "admin") {
                        navigate('/admin-dashboard');
                    } else {
                        navigate('/employee-dashboard');
                    }
                }, 1000);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
                toast.error(error.response.data.error);
            } else {
                setError("Server error. Please try again later.");
                toast.error("Server error. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Signup form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://gg-wb8q.onrender.com/api/auth/register",
                { name, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                // Show toast notification for successful registration
                toast.success("Registration successful! Please login with your credentials.");
                
                // Flip back to login form
                setIsFlipped(false);
                
                // Clear name field (keep email and password for convenience)
                setName('');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
                toast.error(error.response.data.error);
            } else {
                setError("Server error. Please try again later.");
                toast.error("Server error. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle between login and signup forms
    const toggleForm = (e) => {
        e.preventDefault(); // Prevent form validation
        setIsFlipped(!isFlipped);
        setError(null);
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center 
        bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
            {/* Toast Container */}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            <h2 className="font-pacific text-3xl text-white">
                Employee Management System
            </h2>
            
            {/* Flip card container */}
            <div className={`relative w-80 h-96 transition-transform duration-500`} style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
            }}>
                
                {/* Login Form - Front Side */}
                <div 
                    className={`absolute w-full h-full border shadow p-6 bg-white rounded-lg 
                    transition-all duration-500`} 
                    style={{
                        backfaceVisibility: "hidden",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        opacity: isFlipped ? "0" : "1",
                        zIndex: isFlipped ? "0" : "1"
                    }}
                >
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    {!isFlipped && error && (
                        <p className="text-red-500 bg-red-50 p-2 rounded mb-4 text-sm">
                            {error}
                        </p>
                    )}
                    <form>
                        <div className="mb-4">
                            <label htmlFor="login-email" className="block text-gray-700">Email</label>
                            <input 
                                id="login-email"
                                type="email" 
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="login-password" className="block text-gray-700">Password</label>
                            <input 
                                id="login-password"
                                type="password" 
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-teal-600" />
                                <span className="ml-2 text-gray-700">Remember me</span>
                            </label>
                            <a href="#" className="text-teal-600 hover:text-teal-700">
                                Forgot password?
                            </a>
                        </div>
                        <div className="mb-4">
                            <button
                                onClick={handleLogin}
                                className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors disabled:bg-teal-400"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <button 
                                type="button"
                                onClick={toggleForm} 
                                className="text-teal-600 hover:text-teal-700 font-semibold">
                                Sign up
                            </button>
                        </p>
                    </form>
                </div>

                {/* Signup Form - Back Side */}
                <div 
                    className={`absolute w-full h-110 border shadow p-6 bg-white rounded-lg
                    transition-all duration-500`}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
                        opacity: isFlipped ? "1" : "0",
                        zIndex: isFlipped ? "1" : "0"
                    }}
                >
                    <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                    {isFlipped && error && (
                        <p className="text-red-500 bg-red-50 p-2 rounded mb-4 text-sm">
                            {error}
                        </p>
                    )}
                    <form>
                        <div className="mb-4">
                            <label htmlFor="signup-name" className="block text-gray-700">Name</label>
                            <input 
                                id="signup-name"
                                type="text" 
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="signup-email" className="block text-gray-700">Email</label>
                            <input 
                                id="signup-email"
                                type="email" 
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="signup-password" className="block text-gray-700">Password</label>
                            <input 
                                id="signup-password"
                                type="password" 
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                onClick={handleSignup}
                                className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors disabled:bg-teal-400"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <button 
                                type="button"
                                onClick={toggleForm} 
                                className="text-teal-600 hover:text-teal-700 font-semibold">
                                Log in
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthForms;