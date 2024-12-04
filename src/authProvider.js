const authProvider = {
    // Login
    login: async (username, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                credentials: 'include', // Send cookies with the request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response Data:', data);

                if (!data.error) {
                    return Promise.resolve(); // muvaffaqiyatli
                } else {
                    return Promise.reject(new Error(data.error));
                }
            } else {
                return Promise.reject(new Error('Login failed!'));
            }
        } catch (error) {
            console.error('Error details:', error);
            return Promise.reject(error);
        }
    },
    // Logout
    logout: () => {
        return fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: 'include',
        }).then(() => {
            return Promise.resolve();
        });
    },
    // Authorni tekshirish
    checkAuth: () => {
        return fetch('http://localhost:3000/api/check-auth', {
            method: 'GET',
            credentials: 'include', 
        }).then((response) => {
            if (response.ok) {
                return Promise.resolve();
            } else {
                return Promise.reject({ redirectTo: '/login' });
            }
        }).catch((error) => {
            console.error('CheckAuth error:', error);
            return Promise.reject({ redirectTo: '/login' });
        });
    },
    
    checkError: (error) => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
