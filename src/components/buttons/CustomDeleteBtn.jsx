import React from 'react';
import { Button, useNotify, useRefresh } from 'react-admin';
import dataProvider from '../../dataProvider'; 

const CustomDeleteButton = ({ id }) => {
  const notify = useNotify();
  const refresh = useRefresh();

  const handleDelete = async () => {
    if (!id) {
      notify('Error: No admin ID found', { type: 'error' });
      return;
    }

    try {
      // Send the DELETE request using the correct method
      await dataProvider.delete('admins', { id });  // Send id directly (not in array)
      notify('Admin deleted successfully!', { type: 'success' });
      refresh(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting admin:', error);
      notify('Error deleting admin!', { type: 'error' });
    }
  };

  return (
    <Button label="Delete" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default CustomDeleteButton;
