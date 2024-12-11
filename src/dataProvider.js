import axios from "axios";

const apiUrl = "http://localhost:3000/api";
const token = localStorage.getItem("authToken");

const dataProvider = {
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

  // 📘 **Create New Admin**
  create: async (data) => {

    console.log("Received params:", data); // {name,username,password}

    const { name, username, password } = data;
  
    if (!name || !username || !password) {
      console.error("Required admin data (name, username, password) is missing");
      return Promise.reject(new Error("Required admin data is missing"));
    }

    const token = localStorage.getItem("authToken");
    const url1 = `${apiUrl}/admin-create`;
  
    console.log('Admin data being sent:', { name, username, password });
  
    try {
      const response = await axios.post(url1, { 
        name, 
        username, 
        password 
      }, { 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Response data:', response.data);
  
      if (response.data && response.data.id) {
        return { data: { ...params, id: response.data.id } };
      } else {
        return Promise.reject(new Error("Failed to create admin."));
      }
    } catch (error) {
      console.error("Create error:", error);
      return Promise.reject(new Error("Failed to create resource."));
    }
  }  
};

export default dataProvider;
