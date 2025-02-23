"use client";
import React from "react";

import NavBar from "../../_module/nav";
import LoadingScreen from "../loading";
import ProductPanel from "@/components/_module/products/ProductsPanel";

const ProductsPage = () => {
  return (
    <>
      <NavBar />
      <LoadingScreen />
      <ProductPanel />
    </>
  );
};

export default ProductsPage;
