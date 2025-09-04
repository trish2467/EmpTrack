import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get("https://gg-wb8q.onrender.com/api/auth/verify", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.success) {
                        console.log("User verified successfully");
                        setUser(response.data.user);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {loading ? <div>Loading...</div> : children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
export default AuthContext;
