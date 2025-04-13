"use client";
import { AnimatedTooltip } from "@/components/ui/tootltip";
import { getLinkIcon } from "@/utils/helpers";
import React, { useState, useEffect } from "react";

export default function BusinessCard() {
  const [flipped, setFlipped] = useState(false);
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
        setData(parsedResponse.businessCard);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  // Function to handle sharing
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Business Card",
          text: data.description,
          url: data.redirect_url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported in your browser");
    }
  };

  if (!data) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br bg-dark-gradient">
      <div className="max-w-md w-full">
        {/* Card container with perspective for 3D flip effect */}
        <div className="relative h-[600px] w-full perspective">
          <div
            className={`relative h-full w-full transition-all duration-500 preserve-3d cursor-pointer ${
              flipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setFlipped(!flipped)}
          >
            {/* Front of card */}
            <div
              className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden"
              style={{ backgroundColor: data.background_color || "#aaa" }}
            >
              <div className="h-full flex flex-col">
                {/* Logo section */}
                {data.logo && (
                  <div className="h-1/5 flex items-center justify-center p-4">
                    <img
                      src={data.logo || "/api/placeholder/200/100"}
                      alt="Logo"
                      className="max-h-full object-contain"
                    />
                  </div>
                )}

                {/* Image section */}
                {data.image && (
                  <div className="h-3/5 overflow-hidden">
                    <img
                      src={data.image || "/api/placeholder/400/320"}
                      alt="Business Card"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Name and description section */}
                <div className="mt-6">
                  <p className=" text-gray-800 text-center font-medium">
                    {data.description || "Digital Business Card"}
                  </p>
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div
              className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden rotate-y-180"
              style={{ backgroundColor: data.background_color || "#aaa" }}
            >
              <div className="h-full flex flex-col p-8">
                {/* Logo section */}
                {data.logo && (
                  <div className="flex justify-center mb-8">
                    <img src={data.logo} alt="Logo" className="h-16 object-contain" />
                  </div>
                )}

                {/* Links section */}
                <div className="flex-grow flex flex-col space-y-6 items-center justify-center text-black">
                  {data.links?.length &&
                    data.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-800 hover:text-gray-700 transition-all duration-200 ease-in-out py-2 px-4 rounded-lg bg-white shadow-sm hover:shadow-lg transform hover:scale-105 w-full max-w-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-center w-full font-medium capitalize">
                          <i className={getLinkIcon(link.url, link.label)} /> {link.label}
                        </span>
                      </a>
                    ))}
                </div>

                {/* Share section */}
                <div className="h-1/5 p-4 flex flex-col justify-center">
                  <div className="mt-2 flex justify-center space-x-2">
                    <button
                      className="rounded-full p-2 bg-gray-700 text-white hover:bg-gray-600 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare();
                      }}
                    >
                      <AnimatedTooltip text="Share this card">
                        <i className="text-3xl fa-solid fa-share-from-square"></i>
                      </AnimatedTooltip>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-6">Tap the card to flip</p>
      </div>
    </main>
  );
}
