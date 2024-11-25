import { useMediaQuery } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, Edit, SearchInput } from "react-admin";

export const UserList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={[<SearchInput source="q" alwaysOn />]}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.age}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick={Edit}>
                    <TextField source="name" />
                    <TextField source="age" />
                    <EmailField source="email" />
                </Datagrid>
            )}
        </List>
    );
};
