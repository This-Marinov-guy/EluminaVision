"use client";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

export const TeamCard = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div className='mt-5'>
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-96 w-full transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
        )}
      >
        <Image src={card.avatar} alt={card.name} fill className="object-cover absolute inset-0" />
        <div
          className={cn(
            "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            <h2 style={{ color: "rgb(245 157 106)" }}>{card.role}</h2>
            <p>{card.description}</p>
          </div>
        </div>
      </div>
      <h2 style={{ color: "rgb(245 157 106)", fontSize: '1.4em' }}> {card.name}</h2>
    </div>
  ),
);

type Card = {
  title: string;
  src: string;
};
