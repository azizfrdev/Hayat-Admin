const authProvider = {
    login: async (username, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `${localStorage.getItem('authToken')}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response Data:', data);

                if (!data.error) {
                    // Store the authentication token in localStorage or cookies
                    localStorage.setItem('authToken', data.token);

                    // Resolve the promise (React-Admin will redirect the user)
                    return Promise.resolve();
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
    logout: () => {
        localStorage.removeItem('authToken');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('authToken')
            ? Promise.resolve()
            : Promise.reject({ redirectTo: '/login' });
    },
    checkError: (error) => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
