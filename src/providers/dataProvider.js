import axios from "axios";

const apiUrl = "http://localhost:3000/api";
const token = localStorage.getItem("authToken");

const dataProvider = {
  // Admins displayed to UI
  getList: async () => {
    const url = `${apiUrl}/admins`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const json = response.data;
      if (!json.admins || json.admins.length === 0) {
        return { data: [], total: 0 };
      }
      return {
        data: json.admins.map((admin) => ({ id: admin._id, ...admin })),
        total: json.total || json.admins.length,
      };
    } catch (error) {
      console.error("GetList error:", error);
      return Promise.reject(new Error("Failed to fetch data."));
    }
  },

  // Create New Admin
  create: async (data) => {
    const { name, username, password, gender } = data;
  
    if (!name || !username || !password || !gender) {
      console.error("Required admin data (name, username, password, gender) is missing");
      return Promise.reject(new Error("Required admin data is missing"));
    }
    
    const token = localStorage.getItem("authToken");
    const url1 = `${apiUrl}/admin-create`;

  
    try {
      const response = await axios.post(url1, { 
        name, 
        username, 
        password, 
        gender
      }, { 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Response data:', response.data);
  
      if ((response.status === 200 || response.status === 201) && response.data) {
        // Check for admin ID from multiple possible locations
        const adminId = response.data.id || response.data._id || response.data.admin?.id || response.data.admin?._id;
        if (adminId) {
          return { data: { ...data, id: adminId } };
        } else {
          return Promise.reject(new Error("Failed to create admin: missing ID in response."));
        }
      } else {
        return Promise.reject(new Error("Failed to create admin: unexpected status."));
      }
    } catch (error) {
      console.error("Create error:", error);
      return Promise.reject(new Error("Failed to create resource."));
    }
  },

  // Delete Admins
  delete: async (resource, params) => { 
    const { id } = params;  
  
    if (resource === 'admins' && id) {
      const url = `${apiUrl}/admin/${id}/delete`;  // Construct the URL with the admin ID to delete
  
      try {
        const token = localStorage.getItem("authToken");  // Get the token from localStorage
  
        // Send DELETE request to backend
        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${token}`,  // Attach the token in the headers
          },
        });
  
        if (response.status === 200) {
          return { data: {} };  // Return an empty object since the admin was deleted
        } else {
          return Promise.reject(new Error('Failed to delete admin.'));
        }
      } catch (error) {
        console.error('Error deleting admin:', error);
        return Promise.reject(new Error('Failed to delete admin.'));
      }
    }
  },
};

export default dataProvider;
