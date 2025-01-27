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

const DoctorEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="en_name" label="Doctor's Name (English)" validate={required()} />
        <TextInput source="uz_name" label="Doctor's Name (Uzbek)" validate={required()} />
        <TextInput source="ru_name" label="Doctor's Name (Russian)" validate={required()} />
        
        <TextInput source="en_position" label="Position (English)" validate={required()} />
        <TextInput source="uz_position" label="Position (Uzbek)" validate={required()} />
        <TextInput source="ru_position" label="Position (Russian)" validate={required()} />

        <TextInput source="en_description" label="Description (English)" validate={required()} />
        <TextInput source="uz_description" label="Description (Uzbek)" validate={required()} />
        <TextInput source="ru_description" label="Description (Russian)" fullWidth validate={required()} />
        
        <TextInput source="en_category" label="Category (English)" validate={required()} />
        <TextInput source="uz_category" label="Category (Uzbek)" validate={required()} />
        <TextInput source="ru_category" label="Category (Russian)" fullWidth validate={required()} />

        <TextInput source="en_experience" label="Experience (English)" validate={required()} />
        <TextInput source="uz_experience" label="Experience (Uzbek)" validate={required()} />
        <TextInput source="ru_experience" label="Experience (Russian)" validate={required()} />

        <TextInput source="phoneNumber" label="Phone Number" validate={required()} fullWidth />
        <TextInput source="username" label="Username" validate={required()} fullWidth />
        
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

export default DoctorEdit;
