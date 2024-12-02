// dataProvider.js
import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:3000/api';
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
    // GET request to fetch resources (e.g., admins)
    getList: () => {
        const url = `${apiUrl}/admins`; // Use apiUrl to ensure full UR
        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Fetch error:', error);
                return Promise.reject(new Error('Failed to fetch data.'));
            });
    },

    // POST request to create a new resource (e.g., admin)
    create: (params) => {
        const url = `${apiUrl}/admin-create`; // Adjust this if dynamic endpoints are needed
        return httpClient(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                Authorization: `${localStorage.getItem('authToken')}`, 
            },
            body: JSON.stringify(params.data),
        })
            .then(({ json }) => ({
                data: { ...params.data, id: json.id}, // Include ID for the new resource
            }))
            .catch(error => {
                console.error('Create error:', error);
                return Promise.reject(new Error('Failed to create resource.'));
            });
    },
};

export default dataProvider;
