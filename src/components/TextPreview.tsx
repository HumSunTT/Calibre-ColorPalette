import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RGB, HarmonyScheme } from '../types/color';
import { generateHarmony } from '../utils/harmonySchemes';
import { copyToClipboard } from '../utils/storage';
import StyleEditor, { StyleSettings, createDefaultStyleSettings, TextStyle } from './StyleEditor';

interface TextPreviewProps {
  baseColor: RGB;
}

const schemes: HarmonyScheme[] = [
  'triadic',
  'square',
  'split-complementary',
  'monochromatic',
  'double-complementary',
  'compound',
  'shades',
  'neutral',
  'five-tone',
  'six-tone',
];

const TextPreview: React.FC<TextPreviewProps> = ({ baseColor }) => {
  const { t } = useTranslation();
  const [selectedScheme, setSelectedScheme] = useState<HarmonyScheme>('triadic');
  const [copied, setCopied] = useState<string | null>(null);
  const [showCSSModal, setShowCSSModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [styleSettings, setStyleSettings] = useState<StyleSettings | null>(null);

  const { colors } = generateHarmony(baseColor, selectedScheme);

  useEffect(() => {
    setStyleSettings(createDefaultStyleSettings(colors));
  }, [baseColor, selectedScheme]);

  if (!styleSettings) return null;

  const calibreCSS = generateCalibreCSS(styleSettings);

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    } else {
      alert(t('textPreview.copyFailed'));
    }
  };

  const sampleParagraphs = [
    t('sampleText.chapter'),
    t('sampleText.section1'),
    t('sampleText.paragraph1'),
    t('sampleText.dialog'),
    t('sampleText.paragraph2'),
    t('sampleText.section2'),
    t('sampleText.paragraph3'),
  ];

  const getTextStyleCSS = (style: TextStyle): React.CSSProperties => ({
    color: style.color,
    fontWeight: style.bold ? 700 : 400,
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: style.underline ? 'underline' : 'none',
    fontSize: `${style.fontSize}%`,
  });

  const renderParagraph = (text: string, index: number) => {
    if (text === t('sampleText.chapter')) {
      return (
        <h1 key={index} className="text-3xl mb-4 mt-6" style={getTextStyleCSS(styleSettings.h1)}>
          {text}
        </h1>
      );
    }
    if (text === t('sampleText.section1') || text === t('sampleText.section2')) {
      return (
        <h2 key={index} className="text-xl mb-3 mt-5" style={getTextStyleCSS(styleSettings.h2)}>
          {text}
        </h2>
      );
    }
    
    const isEven = index % 2 === 0;
    const textColor = isEven ? styleSettings.text : styleSettings.textSecondary;
    
    let content = text;
    const hasFirstSentence = text.length > 20 && !text.startsWith('"');
    
    if (hasFirstSentence) {
      const firstSentenceEnd = text.search(/[。！？，、.!?]/);
      if (firstSentenceEnd > 0 && firstSentenceEnd < 50) {
        const firstSentence = text.slice(0, firstSentenceEnd + 1);
        const rest = text.slice(firstSentenceEnd + 1);
        content = `<b style="color:${styleSettings.firstSentence.color};font-weight:${styleSettings.firstSentence.bold ? 700 : 400}">${firstSentence}</b>${rest}`;
      }
    }
    
    return (
      <p 
        key={index} 
        className="mb-4 text-justify"
        style={{ color: textColor, textIndent: '2em' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{t('textPreview.title')}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEditor(!showEditor)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showEditor ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
            }`}
          >
            {t('textPreview.editStyle')}
          </button>
          <button
            onClick={() => setShowCSSModal(true)}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t('textPreview.exportCSS')}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {schemes.map((scheme) => (
          <button
            key={scheme}
            onClick={() => setSelectedScheme(scheme)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              selectedScheme === scheme
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {t(`schemes.${scheme}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-8 shadow-xl transition-all duration-300 min-h-[500px]"
          style={{ backgroundColor: styleSettings.bg }}
        >
          <div className="max-w-none font-serif text-lg leading-relaxed">
            {sampleParagraphs.map((p, i) => renderParagraph(p, i))}
          </div>
        </div>

        {showEditor && (
          <StyleEditor
            settings={styleSettings}
            onChange={setStyleSettings}
          />
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div 
          className="rounded-lg p-2 cursor-pointer hover:opacity-80 transition-opacity text-center"
          style={{ backgroundColor: styleSettings.bg, color: styleSettings.text }}
          onClick={() => handleCopy(styleSettings.bg, 'bg')}
        >
          <div className="text-xs opacity-70">{t('textPreview.bg')}</div>
          <div className="font-mono text-xs">{styleSettings.bg}</div>
        </div>
        <div 
          className="rounded-lg p-2 cursor-pointer hover:opacity-80 transition-opacity text-center"
          style={{ backgroundColor: styleSettings.text, color: styleSettings.bg }}
          onClick={() => handleCopy(styleSettings.text, 'text')}
        >
          <div className="text-xs opacity-70">{t('textPreview.text')}</div>
          <div className="font-mono text-xs">{styleSettings.text}</div>
        </div>
        <div 
          className="rounded-lg p-2 cursor-pointer hover:opacity-80 transition-opacity text-center"
          style={{ backgroundColor: styleSettings.h1.color, color: '#fff' }}
          onClick={() => handleCopy(styleSettings.h1.color, 'h1')}
        >
          <div className="text-xs opacity-70">H1</div>
          <div className="font-mono text-xs">{styleSettings.h1.color}</div>
        </div>
        <div 
          className="rounded-lg p-2 cursor-pointer hover:opacity-80 transition-opacity text-center"
          style={{ backgroundColor: styleSettings.h2.color, color: '#fff' }}
          onClick={() => handleCopy(styleSettings.h2.color, 'h2')}
        >
          <div className="text-xs opacity-70">H2</div>
          <div className="font-mono text-xs">{styleSettings.h2.color}</div>
        </div>
      </div>

      {showCSSModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowCSSModal(false)}>
          <div className="bg-gray-800 rounded-xl p-6 max-w-3xl w-full max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{t('cssModal.title')}</h3>
              <button 
                onClick={() => setShowCSSModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 whitespace-pre-wrap text-xs select-all">{calibreCSS}</pre>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleCopy(calibreCSS, 'calibre')}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
              >
                {copied === 'calibre' ? t('cssModal.copied') : t('cssModal.copy')}
              </button>
              <button
                onClick={() => {
                  const pre = document.querySelector('.select-all') as HTMLElement;
                  if (pre) {
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(pre);
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                {t('cssModal.selectAll')}
              </button>
            </div>
            
            <div className="mt-4 text-sm text-gray-400 space-y-2">
              <p className="font-medium text-white">{t('cssModal.usage')}</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>{t('cssModal.step1')}</li>
                <li>{t('cssModal.step2')}</li>
                <li>{t('cssModal.step3')}</li>
                <li>{t('cssModal.step4')}</li>
              </ol>
              <p className="text-xs text-gray-500 mt-2">{t('cssModal.tip')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const generateCalibreCSS = (settings: StyleSettings): string => {
  const h1Style = settings.h1;
  const h2Style = settings.h2;
  const h3Style = settings.h3;
  const firstStyle = settings.firstSentence;

  const h1Decor = h1Style.underline ? 'underline' : 'none';
  const h2Decor = h2Style.underline ? 'underline' : 'none';
  const h3Decor = h3Style.underline ? 'underline' : 'none';
  const firstDecor = firstStyle.underline ? 'underline' : 'none';

  return `/* Calibre CSS Styles */
:root {
  --bg-primary: ${settings.bg};
  --text-primary: ${settings.text};
  --text-secondary: ${settings.textSecondary};
  --h1-color: ${h1Style.color};
  --h2-color: ${h2Style.color};
  --h3-color: ${h3Style.color};
  --first-sentence: ${firstStyle.color};
  --link-color: ${settings.link};
  --blockquote-color: ${settings.blockquote};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Serif CJK SC", "Source Han Serif CN", serif;
  font-size: 1rem;
  line-height: 1.75;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  max-width: 42rem;
  margin: 0 auto;
  padding: 2.5em 1.5em;
  text-align: justify;
}

h1 {
  color: ${h1Style.color};
  font-size: ${h1Style.fontSize / 100}em;
  font-weight: ${h1Style.bold ? 700 : 400};
  font-style: ${h1Style.italic ? 'italic' : 'normal'};
  text-decoration: ${h1Decor};
  text-align: center;
  margin: 1.5em 0 1em;
  padding: 0.5em;
  background: linear-gradient(90deg, ${h1Style.color}20 0%, transparent 50%, ${h1Style.color}20 100%);
  border-top: 2px solid ${h1Style.color};
  border-bottom: 2px solid ${h1Style.color};
}

h2 {
  color: ${h2Style.color};
  font-size: ${h2Style.fontSize / 100}em;
  font-weight: ${h2Style.bold ? 700 : 400};
  font-style: ${h2Style.italic ? 'italic' : 'normal'};
  text-decoration: ${h2Decor};
  margin: 1.2em 0 0.8em;
  padding: 0.5em 0.8em;
  border-left: 4px solid ${h2Style.color};
  background: linear-gradient(90deg, ${h2Style.color}15 0%, transparent 100%);
}

h3 {
  color: ${h3Style.color};
  font-size: ${h3Style.fontSize / 100}em;
  font-weight: ${h3Style.bold ? 700 : 400};
  font-style: ${h3Style.italic ? 'italic' : 'normal'};
  text-decoration: ${h3Decor};
  margin: 1em 0 0.6em;
}

p {
  color: var(--text-primary);
  text-indent: 2em;
  line-height: 1.75;
  margin-bottom: 1.5em;
  text-align: justify;
}

p:nth-child(odd) { color: var(--text-primary); }
p:nth-child(even) { color: var(--text-secondary); }

p b:first-child, p strong:first-child {
  color: ${firstStyle.color};
  font-size: ${firstStyle.fontSize / 100}em;
  font-weight: ${firstStyle.bold ? 700 : 400};
  font-style: ${firstStyle.italic ? 'italic' : 'normal'};
  text-decoration: ${firstDecor};
  display: inline-block;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  border-left: 3px solid ${firstStyle.color};
  margin-right: 0.3em;
}

b, strong { color: ${h1Style.color}; font-weight: 700; }

a {
  color: ${settings.link};
  text-decoration: none;
  border-bottom: 1px dashed ${settings.link};
}

blockquote {
  border-left: 3px solid ${settings.blockquote};
  margin: 1em 0;
  padding: 0.5em 1em;
  background-color: rgba(0,0,0,0.05);
  color: var(--text-secondary);
}

code, pre {
  background-color: rgba(0,0,0,0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

hr {
  border: none;
  border-top: 1px solid ${h1Style.color}40;
  margin: 2em 0;
}

table { border-collapse: collapse; margin: 1em auto; }
th, td { border: 1px solid ${h1Style.color}40; padding: 8px 12px; }
th { background-color: rgba(0,0,0,0.1); color: ${h1Style.color}; }`;
};

export default TextPreview;