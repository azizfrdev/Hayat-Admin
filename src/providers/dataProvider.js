import axios from "axios";

const apiUrl = "https://project-4-c2ho.onrender.com";
const token = localStorage.getItem("authToken");

const dataProvider = {
  // Get List of Admins
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

    // If the resource is not 'admins', process it using the generic doctor list endpoint
    const url = `${apiUrl}/doctors`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const json = response.data;
      if (!json.doctors || json.doctors.length === 0) {
        return { data: [], total: 0 };
      }
      return {
        data: json.doctors.map((doctor) => ({ id: doctor._id, ...doctor })),
        total: json.total || json.doctors.length,
      };
    } catch (error) {
      console.error("GetList error:", error);
      return Promise.reject(new Error("Failed to fetch data."));
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

      if (!data.en_name || !data.en_position || !data.phoneNumber) {
        throw new Error("Required doctor data (name, position, phoneNumber) is missing");
      }

      console.log("Sending doctor data to backend:", data);

      const response = await fetch(`${apiUrl}/doctor-create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

    // Handle deletion for other resources (doctors)
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
    const { en_name, uz_name, ru_name, en_position, uz_position, ru_position, phoneNumber, en_experience, uz_experience, ru_experience, image } = params.data;

    if (!en_name || !uz_name || !ru_name || !en_position || !uz_position || !ru_position || !phoneNumber || !en_experience || !uz_experience || !ru_experience) {
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
      formData.append("phoneNumber", phoneNumber);
      formData.append("en_experience", en_experience);
      formData.append("uz_experience", uz_experience);
      formData.append("ru_experience", ru_experience);
      if (image) formData.append("image", image);

      const response = await axios.put(url, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        const doctorId = response.data.id || response.data._id || response.data.doctor?.id || response.data.doctor?._id;
        if (doctorId) {
          return { data: { ...params.data, id: doctorId } };
        } else {
          return Promise.reject(new Error("Failed to update doctor: missing ID in response."));
        }
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
