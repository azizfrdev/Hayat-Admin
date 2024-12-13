import React from "react";
import { Admin, EditGuesser, Resource, ShowGuesser } from "react-admin";
import dataProvider from './dataProvider';
import { PostEdit, PostList, PostCreate } from "./components/pages/posts";
import { UserList } from "./components/pages/users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import authProvider from "./authProvider";
import CustomLogin from "./components/log/CustomLogin";
import { AdminList } from "./components/pages/AdminsResource";
import AdminCreate from "./components/pages/AdminsResource";

export const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        loginPage={CustomLogin}
    >
        <Resource name="admins" 
            list={AdminList} 
            create={AdminCreate} />
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} edit={EditGuesser} icon={UserIcon} />
        <Resource name="services" list={UserList} show={ShowGuesser} icon={CommentIcon} />
    </Admin>
);
