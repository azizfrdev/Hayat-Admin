import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

const DoctorList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="en_name" label="Doctor's Name" />
        
        <TextField source="en_position" label="Position" />
        
        <TextField source="phoneNumber" label="Phone Number" />
        
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default DoctorList;
