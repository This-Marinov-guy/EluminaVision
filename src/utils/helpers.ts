import { error } from "console";
import { supabaseAdmin } from "./config";
import Resizer from "react-image-file-resizer";

export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return currency;
  }
};

export const getShippingCostDetails = (id) => {
  switch (id) {
    case "shr_1Qvm1iLUXmDaRfFYelNucXsc":
      return "UK delivery (Royal Mail) | 1 - 2 business days | £3.25";
    case "shr_1Qvm2JLUXmDaRfFYkVMN5yOr":
      return "Europe delivery (Royal Mail) | 2 - 4 business days | £5.00";
    default:
      return "None";
  }
};

export const extractIdFromRequest = (authHeader: string) => {
  if (!authHeader) return null;

  try {
    const token = authHeader.split(" ")[1];
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Session expired");
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

    return payload["sub"];
  } catch (error) {
    return null;
  }
};

export const resizeFile = (file, width = 1000, height = 1000, format = "jpg") =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      format,
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob",
    );
  });

export async function updateFirstNRows(n: number, table: string, userId = null): Promise<number[] | null> {
  // 1️⃣ Fetch first N rows with status = 1
  const { data: rows, error: fetchError } = await supabaseAdmin
    .from(table)
    .select("id")
    .eq("status", 1)
    .order("id", { ascending: true }) // Fetch oldest rows first
    .limit(n);

  console.log(rows, fetchError);

  if (fetchError || !rows?.length) {
    console.error("Error fetching rows or no rows found:", fetchError);
    return null;
  }

  const codeIds = rows.map((row) => row.id);

  // 2️⃣ Update the fetched rows
  const updatePayload = { status: 2 };
  if (userId) updatePayload["user_id"] = userId;

  console.log(table, updatePayload, codeIds);

  const { error: updateError } = await supabaseAdmin.from(table).update(updatePayload).in("id", codeIds);

  if (updateError) {
    console.error("Error updating QR codes:", updateError);
    return null;
  }

  console.log(`Successfully updated ${codeIds.length} QR codes in table ${table}!`);

  return codeIds;
}

export const getLinkIcon = (url: string, label: string = "") => {
  const lowerLabel = label.toLowerCase();

  if (url.includes("facebook") || lowerLabel.includes("facebook")) {
    return "fa-brands fa-facebook";
  } else if (url.includes("instagram") || lowerLabel.includes("instagram")) {
    return "fa-brands fa-instagram";
  } else if (url.includes("twitter") || lowerLabel.includes("twitter")) {
    return "fa-brands fa-twitter";
  } else if (url.includes("linkedin") || lowerLabel.includes("linkedin")) {
    return "fa-brands fa-linkedin";
  } else if (url.includes("tiktok") || lowerLabel.includes("tiktok")) {
    return "fa-brands fa-tiktok";
  } else if (url.includes("youtube") || lowerLabel.includes("youtube")) {
    return "fa-brands fa-youtube";
  } else if (url.includes("pinterest") || lowerLabel.includes("pinterest")) {
    return "fa-brands fa-pinterest";
  } else if (url.includes("whatsapp") || lowerLabel.includes("whatsapp")) {
    return "fa-brands fa-whatsapp";
  } else if (url.includes("snapchat") || lowerLabel.includes("snapchat")) {
    return "fa-brands fa-snapchat";
  } else if (url.includes("twitch") || lowerLabel.includes("twitch")) {
    return "fa-brands fa-twitch";
  } else if (url.includes("reddit") || lowerLabel.includes("reddit")) {
    return "fa-brands fa-reddit";
  } else if (url.includes("discord") || lowerLabel.includes("discord")) {
    return "fa-brands fa-discord";
  } else if (url.includes("telegram") || lowerLabel.includes("telegram")) {
    return "fa-brands fa-telegram";
  } else {
    return "fa-solid fa-globe";
  }
};

/**
 * Converts an image URL to a data URL
 * @param {string} imageUrl - The URL of the image to convert
 * @returns {Promise<string>} - Promise resolving to the data URL
 */
export const convertImageToDataURL = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL("image/png");
      resolve(dataUrl);
    };

    img.onerror = (error) => {
      reject(new Error(`Failed to load image: ${error}`));
    };

    img.src = imageUrl;
  });
};

/**
 * Embeds external images in an SVG as data URLs
 * @param {SVGElement} svgElement - The SVG element to process
 * @param {string} [logoUrl] - Optional URL of logo to ensure is embedded
 * @returns {Promise<SVGElement>} - Promise resolving to the processed SVG element
 */
export const embedImagesInSVG = async (svgElement, logoUrl = null) => {
  // Create a clone of the SVG to avoid modifying the original
  const svgClone = svgElement.cloneNode(true);

  // Find all image elements in the SVG
  const imageElements = svgClone.querySelectorAll("image");

  if (imageElements.length === 0) {
    return svgClone;
  }

  // Process all images
  const imagePromises = Array.from(imageElements).map(async (imgElement) => {
    const svgImgElement = imgElement as SVGImageElement;
    const href = svgImgElement.getAttribute("href") || svgImgElement.getAttribute("xlink:href");

    // Only process if it's a URL (not already a data URL)
    if (href && !href.startsWith("data:")) {
      try {
        const dataUrl = await convertImageToDataURL(href);
        svgImgElement.setAttribute("href", dataUrl as string);
        if (svgImgElement.hasAttribute("xlink:href")) {
          svgImgElement.setAttribute("xlink:href", dataUrl as string);
        }
      } catch (error) {
        console.warn(`Could not embed image: ${error.message}`);
      }
    }
  });

  // If a specific logo URL was provided but not found in the SVG,
  // we can add it manually if needed
  if (
    logoUrl &&
    !Array.from(imageElements).some(
      (img: SVGImageElement) => img.getAttribute("href") === logoUrl || img.getAttribute("xlink:href") === logoUrl,
    )
  ) {
    try {
      // This block would handle adding a logo that wasn't already in the SVG
      // Implementation would depend on how you want to position the logo
      console.warn("Logo URL provided but not found in SVG");
    } catch (error) {
      console.warn(`Could not add logo: ${error.message}`);
    }
  }

  // Wait for all images to be processed
  await Promise.all(imagePromises);
  return svgClone;
};

/**
 * Converts an SVG element to a PNG data URL
 * @param {SVGElement} svgElement - The SVG element to convert
 * @param {number} width - Width of the output PNG
 * @param {number} height - Height of the output PNG
 * @returns {Promise<string>} - Promise resolving to the PNG data URL
 */
export const convertSVGtoPNG = (svgElement, width, height) => {
  return new Promise((resolve, reject) => {
    try {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      const img = new Image();
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);

        const pngDataUrl = canvas.toDataURL("image/png");
        resolve(pngDataUrl);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load SVG image"));
      };

      img.src = url;
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Triggers download of a data URL as a file
 * @param {string} dataUrl - The data URL to download
 * @param {string} filename - The filename for the download
 */
export const downloadDataURL = (dataUrl, filename) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = dataUrl;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

/**
 * Main function to download an SVG element as a PNG file
 * @param {SVGElement|React.RefObject} svgRef - The SVG element or React ref
 * @param {Object} options - Options for the download
 * @param {string} options.filename - Filename for the download
 * @param {number} options.width - Width of the output PNG
 * @param {number} options.height - Height of the output PNG
 * @param {string} [options.logoUrl] - Optional URL of logo to ensure is embedded
 * @param {Function} [options.onStart] - Callback when download starts
 * @param {Function} [options.onComplete] - Callback when download completes
 * @param {Function} [options.onError] - Callback when an error occurs
 * @returns {Promise<void>}
 */
export const downloadSVGasPNG = async (svgRef, options) => {
  const {
    filename,
    width = 240,
    height = 240,
    logoUrl = null,
    onStart = () => {},
    onComplete = () => {},
    onError = (error) => console.error(error),
  } = options;

  try {
    onStart();

    // Get the SVG element from the ref or use it directly
    const svgElement =
      svgRef.current?.querySelector("svg") || svgRef.current || (svgRef instanceof SVGElement ? svgRef : null);

    if (!svgElement) {
      throw new Error("SVG element not found");
    }

    // Embed all images in the SVG
    const processedSVG = await embedImagesInSVG(svgElement, logoUrl);

    // Convert the SVG to PNG
    const pngDataUrl = await convertSVGtoPNG(processedSVG, width, height);

    // Trigger the download
    downloadDataURL(pngDataUrl, filename);

    onComplete();
  } catch (error) {
    onError(error);
  }
};
