import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  ImageField,
} from 'react-admin';

const DoctorShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        {/* Doctor's Name, Position, and Experience*/}
        <TextField source="en_name" label="Name" />
        
        <TextField source="en_position" label="Position" />
        
        <TextField source="en_experience" label="Experience" />
        
        <TextField source="phoneNumber" label="Phone Number" />
        
        <ImageField source="image" label="Image" />
        
        <TextField source="age" label="Age" />

      </SimpleShowLayout>
    </Show>
  );
};

export default DoctorShow;
