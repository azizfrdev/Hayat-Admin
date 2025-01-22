import React, { useState } from 'react';
import { Button, useNotify, useRefresh } from 'react-admin';
import dataProvider from '../../providers/dataProvider';
import ConfirmationModal from './Confirm';
import { helix } from 'ldrs';

helix.register()

const CustomDeleteButton = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const notify = useNotify();
  const refresh = useRefresh();

  const handleDelete = async () => {
    if (!id) {
      notify('Error: No admin ID found', { type: 'error' });
      return;
    }

    setIsLoading(true); // Show loader

    try {
      await dataProvider.delete('admins', { id });
      notify('Admin deleted successfully!', { type: 'success' });
      refresh(); 
    } catch (error) {
      console.error('Error deleting admin:', error);
      notify('Error deleting admin!', { type: 'error' });
    } finally {
      setIsLoading(false); // Hide loader after the operation is complete
      setIsModalOpen(false); // Close the modal after deletion
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)} 
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </Button>
      
      {isLoading && (
        <div style={loaderOverlay}>
          <l-helix size="50" speed="2.5" color="#d32f2f"></l-helix>
        </div>
      )}

      <ConfirmationModal 
        message="Do you want to delete it?" 
        isOpen={isModalOpen} 
        onConfirm={handleDelete} 
        onCancel={() => setIsModalOpen(false)} 
      />
    </>
  );
};

const loaderOverlay =  {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

export default CustomDeleteButton;
