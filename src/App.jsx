import React from "react";
import { Admin, Resource,} from "react-admin";
import dataProvider from "./providers/dataProvider";
import PostIcon from "@mui/icons-material/Book";
import authProvider from "./providers/authProvider";
import CustomLogin from "./components/log/CustomLogin";
import { AdminList } from "./components/pages/AdminsResource";
import AdminCreate from "./components/pages/AdminsResource";
import CustomLayout from "./components/buttons/CustomLayout";
import DoctorList from "./components/pages/doctor";
import DoctorShow from "./components/buttons/read/DoctorShow";
import DoctorCreate from "./components/buttons/create/DoctorCreate";
import DoctorDelete from "./components/buttons/delete/DoctorDelete";

export const App = () => {

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      loginPage={CustomLogin} 
      layout={CustomLayout}
    >
      <Resource name='admins' list={AdminList} create={AdminCreate} options='admins' />
      <Resource
        name='doctors'
        list={DoctorList}
        show={DoctorShow}
        create={DoctorCreate}
        delete={DoctorDelete}
        icon={PostIcon}
        options='doctors'
      />
    </Admin>
  );
};
