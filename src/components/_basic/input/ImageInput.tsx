import { resizeFile } from "@/utils/helpers";
import React, { useRef, useState } from "react";

const ImageInput = ({ label, value, onChange, imageFormat = 'jpg' }) => {
  const [previewURL, setPreviewURL] = useState(value ?? null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
      onChange(await resizeFile(file, 600, 600, imageFormat));
    }
  };

  return (
    <div className="flex items-center justify-start gap-6">
      <label className="w-16 mb-1">{label}</label>

      <div
        className="group w-14 h-14 rounded border-4 border-dashed border-black flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-blue-500"
        onClick={handleClick}
      >
        {previewURL ? (
          <img src={previewURL} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <i className="fa-solid fa-plus text-gray-400 text-sm transition-transform duration-200 group-hover:scale-150 hover:border-blue-500" />
        )}
      </div>

      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
    </div>
  );
};

export default ImageInput;
