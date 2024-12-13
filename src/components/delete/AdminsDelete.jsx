import React from 'react';
import CustomDeleteButton from '../buttons/CustomDeleteBtn';

const AdminsDelete = ({ id, username, name }) => {
  return (
    <div style={{ display: 'flex', padding: 30 }}>
      <div>{id}</div>
      <div>{username}</div>
      <div>{name}</div>
      <CustomDeleteButton id={id} />
    </div>
  );
};

export default AdminsDelete