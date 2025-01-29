import React, { useState } from "react";
import axios from "axios";
import { Datagrid, ImageField, List, SearchInput, TextField, FunctionField, useNotify, EditButton } from "react-admin";

const StaffFilters = [
  <SearchInput source="q" alwaysOn placeholder="Search (Name, Position)" />
];

const DeleteButton = ({ id, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const notify = useNotify();
  const apiUrl = "https://project-4-c2ho.onrender.com";
  const token = localStorage.getItem("authToken");

  const handleDelete = async () => {
    if (id) {
      setLoading(true);
      const url = `${apiUrl}/staff/${id}/delete`;

      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          onDelete(); 
          notify("Doctor deleted successfully!", { type: "success" });
        } else {
          console.error("Failed to delete Staff");
        }
      } catch (error) {
        console.error("Error deleting Staff:", error);
      } finally {
        setLoading(false);
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} disabled={loading} style={{
        backgroundColor: "rgba(0,0,255,0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "5px",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer"
      }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
            <l-helix size="50" stroke="4" color="#8b0000"></l-helix>
          </div>
        ) : (
          "Delete"
        )}
      </button>
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(9, 18, 82, 0.5)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: "999",
        }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
            <p style={{ color: "rgba(9, 18, 82, 0.5)",fontSize: 18,}}>Are you sure you want to delete it?</p>
            <button onClick={handleDelete} style={{ marginRight: "10px", padding: "8px 12px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Yes
            </button>
            <button onClick={() => setShowModal(false)} style={{ padding: "8px 12px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const StaffList = (props) => {
  return (
    <List {...props} filters={StaffFilters}>
      <Datagrid>
        <TextField source="en_name" label="Staff's Name" />
        <TextField source="en_position" label="Position" />
        <ImageField source="image" title="title" />
        <EditButton />
        <FunctionField label="Actions" render={(record) => <DeleteButton id={record.id} onDelete={() => window.location.reload()} />} />
      </Datagrid>
    </List>
  );
};

export default StaffList;
