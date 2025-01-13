import React, { useState, useEffect } from "react";
import { AppBar } from "react-admin";
import { Avatar, Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
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
        <div style={styles.avatarContainer}>
            <Avatar
                src={profilePicture}
                alt="Profile"
                onClick={handleAvatarClick}
            />
            {isLogoutVisible && (
                <Button style={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </Button>
            )}
        </div>
    );
};

const styles =  {
    avatarContainer: {
        position: 'relative',
        display: 'inline-block', 
    },
    
    logoutButton: {
        background: '#fff',
        position: 'absolute',
        bottom: '-40px', 
        left: '30%',
        transform: 'translateX(-50%)',
        marginTop: '8px',
    }
    
}

const CustomAppBar = (props) => (
    <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar;
