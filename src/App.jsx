import React from "react";
import { Admin, Resource, EditGuesser, ShowGuesser } from "react-admin";
import dataProvider from "./providers/dataProvider";
import { PostEdit, PostList, PostCreate } from "./components/pages/posts";
import { UserList } from "./components/pages/users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import authProvider from "./providers/authProvider";
import CustomLogin from "./components/log/CustomLogin";
import { AdminList } from "./components/pages/AdminsResource";
import AdminCreate from "./components/pages/AdminsResource";

export const App = () => {

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      loginPage={CustomLogin} 
    >
      <Resource name='admins' list={AdminList} create={AdminCreate} options='admins' />
      <Resource
        name='doctor'
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
        options='doctor'
      />
      <Resource name='users' list={UserList} edit={EditGuesser} icon={UserIcon} options='users' />
      <Resource
        name='services'
        list={UserList}
        show={ShowGuesser}
        icon={CommentIcon}
        options='services'
      />
    </Admin>
  );
};
