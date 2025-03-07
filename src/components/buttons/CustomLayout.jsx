import React from "react";
import { Layout } from "react-admin";
import CustomAppBar from "./CustomProfile";

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout