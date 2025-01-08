import React from "react";
import {
  List,
  Create,
  SimpleForm,
  TextInput,
  required,
  useNotify,
  useRedirect,
  useListContext,
} from "react-admin";
import dataProvider from "../../providers/dataProvider";
import AdminsDelete from "../delete/AdminsDelete";

export const AdminList = (props) => {
  return (
    <List {...props} >
      <AdminListContent />
    </List>
  );
};

const AdminListContent = () => {
  const { data } = useListContext();

  return (
    <div>
      {/* Table Headers */}
      <div style={styles.tableHeaderRow}>
        <div style={styles.tableCellIndex}>#</div>
        <div style={styles.tableCell}>Username</div>
        <div style={styles.tableCell}>Full Name</div>
        <div style={styles.tableCell}>Actions</div>
      </div>

      {/* Table Rows */}
      <div>
        {data?.map((el, idx) => {
          return <AdminsDelete key={el.id} data={el} index={idx + 1}/>;
        })}
      </div>
    </div>
  );
};

const styles = {
  tableHeaderRow: {
    display: 'flex',
    padding: '12px 20px',
    borderBottom: '2px solid #1976d2', 
    backgroundColor: '#f5f5f5', 
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: '18px',
    color: '#333',
  },
  tableCell: {
    flex: 1,
    padding: '12px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#555', 
  },
  tableCellIndex: {
    marginLeft: '20px'
  }
};

const AdminCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (data, event) => {
    event.preventDefault();
    try {
      await dataProvider.create(data);
      notify("Admin created successfully!", { type: "success" });
      redirect("/admins");
    } catch (error) {
      console.error(
        "Error during admin creation:",
        error.response ? error.response.data : error.message,
      );
      const errorMessage =
        error.response?.data?.message || "Error creating admin!";
      notify(errorMessage, { type: "error" });
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label="Name" validate={required()} />
        <TextInput source="username" label="Username" validate={required()} />
        <TextInput
          source="password"
          label="Password"
          type="password"
          validate={required()}
        />
      </SimpleForm>
    </Create>
  );
};

export default AdminCreate;
