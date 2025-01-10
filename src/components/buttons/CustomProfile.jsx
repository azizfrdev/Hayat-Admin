import React, { useState, useEffect } from "react";
import { AppBar } from "react-admin";
import { Avatar, Button } from "@mui/material";
import authProvider from "../../providers/authProvider";
import { Navigate } from "react-router-dom";

const CustomUserMenu = () => {
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        const gender = localStorage.getItem("gender");
        console.log(gender);

        if (gender) {
            const genderImage =
                gender === "male"
                    ? "https://axhokgpxtritakejsqch.supabase.co/storage/v1/object/public/Images/genderImage/male.png"
                    : "https://axhokgpxtritakejsqch.supabase.co/storage/v1/object/public/Images/genderImage/female.png";
            
            setProfilePicture(genderImage);
        }
    }, []); 

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
                src={profilePicture} 
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
