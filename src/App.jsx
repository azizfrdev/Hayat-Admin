import React from "react";
import { Admin, EditGuesser, Resource, ShowGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { PostEdit, PostList, PostCreate } from "./components/pages/posts";
import { UserList } from "./components/pages/users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import { Dashboard } from "./components/pages/dashboard";
import authProvider from "./authProvider";
import CustomLogin from "./components/log/CustomLogin";

export const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        loginPage={CustomLogin}  
    >
        <Resource name="admins" list={UserList} show={ShowGuesser} icon={UserIcon} />
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} edit={EditGuesser} icon={UserIcon} />
        <Resource name="comments" list={UserList} show={ShowGuesser} icon={CommentIcon} />
        <Resource name="products" list={UserList} show={ShowGuesser} icon={CommentIcon} />
    </Admin>
);
