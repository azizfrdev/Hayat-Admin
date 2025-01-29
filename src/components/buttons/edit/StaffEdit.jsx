import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  FileInput,
  FileField,
  required,
  SelectInput,
} from 'react-admin';

const StaffEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="en_name" label="Staff's Name (English)" validate={required()} />
        <TextInput source="uz_name" label="Staff's Name (Uzbek)" validate={required()} />
        <TextInput source="ru_name" label="Staff's Name (Russian)" validate={required()} />
        
        <TextInput source="en_position" label="Position (English)" validate={required()} />
        <TextInput source="uz_position" label="Position (Uzbek)" validate={required()} />
        <TextInput source="ru_position" label="Position (Russian)" validate={required()} />

        <TextInput source="en_description" label="Description (English)" validate={required()} />
        <TextInput source="uz_description" label="Description (Uzbek)" validate={required()} />
        <TextInput source="ru_description" label="Description (Russian)" fullWidth validate={required()} />

        <TextInput source="username" label="Username" validate={required()} fullWidth />

        <SelectInput
          source="role"
          label="Role"
          choices={[
            { id: 'staff', name: 'Staff' },
            { id: 'registrator', name: 'Registrator' },
          ]}
          fullWidth
          required
        />
        
        <SelectInput
          source="gender"
          label="Gender"
          choices={[
            { id: 'male', name: 'Male' },
            { id: 'female', name: 'Female' },
          ]}
          validate={required()}
          fullWidth
        />

        <FileInput source="image" label="Upload Image" accept="image/*">
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Edit>
  );
};

export default StaffEdit;
