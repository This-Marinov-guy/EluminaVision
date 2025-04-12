"use client";
import React from "react";

import NavBar from "../../_module/nav";
import LoadingScreen from "../loading";
import UserPanel from "@/components/_module/account/UserPanel";
import AuthLayout from "@/layout/AuthLayout";
import Footer from "@/components/_module/footer";

const AccountPage = () => {
  return (
    <AuthLayout>
      <NavBar />
      <LoadingScreen />
      <UserPanel />
      <Footer />
    </AuthLayout>
  );
};

export default AccountPage;
