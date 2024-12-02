import React from "react";
import { List, Datagrid, TextField, Create, SimpleForm, TextInput, required } from 'react-admin';

export const AdminList = () => (
    <List>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="username" label="Username" />
            <TextField source="name" label="Name" />
        </Datagrid>
    </List>
);

export const AdminCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Name" validate={required()} />
            <TextInput source="username" label="Username" validate={required()} />
            <TextInput source="password" label="Password" validate={required()} />
        </SimpleForm>
    </Create>
);
