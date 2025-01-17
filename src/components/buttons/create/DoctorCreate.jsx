import React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, FileInput, FileField } from 'react-admin';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNotify, useRedirect } from 'react-admin';  
import dataProvider from '../../../providers/dataProvider';

const DoctorCreate = () => {
  const notify = useNotify(); 
  const redirect = useRedirect();  

  const handleSubmit = async (data, event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('en_name', data.en_name);
    formData.append('en_experience', data.en_experience);
    formData.append('en_position', data.en_position);
    formData.append('en_category', data.en_category);
    formData.append('en_description', data.en_description);

    formData.append('uz_name', data.uz_name);
    formData.append('uz_experience', data.uz_experience);
    formData.append('uz_position', data.uz_position);
    formData.append('uz_category', data.uz_category);
    formData.append('uz_description', data.uz_description);

    formData.append('ru_name', data.ru_name);
    formData.append('ru_experience', data.ru_experience);
    formData.append('ru_position', data.ru_position);
    formData.append('ru_category', data.ru_category);
    formData.append('ru_description', data.ru_description);

    formData.append('password', data.password);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('username', data.username);

    // Append image if present`
    if (data.image && data.image.rawFile) {
      formData.append('image', data.image.rawFile);
    }

    try {
      await dataProvider.create('doctors', { data: formData });

      notify("Doctor created successfully!", { type: "success" });
      redirect("/doctors");
    } catch (error) {
      console.error("Error during doctor creation:", error);
      const errorMessage = error.response?.data?.message || "Error creating doctor!";
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
            <TextInput source="en_experience" label="Experience (English)" fullWidth required />
            <TextInput source="en_position" label="Position (English)" fullWidth required />
            <TextInput source="en_category" label="Category (English)" fullWidth required />
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
            <TextInput source="uz_experience" label="Experience (Uzbek)" fullWidth required />
            <TextInput source="uz_position" label="Position (Uzbek)" fullWidth required />
            <TextInput source="uz_category" label="Category (Uzbek)" fullWidth required />
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
            <TextInput source="ru_experience" label="Experience (Russian)" fullWidth required />
            <TextInput source="ru_position" label="Position (Russian)" fullWidth required />
            <TextInput source="ru_category" label="Category (Russian)" fullWidth required />
            <TextInput source="ru_description" label="Description (Russian)" fullWidth required />
          </AccordionDetails>
        </Accordion>

        {/* Common Fields */}
        <Typography variant="h6" gutterBottom>
          Common Details
        </Typography>
        <PasswordInput source="password" label="Password" fullWidth required />
        <TextInput source="phoneNumber" label="Phone Number" fullWidth required />
        <TextInput source="username" label="Username" fullWidth required />

        {/* Image Upload */}
        <FileInput source="image" label="Upload Image" accept="image/*">
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};

export default DoctorCreate;
