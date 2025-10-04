import { useEffect } from "react";
import { X } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imageUrl, onClose }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-primary z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        data-testid="lightbox-close"
        aria-label="Close lightbox"
      >
        <X className="w-8 h-8" />
      </button>
      <img 
        src={imageUrl} 
        alt="Gallery Image" 
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
        data-testid="lightbox-image"
      />
    </div>
  );
}
