import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:3000/api";
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  // GET 
  getList: () => {
    const token = localStorage.getItem('authToken'); 
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const url = `${apiUrl}/admins`; 

    return httpClient(url, { headers })
      .then(({ json }) => {
        if (!json.admins || json.admins.length === 0) {
          return { data: [], total: 0 }; 
        }
        return {
          data: json.admins.map((admin) => ({ id: admin._id, ...admin })),
          total: json.total || json.admins.length,
        };
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        return Promise.reject(new Error('Failed to fetch data.'));
      });
  },

  // Create admin
  create: (params) => {
    const token = localStorage.getItem('authToken'); 
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const url = `${apiUrl}/admin-create`;
  
    return httpClient(url, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(params.data),
    })
      .then(({ json }) => {
        if (json && json.id) {
          return { data: { ...params.data, id: json.id } }; 
        } else {
          return Promise.reject(new Error("Failed to create admin.")); 
        }
      })
      .catch((error) => {
        console.error("Create error:", error);
        return Promise.reject(new Error("Failed to create resource.")); 
      });
  },
  
};

export default dataProvider;
