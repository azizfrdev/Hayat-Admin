import React from 'react';
import { Show, SimpleShowLayout, TextField, ImageField } from 'react-admin';

const DoctorShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField 
          source="en_name" 
          label="Name" 
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        />
        <TextField 
          source="en_position" 
          label="Position" 
          sx={{ fontWeight: 600 }} 
        />
        <TextField 
          source="en_experience" 
          label="Experience" 
          sx={{ fontWeight: 600 }}
        />
        <TextField 
          source="phoneNumber" 
          label="Phone Number" 
          sx={{ fontWeight: 600 }}
        />
        <ImageField 
          source="image" 
          label="Image" 
          sx={{ borderRadius: '8px', maxWidth: '200px', mt: 2 }}
        />
        <TextField 
          source="age" 
          label="Age" 
          sx={{ fontWeight: 600 }}
        />
      </SimpleShowLayout>
    </Show>
  );
};

export default DoctorShow;
