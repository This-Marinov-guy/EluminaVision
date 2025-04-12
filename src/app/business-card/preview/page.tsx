"use client";

import PageLoader from "@/components/_page/loading/PageLoader";
import { useEffect } from "react";

export default function BusinessCardPreview() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      alert("Missing 'id' parameter in the URL.");
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

  return <PageLoader />;
}
