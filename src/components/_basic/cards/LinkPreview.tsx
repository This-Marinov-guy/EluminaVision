"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkPreviewComponentProps = {
  url: string;
  onChange?: (newUrl: string) => void;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
  children?: React.ReactNode;
  renderLink?: (props: { url: string; children: React.ReactNode }) => React.ReactNode;
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never });

export const LinkPreviewComponent = ({
  url,
  onChange,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
  children,
  renderLink,
}: LinkPreviewComponentProps) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isOpen, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Update current URL when the prop changes
  useEffect(() => {
    setCurrentUrl(url);
  }, [url]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  // Generate the preview image source URL
  const generatePreviewSrc = () => {
    if (isStatic) return imageSrc;

    const params = encode({
      url: currentUrl,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });

    return `https://api.microlink.io/?${params}`;
  };

  const previewSrc = generatePreviewSrc();

  // Function to refresh the link if onChange is provided
  const refreshLink = (newUrl: string) => {
    setCurrentUrl(newUrl);
    if (onChange) {
      onChange(newUrl);
    }
  };

  const renderContent = () => {
    const defaultChildren = <span className="inline-block text-blue-500 hover:underline">{currentUrl}</span>;

    return children || defaultChildren;
  };

  const defaultRenderLink = ({ url, children }: { url: string; children: React.ReactNode }) => (
    <Link href={url} className={cn("text-black dark:text-white", className)}>
      {children}
    </Link>
  );

  const linkRenderer = renderLink || defaultRenderLink;

  return <Image src={previewSrc} width={width} height={height} quality={quality} alt="hidden preload image" priority />;
};

export default LinkPreviewComponent;
