import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { rgbToHex } from '../utils/colorConversion';
import ColorCard from './ColorCard';
import { usePaletteStore } from '../stores/paletteStore';

const SavedPalettes: React.FC = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  
  const { palettes, deletePalette: removePalette, exportPalettes, importPalettes } = usePaletteStore();

  const handleExport = () => {
    const json = exportPalettes();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calibre-palettes-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const success = importPalettes(content);
        if (!success) {
          setImportError(t('notification.importFailed'));
          setTimeout(() => setImportError(null), 3000);
        }
      } catch {
        setImportError(t('notification.importFailed'));
        setTimeout(() => setImportError(null), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (palettes.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          {t('savedPalettes.title')} ({palettes.length})
        </h2>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors">
            {t('savedPalettes.importJSON')}
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={handleExport}
            className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm transition-colors"
          >
            {t('savedPalettes.exportJSON')}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? t('savedPalettes.collapse') : t('savedPalettes.expand')}
          </button>
        </div>
      </div>

      {importError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
          {importError}
        </div>
      )}
      
      {isExpanded && (
        <div className="space-y-6 mt-6">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className="border border-gray-700 rounded-xl p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-white font-medium">
                    {t(`schemes.${palette.scheme}`)}
                  </span>
                  <span className="text-gray-400 text-sm ml-3">
                    {t('savedPalettes.baseColor')}: {rgbToHex(palette.baseColor)}
                  </span>
                  {palette.name && (
                    <span className="text-blue-400 text-sm ml-3">
                      {palette.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {palette.favorite && (
                    <span className="text-yellow-400">⭐</span>
                  )}
                  <button
                    onClick={() => removePalette(palette.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    {t('savedPalettes.delete')}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
                {palette.colors.map((color, index) => (
                  <ColorCard key={index} rgb={color} />
                ))}
              </div>

              {palette.tags && palette.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {palette.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mt-3 text-xs text-gray-500">
                {t('savedPalettes.savedAt')}: {new Date(palette.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPalettes;