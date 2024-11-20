import React from "react";
import { Admin, Resource, ShowGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { PostEdit, PostList, PostCreate } from "./components/posts";
import { UserList } from "./components/users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from "./components/dashboard";
import authProvider from "./authProvider";
import CustomLogin from "./components/CustomLogin";

export const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        dashboard={Dashboard}
        loginPage={CustomLogin} 
    >
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} show={ShowGuesser} icon={UserIcon} />
    </Admin>
);
