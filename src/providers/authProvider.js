import axios from "axios";

const authProvider = {
    login: async (username, password) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/login",
                { username, password },
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            const token = response.data.token; 
            localStorage.setItem("authToken", token);
            console.log("Token saved:", token);
            return Promise.resolve();
        } catch (error) {
            console.error("Login error:", error);
            return Promise.reject(new Error("Login failed"));
        }
    },

    // 📘 **Logout**
    logout: async () => {
        const token = localStorage.getItem('authtoken')
        localStorage.removeItem(token);
        localStorage.clear()
    },

    getUserData: () => {
        const user = JSON.parse(localStorage.getItem('gender')); 
        return user;
    },

    // 📘 **Check Authentication**
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
};

export default authProvider;
