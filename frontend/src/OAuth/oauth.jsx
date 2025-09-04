import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const CLIENT_ID = "173852556484-3c302oeh2nqs108mqhn936f8sn5m6fs7.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

const OAuth = ({ role = "employee" }) => {
  const { login } = useAuth();
  const [user, setUser] = useState(null);
  const [tokenClient, setTokenClient] = useState(null);
  const navigate = useNavigate();

  const onGoogleClientLoad = async () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: async (response) => {
        const accessToken = response.access_token;
        const userDetails = await fetchUserDetails(accessToken);
        setUser({ ...userDetails, accessToken });
        await callBackend(role, userDetails, accessToken);
      },
    });

    setTokenClient(client);
  };

  useEffect(() => {
    const initializeGoogleClient = () => {
      // Remove existing script if present
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = onGoogleClientLoad;
      document.head.appendChild(script);

      return () => {
        const scriptToRemove = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    };

    initializeGoogleClient();
  }, [role]);

  const fetchUserDetails = async (token) => {
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      return null;
    }
  };

  const callBackend = async (role, userDetails, accessToken) => {
    try {
      const response = await fetch("https://gg-wb8q.onrender.com/api/auth/loginwithgoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails.email,
          name: userDetails.name,
          role: role,
          googleAccessToken: accessToken
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        
        // Update auth context
        login(data.user);
        
        alert("Google login successful!");
        
        // Navigate based on role
        if (data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      } else {
        alert(data.error || "Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error calling backend:", error);
      alert("An error occurred during Google login. Please try again.");
    }
  };

  const handleGoogleClick = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken();
    } else {
      alert("Google client not initialized. Please refresh the page and try again.");
    }
  };

  return (
    <button 
      onClick={handleGoogleClick} 
      type='button' 
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full mt-4'
    >
      Continue With Google
    </button>
  );
};

export default OAuth;