import React, { useState, useEffect } from "react";
import { AppBar } from "react-admin";
import { Avatar, Button } from "@mui/material";
import jwtDecode from "jwt-decode"; 
import authProvider from "../../providers/authProvider";
import { Navigate } from "react-router-dom";

const CustomUserMenu = () => {
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                
                const userGender = decodedToken?.gender; 

                if (userGender) {
                    setProfilePicture(getProfilePicture(userGender));
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const getProfilePicture = (gender) => {
        return gender === "male"
            ? "https://axhokgpxtritakejsqch.supabase.co/storage/v1/object/public/Images/genderImage/male.png"
            : "https://axhokgpxtritakejsqch.supabase.co/storage/v1/object/public/Images/genderImage/female.png";
    };

    const handleAvatarClick = () => {
        setIsLogoutVisible(!isLogoutVisible);
    };

    const handleLogout = async () => {
        await authProvider.logout();
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Avatar
                src={profilePicture || "default_image_url_here"} // Fallback image if profilePicture is not set
                alt="Profile"
                onClick={handleAvatarClick}
            />
            {isLogoutVisible && (
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            )}
        </>
    );
};

const CustomAppBar = (props) => (
    <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar;
