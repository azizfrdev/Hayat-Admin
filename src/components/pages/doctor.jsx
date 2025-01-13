import { List, Datagrid, TextField, ReferenceField, EditButton, Edit, SimpleForm, ReferenceInput, TextInput, Create } from "react-admin";

export const DoctorList = () => (
    <List>
        <Datagrid rowClick={false}>
          <TextField source="id" />
            <ReferenceField source="userId" reference="users" link="show"/>
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);