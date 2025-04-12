"use client";

import PageLoader from "@/components/_page/loading/PageLoader";
import { useEffect, useState } from "react";

export default function BusinessCardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      return;
    }

    fetch(`/api/business-cards/preview?id=${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((parsedResponse) => {
        if (parsedResponse.status) {
          setData(parsedResponse.businessCard);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return <div>wow</div>;
}
