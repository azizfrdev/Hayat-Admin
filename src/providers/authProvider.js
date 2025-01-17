import axios from "axios";

const authProvider = {
    login: async (username, password) => {
        try {
            const response = await axios.post(
                "https://project-4-c2ho.onrender.com/login",
                { username, password },
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            const token = response.data.token; 
            localStorage.setItem("authToken", token);
            return Promise.resolve();
        } catch (error) {
            console.error("Login error:", error);
            return Promise.reject(new Error("Login failed"));
        }
    },

    // 📘 **Logout**
    logout: async () => {
        localStorage.removeItem("authToken");
        localStorage.clear();
        return Promise.resolve();
    },

    getUserData: () => {
        const user = JSON.parse(localStorage.getItem('gender')); 
        return user;
    },

    checkAuth: () => {
        const token = localStorage.getItem("authToken");
        return token ? Promise.resolve() : Promise.reject(new Error("Not authenticated"));
    },

    // 📘 **Check Errors**
    checkError: (error) => {
        const status = error.status || error.response?.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("authToken");
            return Promise.reject();
        }
        return Promise.resolve();
    },
};

export default authProvider;
