"use client";

import PageLoader from "@/components/_page/loading/PageLoader";
import { useEffect, useState } from "react";

export default function BusinessCardPage({ params }) {
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`/api/business-cards/${id}`, {
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
