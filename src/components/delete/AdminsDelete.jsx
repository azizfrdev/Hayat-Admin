import React from 'react';
import CustomDeleteButton from '../buttons/CustomDeleteBtn';

const AdminsDelete = ({data}) => {
  console.log(data);

  const {username, id,name} = data

  console.log(name);

  return (
    <div style={styles.tableRow}>
      <div style={styles.tableCell}>{username}</div>
      <div style={styles.tableCell}>{name}</div>
      <div style={styles.tableCell}>
        <CustomDeleteButton id={id} />
      </div>
    </div>
  );
};

const styles = {
  tableRow: {
    display: 'flex',
    padding: '10px 20px',
    borderBottom: '1px solid #ccc',  
    alignItems: 'center',
  },
  tableCell: {
    flex: 1, 
    padding: '10px',
    textAlign: 'center',  
    fontSize: '16px',
  },
};

export default AdminsDelete;