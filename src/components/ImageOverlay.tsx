import React, { useState } from 'react';

interface ImageOverlayProps {
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export function ImageOverlay({ imageUrl, title, onClose }: ImageOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity">
      <div className="relative max-w-4xl w-full p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl z-50"
        >
          x
        </button>
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto"
          />
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
              <h3 className="text-white text-lg">{title}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}