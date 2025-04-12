import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

const useImageResize = (maxSizeMB = 3.5) => {
    const [isResizing, setIsResizing] = useState(false);
    const [error, setError] = useState(null);

    const resizeImage = useCallback(async (file) => {
        if (!(file instanceof Blob)) {
            throw new Error('Input must be a Blob or File object');
        }

        setIsResizing(true);
        setError(null);

        const options = {
            maxSizeMB: maxSizeMB,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            setIsResizing(false);
            return compressedFile; // This is already a Blob
        } catch (err) {
            setError(err);
            setIsResizing(false);
            throw err;
        }
    }, [maxSizeMB]);

    return { resizeImage, isResizing, error };
};

export default useImageResize;