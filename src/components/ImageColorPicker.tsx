import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { extractColorsFromFile, isValidImageFile } from '../utils/colorExtract';

interface ImageColorPickerProps {
  onColorsExtracted: (colors: string[]) => void;
}

const ImageColorPicker: React.FC<ImageColorPickerProps> = ({ onColorsExtracted }) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  const handleFile = useCallback(async (file: File) => {
    if (!isValidImageFile(file)) {
      setError(t('imageExtractor.extractFailed'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const colors = await extractColorsFromFile(file, 8);
      setExtractedColors(colors);
      onColorsExtracted(colors);
    } catch {
      setError(t('imageExtractor.extractFailed'));
    } finally {
      setIsLoading(false);
    }
  }, [t, onColorsExtracted]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleColorClick = useCallback((color: string) => {
    navigator.clipboard?.writeText(color);
  }, []);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-xl">
      <h3 className="text-sm font-bold text-white mb-3">{t('imageExtractor.title')}</h3>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}
          ${isLoading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="text-gray-400">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <span className="text-sm">{t('imageExtractor.extracting')}</span>
          </div>
        ) : (
          <div className="text-gray-400">
            <div className="text-3xl mb-2">🖼️</div>
            <span className="text-sm">{t('imageExtractor.clickOrDrop')}</span>
            <div className="text-xs text-gray-500 mt-1">{t('imageExtractor.supportedFormats')}</div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-2 bg-red-500/20 border border-red-500 rounded text-red-400 text-xs">
          {error}
        </div>
      )}

      {extractedColors.length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-gray-400 mb-2">{t('imageExtractor.extractSuccess')}</div>
          <div className="flex flex-wrap gap-2">
            {extractedColors.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorClick(color)}
                className="group relative w-10 h-10 rounded-lg shadow-md hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-lg text-white text-xs font-mono">
                  {color}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageColorPicker;