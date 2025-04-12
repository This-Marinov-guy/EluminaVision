import BusinessCardPage from "@/app/business-card/preview/[id]/page";
import React from "react";

const index = () => {
  return <BusinessCardPage params={{ id: 'default' }} />;
};

export default index;
