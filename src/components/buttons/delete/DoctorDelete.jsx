import React, {useState} from 'react';
import { useNotify, useRefresh, useRecordContext } from 'react-admin';
import { Button } from '@mui/material';
import dataProvider from '../../../providers/dataProvider';
import { helix } from 'ldrs';

helix.register();

const CustomDeleteButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleDelete = async (event) => {
    event.preventDefault();
    setIsLoading(true); 

    if (!record?.id) {
      notify('No ID found for deletion.', { type: 'warning' });
      return;
    }

    try {
      console.log('Delete button clicked, ID:', record.id);
      await dataProvider.delete('doctors', { id: record.id });
      notify('Doctor deleted successfully!', { type: 'success' });
      refresh();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      notify('Error deleting doctor!', { type: 'error' });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Button
      onClick={handleDelete}
      color="secondary"
      variant="contained"
    >
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', zIndex: 1000,  }}>
          <l-helix size="50" stroke="4" color="#8b0000"></l-helix>
        </div>
      )}
      Delete
    </Button>
  );
};

export default CustomDeleteButton;
