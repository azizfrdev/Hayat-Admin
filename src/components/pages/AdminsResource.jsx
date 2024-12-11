import React from "react";
import { List, Datagrid, TextField, Create, SimpleForm, TextInput, required } from 'react-admin';
import dataProvider from "../../dataProvider";

export const AdminList = () => (
    <List>
        <Datagrid>
            <TextField source="username" label="Username" />
            <TextField source="name" label="Name" />
        </Datagrid>
    </List>
);

const handleSubmit = (data) => {
    dataProvider.create(data)
};

export const AdminCreate = (props) => (
    <Create {...props}>
        <SimpleForm onSubmit={handleSubmit}>
            <TextInput source="name" label="Name" validate={required()} />
            <TextInput source="username" label="Username" validate={required()} />
            <TextInput source="password" label="Password" type="password" validate={required()} />
        </SimpleForm>
    </Create>
);
