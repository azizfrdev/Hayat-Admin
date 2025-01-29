import React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, FileInput, FileField, SelectInput } from 'react-admin';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNotify, useRedirect } from 'react-admin';  
import dataProvider from '../../../providers/dataProvider';

const StaffCreate = () => {
  const notify = useNotify(); 
  const redirect = useRedirect();  

  const handleSubmit = async (data, event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    // Handle image
    if (data.image && data.image.rawFile) {
        formData.set('image', data.image.rawFile);
    }

    try {
        await dataProvider.create('staff', { data: formData });

        notify("Staff created successfully!", { type: "success" });
        redirect("/staff");
    } catch (error) {
        console.error("Error during staff creation:", error);
        const errorMessage = error.response?.data?.message || "Error creating staff!";
        notify(errorMessage, { type: "error" });
    }
};


  return (
    <Create>
      <SimpleForm onSubmit={handleSubmit}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">English Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextInput source="en_name" label="Name (English)" fullWidth required />
            <TextInput source="en_position" label="Position (English)" fullWidth required />
            <TextInput source="en_description" label="Description (English)" fullWidth required />
          </AccordionDetails>
        </Accordion>

        {/* Uzbek Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Uzbek Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextInput source="uz_name" label="Name (Uzbek)" fullWidth required />
            <TextInput source="uz_position" label="Position (Uzbek)" fullWidth required />
            <TextInput source="uz_description" label="Description (Uzbek)" fullWidth required />
          </AccordionDetails>
        </Accordion>

        {/* Russian Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Russian Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextInput source="ru_name" label="Name (Russian)" fullWidth required />
            <TextInput source="ru_position" label="Position (Russian)" fullWidth required />
            <TextInput source="ru_description" label="Description (Russian)" fullWidth required />
          </AccordionDetails>
        </Accordion>

        {/* Common Fields */}
        <Typography variant="h6" gutterBottom>
          Common Details
        </Typography>
        <PasswordInput source="password" label="Password" fullWidth required />
        <TextInput source="username" label="Username" fullWidth required />
        <SelectInput
          source="gender"
          label="Gender"
          choices={[
            { id: 'male', name: 'Male' },
            { id: 'female', name: 'Female' },
          ]}
          fullWidth
          required
        />
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

        {/* Image Upload */}
        <FileInput source="image" label="Upload Image" accept="image/*">
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};

export default StaffCreate;
