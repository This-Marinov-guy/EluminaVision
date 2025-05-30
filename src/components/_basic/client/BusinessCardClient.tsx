"use client";

import { AnimatedTooltip } from "@/components/ui/tootltip";
import { getLinkIcon } from "@/utils/helpers";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import React, { use, useEffect, useState } from "react";
import { Badge } from "@chakra-ui/react";

export default function BusinessCardClient({ data }) {
  const [flipped, setFlipped] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Business Card",
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

  useEffect(() => {
    // Wait for images to load before marking as loaded
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        document.body.classList.add("card-loaded");
        setIsLoaded(true);
      }
    };

    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });

    // If no images, mark as loaded immediately
    if (images.length === 0) {
      document.body.classList.add("card-loaded");
      setIsLoaded(true);
    }

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, [data]);

  if (!data) return null;

  return (
    <main
      style={{
        backgroundImage: `linear-gradient(to bottom, ${data.background_color || "#aaa"} 0%, ${
          data.background_color || "#aaa"
        }99 100%)`,
        height: "100%",
      }}
      className="flex flex-col items-center justify-center p-4"
    >
      {!isLoaded && <div className="absolute top-0 left-0 w-full h-full bg-white/50 z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>}
      <CardContainer className="max-w-md w-full">
        <div className="relative h-[600px] w-full perspective">
          <CardBody
            className={`relative h-full w-full transition-all duration-500 preserve-3d cursor-pointer ${
              flipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setFlipped(!flipped)}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden"
              style={{ backgroundColor: data.card_color }}
            >
              <div className="h-full flex flex-col">
                {data.logo && (
                  <CardItem translateZ={20} className="h-1/5 flex items-center justify-center p-4">
                    <img src={data.logo} alt="Logo" className="max-h-full object-contain rounded-md" />
                  </CardItem>
                )}

                {data.image && (
                  <CardItem translateZ="50" className="h-3/5 overflow-hidden">
                    <img src={data.image} alt="Business Card" className="w-full h-full object-cover rounded-lg" />
                  </CardItem>
                )}

                <CardItem translateZ="50" className="mt-6 d-flex text-center justify-center">
                  <Badge style={{ whiteSpace: "pre-line", padding: '5px 10px' }} className="text-center font-medium">
                    {data.description || "Digital Business Card"}
                  </Badge>
                </CardItem>
              </div>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden rotate-y-180"
              style={{ backgroundColor: data.card_color }}
            >
              <div className="h-full flex flex-col p-8">
                {data.logo && (
                  <CardItem translateZ={20} className="flex justify-center mb-8">
                    <img src={data.logo} alt="Logo" className="h-16 object-contain rounded-md" />
                  </CardItem>
                )}

                <div className="flex-grow flex flex-col space-y-6 items-center justify-center text-black">
                  {data.links?.map((link, index) => (
                    <CardItem translateZ={20} key={index}>
                      <a
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
                    </CardItem>
                  ))}
                </div>

                <CardItem translateZ={70} className="h-1/5 p-4 flex flex-col justify-center">
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
                </CardItem>
              </div>
            </div>
          </CardBody>
        </div>
      </CardContainer>
      <Badge className="mt-6">Tap the card to flip</Badge>
    </main>
  );
}
