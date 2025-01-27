import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  SearchInput,
} from 'react-admin';
import CustomDeleteButton from '../buttons/delete/DoctorDelete';

const DoctorFilters = [<SearchInput source="q" alwaysOn placeholder="Search (Name, Position)" />];

const DoctorList = (props) => {
  return (
    <List {...props} filters={DoctorFilters}>
      <Datagrid>
        <TextField source="en_name" label="Doctor's Name" />
        <TextField source="en_position" label="Position" />
        <TextField source="phoneNumber" label="Phone Number" />
        <EditButton />
        <CustomDeleteButton />
      </Datagrid>
    </List>
  );
};

export default DoctorList;
