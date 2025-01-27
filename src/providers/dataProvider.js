import axios from "axios";

const apiUrl = "https://project-4-c2ho.onrender.com";
const token = localStorage.getItem("authToken");

const dataProvider = {
  // Get List of Admins section
  getList: async (resource, params) => {
    if (resource === 'admins') {
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
    }
  
    if (resource === 'doctors') {
      const { filter } = params;
      const searchKey = filter?.q || ''; 
      console.log("Filter query:", filter?.q);

    
      const url = searchKey
        ? `${apiUrl}/doctor-search/${searchKey}`
        : `${apiUrl}/doctors`; 
    
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const json = response.data;
        console.log("Response data:", json);

        if (!json.doctors || !Array.isArray(json.doctors)) {
          console.error("Expected an array but received:", json.doctors);
          return { data: [], total: 0 };
        }
    
        return {
          data: json.doctors.map((doctor) => ({ id: doctor._id, ...doctor })),
          total: json.doctors.length,
        };


      } catch (error) {
        console.error("GetList error:", error);
        return Promise.reject(new Error("Failed to fetch data."));
      }
    }
    
  
    return Promise.reject(new Error(`Resource '${resource}' is not supported by this dataProvider`));
  },
  

  getOne: (resource, params) => {
    const {id} = params;

    if (resource === 'doctors') {

      const url = `${apiUrl}/doctor/${id}`;

      return axios
        .get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          return {
            data: { id: response.data.doctor._id, ...response.data.doctor }, 
          };
        })
        .catch((error) => {
          if (error.response) {
            throw new Error(`Error fetching doctor: ${error.response.data.message || error.response.statusText}`);
          } else {
            throw new Error(`Error fetching doctor: ${error.message}`);
          }
        });
    }
  },

   // Create New Admin
  create: async (resource, params) => {
    if (resource === 'admins') {
      const { data } = params;

      if (!data.name || !data.username || !data.password || !data.gender || !data.email) {
        throw new Error("Required admin data (name, username, password, gender, email) is missing");
      }
      
      console.log("Sending admin data to backend:", data);

      // Example API call (adjust URL as per your backend setup)
      const response = await fetch(`${apiUrl}/admin-create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create admin');
      }

      const createdAdmin = await response.json();
      return { data: { ...data, id: createdAdmin.id } };
    }

    if (resource === 'doctors') {
      const { data } = params;

      
      if (!data.get('en_name') || !data.get('en_position') || !data.get('phoneNumber')) {
          throw new Error("Required doctor data (name, position, phoneNumber) is missing");
      }

      console.log("Sending doctor data to backend:", data);

      const response = await fetch(`${apiUrl}/doctor-create`, {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`,
          },
          body: data, 
      });

      if (!response.ok) {
          throw new Error('Failed to create doctor');
      }

      const createdDoctor = await response.json();
      return { data: { ...data, id: createdDoctor.id } };
  }

  throw new Error(`Unknown resource: ${resource}`);
  },

  // Delete Admin or Doctor
  delete: async (resource, params) => {
    const { id } = params;

    if (resource === 'admins' && id) {
      const url = `${apiUrl}/admin/${id}/delete`;

      try {
        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          return { data: {} };
        } else {
          return Promise.reject(new Error('Failed to delete admin.'));
        }
      } catch (error) {
        console.error('Error deleting admin:', error);
        return Promise.reject(new Error('Failed to delete admin.'));
      }
    }

    if (resource === 'doctors' && id) {
      const url = `${apiUrl}/doctor/${id}/delete`;

      try {
        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          return { data: {} };
        } else {
          return Promise.reject(new Error('Failed to delete doctor.'));
        }
      } catch (error) {
        console.error('Error deleting doctor:', error);
        return Promise.reject(new Error('Failed to delete doctor.'));
      }
    }
  },

  // Update Doctor
  update: async (resource, params) => {
    const { id } = params;
    const { en_name, 
            uz_name, 
            ru_name, 
            en_position, 
            uz_position, 
            ru_position,
            en_experience, 
            uz_experience, 
            ru_experience, 
            en_description, 
            uz_description, 
            ru_description, 
            en_category,
            uz_category, 
            ru_category,
            phoneNumber, 
            image, 
            username, 
            gender } = params.data;

    if (!en_name || 
        !uz_name || 
        !ru_name || 
        !en_position || 
        !uz_position || 
        !ru_position || 
        !phoneNumber || 
        !en_experience || 
        !uz_experience || 
        !ru_experience) {
      console.error("Required doctor data is missing");
      return Promise.reject(new Error("Required doctor data is missing"));
    }

    const url = `${apiUrl}/doctor/${id}/update`;

    try {
      const formData = new FormData();
      formData.append("en_name", en_name);
      formData.append("uz_name", uz_name);
      formData.append("ru_name", ru_name);
      formData.append("en_position", en_position);
      formData.append("uz_position", uz_position);
      formData.append("ru_position", ru_position);
      formData.append("en_description", en_description);
      formData.append("uz_description", uz_description);
      formData.append("ru_description", ru_description);
      formData.append("en_category", en_category);
      formData.append("uz_category", uz_category);
      formData.append("ru_category", ru_category);
      formData.append("en_experience", en_experience);
      formData.append("uz_experience", uz_experience);
      formData.append("ru_experience", ru_experience);
      formData.append("phoneNumber", phoneNumber);
      formData.append("username", username);
      formData.append("gender", gender);
      if (image) formData.append("image", image);

      const response = await axios.put(url, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        return { data: { ...params.data, id: id } };  
      } else {
        return Promise.reject(new Error("Failed to update doctor: unexpected status."));
      }
    } catch (error) {
      console.error("Update error:", error);
      return Promise.reject(new Error("Failed to update resource."));
    }
  },
};

export default dataProvider;
