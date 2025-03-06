"use client";
import React from "react";

import NavBar from "../../_module/nav";
import LoadingScreen from "../loading";
import ProductPanel from "@/components/_module/products/ProductsPanel";
import UserPanel from "@/components/_module/account/UserPanel";
import QRcodes from "@/components/_module/account/QRcodes";

const AccountPage = () => {
  return (
    <>
      <NavBar />
      <LoadingScreen />
      <UserPanel/>
      <QRcodes/>
    </>
  );
};

export default AccountPage;
