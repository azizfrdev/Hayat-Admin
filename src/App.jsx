import React from "react";
import { Admin, Resource,} from "react-admin";
import dataProvider from "./providers/dataProvider";
import { PostEdit, PostList, PostCreate } from "./components/pages/posts";
import PostIcon from "@mui/icons-material/Book";
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
    </Admin>
  );
};
