"use client";

import PageLoader from "@/components/_page/loading/PageLoader";
import { useEffect } from "react";

export default function BusinessCardPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      return;
    }

    // fetch(`/api/redirect?id=${id}`, {
    //   method: "GET",
    // })
    //   .then((response) => {
    //     window.location.assign(response.url);
    //   })
    //   .catch((error) => {
    //     console.error("Fetch error:", error);
    //   });
  }, []);

  return (
    <>
      <div>wow</div>
      {/* <PageLoader /> */}
    </>
  );
}
