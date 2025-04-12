"use client";
import React from "react";

import NavBar from "../../_module/nav";
import LoadingScreen from "../loading";
import ProductPanel from "@/components/_module/products/ProductsPanel";
import Footer from "@/components/_module/footer";

const ProductsPage = () => {
  return (
    <>
      <NavBar />
      <LoadingScreen />
      <ProductPanel />
      <Footer />
    </>
  );
};

export default ProductsPage;
