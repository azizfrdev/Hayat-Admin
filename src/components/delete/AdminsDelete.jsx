import React from 'react';
import CustomDeleteButton from '../buttons/CustomDeleteBtn';

const AdminsDelete = ({ data, index }) => {
  const { username, id, name } = data;

  return (
    <div
      style={styles.tableRow}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
    >
      <div style={styles.tableCellIndex}>{index})</div>
      <div style={styles.tableCell}>{username}</div>
      <div style={styles.tableCell}>{name}</div>
      <div style={styles.tableCell}>
        <CustomDeleteButton id={id} />
      </div>
    </div>
  );
};

const styles = {
  tableCellIndex: {
    width: '50px', 
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1976d2',
  },
  tableRow: {
    display: 'flex',
    padding: '12px 20px',
    borderBottom: '1px solid #e0e0e0', 
    alignItems: 'center',
    transition: 'background-color 0.3s', 
  },
  tableRowHover: {
    backgroundColor: '#d8e8f0',
  },
  tableCell: {
    flex: 1, 
    padding: '10px',
    textAlign: 'center',  
    fontSize: '16px',
  },
};

export default AdminsDelete;