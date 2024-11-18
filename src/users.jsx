import { useMediaQuery } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";
import MyUrlField from "./MyUrlField";

export const UserList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid>
                    <TextField source="code" />
                    <TextField source="name" />
                    <EmailField source="email" />
                    <MyUrlField source="website" />
                    <TextField source="phone" />
                </Datagrid>
            )}
        </List>
    );
};
