import React, {useState} from 'react';
import { Button, useNotify, useRefresh } from 'react-admin';
import dataProvider from '../../providers/dataProvider'; 
import ConfirmationModal from './Confirm';

const CustomDeleteButton = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const handleDelete = async () => {
    if (!id) {
      notify('Error: No admin ID found', { type: 'error' });
      return;
    }

    try {
      await dataProvider.delete('admins', { id });
      notify('Admin deleted successfully!', { type: 'success' });
      refresh(); 
    } catch (error) {
      console.error('Error deleting admin:', error);
      notify('Error deleting admin!', { type: 'error' });
    }
  };

  return (
    <>
    <Button label="Delete" onClick={() => setIsModalOpen(true)}></Button>
    <ConfirmationModal 
        message="Do you want to delete it?" 
        isOpen={isModalOpen} 
        onConfirm={handleDelete} 
        onCancel={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default CustomDeleteButton;
