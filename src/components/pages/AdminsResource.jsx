import React from "react";
import {
    List,
    Create,
    SimpleForm,
    TextInput,
    required,
    useNotify,
    useRedirect,
    useListContext,
} from "react-admin";
import dataProvider from "../../dataProvider";
import AdminsDelete from "../delete/AdminsDelete";

export const AdminList = (props) => {
    return (
        <List {...props} bulkActionButtons={false}>
            <AdminListContent />
        </List>
    );
};

const AdminListContent = () => {
    const { data } = useListContext();

    return (
        <div className="">
            {data?.map((el) => {
                return <AdminsDelete key={el.id} {...el} />;
            })}
        </div>
    );
};

const AdminCreate = (props) => {
    console.log("Props inside AdminCreate", props);
    const notify = useNotify();
    const redirect = useRedirect();

    const handleSubmit = async (data, event) => {
        event.preventDefault();
        try {
            await dataProvider.create(data);
            notify("Admin created successfully!", { type: "success" });
            redirect("/admins");
        } catch (error) {
            console.error(
                "Error during admin creation:",
                error.response ? error.response.data : error.message,
            );
            const errorMessage =
                error.response?.data?.message || "Error creating admin!";
            notify(errorMessage, { type: "error" });
        }
    };

    return (
        <Create {...props}>
            <SimpleForm onSubmit={handleSubmit}>
                <TextInput source="name" label="Name" validate={required()} />
                <TextInput source="username" label="Username" validate={required()} />
                <TextInput
                    source="password"
                    label="Password"
                    type="password"
                    validate={required()}
                />
            </SimpleForm>
        </Create>
    );
};

export default AdminCreate;
