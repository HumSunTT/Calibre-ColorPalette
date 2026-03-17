import { StyleSettings } from '../components/StyleEditor';

export interface CSSTemplate {
  id: string;
  nameKey: string;
  descriptionKey: string;
  generateCSS: (settings: Partial<StyleSettings>) => string;
}

const generateNovelCSS = (settings: Partial<StyleSettings>): string => {
  const bg = settings.bg || '#FDF8F0';
  const text = settings.text || '#2D2A26';
  const textSecondary = settings.textSecondary || '#5C574F';
  const h1 = settings.h1 || { color: '#8B4513', bold: true, italic: false, underline: false, fontSize: 160 };
  const h2 = settings.h2 || { color: '#A0522D', bold: true, italic: false, underline: false, fontSize: 130 };
  const h3 = settings.h3 || { color: '#6B4423', bold: true, italic: false, underline: false, fontSize: 115 };
  const firstSentence = settings.firstSentence || { color: '#8B4513', bold: true, italic: false, underline: false, fontSize: 100 };
  const link = settings.link || '#6B8E23';
  const blockquote = settings.blockquote || '#A0522D';

  return `/* Novel Style - Warm and Comfortable for Long Reading */
:root {
  --bg-primary: ${bg};
  --text-primary: ${text};
  --text-secondary: ${textSecondary};
  --h1-color: ${h1.color};
  --h2-color: ${h2.color};
  --h3-color: ${h3.color};
  --first-sentence: ${firstSentence.color};
  --link-color: ${link};
  --blockquote-color: ${blockquote};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Serif CJK SC", "Source Han Serif CN", "LXGW WenKai", Georgia, serif;
  font-size: 1.05rem;
  line-height: 1.9;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  max-width: 38rem;
  margin: 0 auto;
  padding: 2em 1.2em;
  text-align: justify;
  hyphens: auto;
}

h1 {
  color: ${h1.color};
  font-size: ${h1.fontSize / 100}em;
  font-weight: ${h1.bold ? 700 : 400};
  font-style: ${h1.italic ? 'italic' : 'normal'};
  text-decoration: ${h1.underline ? 'underline' : 'none'};
  text-align: center;
  margin: 1.8em 0 1.2em;
  padding: 0.6em 0;
  letter-spacing: 0.15em;
  border-top: 1px solid ${h1.color}40;
  border-bottom: 1px solid ${h1.color}40;
}

h2 {
  color: ${h2.color};
  font-size: ${h2.fontSize / 100}em;
  font-weight: ${h2.bold ? 700 : 400};
  font-style: ${h2.italic ? 'italic' : 'normal'};
  text-decoration: ${h2.underline ? 'underline' : 'none'};
  margin: 1.5em 0 0.8em;
  padding-left: 0.5em;
  border-left: 2px solid ${h2.color}60;
}

h3 {
  color: ${h3.color};
  font-size: ${h3.fontSize / 100}em;
  font-weight: ${h3.bold ? 700 : 400};
  font-style: ${h3.italic ? 'italic' : 'normal'};
  text-decoration: ${h3.underline ? 'underline' : 'none'};
  margin: 1.2em 0 0.6em;
}

p {
  color: var(--text-primary);
  text-indent: 2em;
  line-height: 1.9;
  margin-bottom: 1.2em;
  text-align: justify;
}

p:nth-child(odd) { color: var(--text-primary); }
p:nth-child(even) { color: var(--text-secondary); }

p b:first-child, p strong:first-child {
  color: ${firstSentence.color};
  font-size: ${firstSentence.fontSize / 100}em;
  font-weight: ${firstSentence.bold ? 700 : 400};
  font-style: ${firstSentence.italic ? 'italic' : 'normal'};
  text-decoration: ${firstSentence.underline ? 'underline' : 'none'};
}

b, strong { 
  color: ${h1.color}; 
  font-weight: 600; 
}

a {
  color: ${link};
  text-decoration: none;
  border-bottom: 1px dotted ${link};
}

blockquote {
  border-left: 2px solid ${blockquote}50;
  margin: 1em 0;
  padding: 0.8em 1.2em;
  background-color: rgba(139, 69, 19, 0.05);
  color: var(--text-secondary);
  font-style: italic;
}

code, pre {
  background-color: rgba(0, 0, 0, 0.06);
  padding: 2px 5px;
  border-radius: 3px;
  font-family: "Fira Code", "Source Code Pro", monospace;
  font-size: 0.9em;
}

hr {
  border: none;
  border-top: 1px solid ${h1.color}30;
  margin: 2em auto;
  width: 60%;
}

table { 
  border-collapse: collapse; 
  margin: 1em auto; 
  font-size: 0.95em;
}
th, td { 
  border: 1px solid ${h1.color}30; 
  padding: 6px 10px; 
}
th { 
  background-color: rgba(139, 69, 19, 0.08); 
  color: ${h1.color}; 
}`;
};

const generateTechnicalCSS = (settings: Partial<StyleSettings>): string => {
  const bg = settings.bg || '#FAFAFA';
  const text = settings.text || '#1A1A1A';
  const textSecondary = settings.textSecondary || '#4A4A4A';
  const h1 = settings.h1 || { color: '#1565C0', bold: true, italic: false, underline: false, fontSize: 175 };
  const h2 = settings.h2 || { color: '#1976D2', bold: true, italic: false, underline: false, fontSize: 140 };
  const h3 = settings.h3 || { color: '#2196F3', bold: true, italic: false, underline: false, fontSize: 120 };
  const firstSentence = settings.firstSentence || { color: '#0D47A1', bold: true, italic: false, underline: false, fontSize: 105 };
  const link = settings.link || '#1565C0';
  const blockquote = settings.blockquote || '#1976D2';

  return `/* Technical Style - Clean, Structured, Code-Friendly */
:root {
  --bg-primary: ${bg};
  --text-primary: ${text};
  --text-secondary: ${textSecondary};
  --h1-color: ${h1.color};
  --h2-color: ${h2.color};
  --h3-color: ${h3.color};
  --first-sentence: ${firstSentence.color};
  --link-color: ${link};
  --blockquote-color: ${blockquote};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans CJK SC", "Source Han Sans CN", -apple-system, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  max-width: 48rem;
  margin: 0 auto;
  padding: 3em 2em;
  text-align: justify;
}

h1 {
  color: ${h1.color};
  font-size: ${h1.fontSize / 100}em;
  font-weight: ${h1.bold ? 700 : 400};
  font-style: ${h1.italic ? 'italic' : 'normal'};
  text-decoration: ${h1.underline ? 'underline' : 'none'};
  text-align: left;
  margin: 2em 0 1em;
  padding-bottom: 0.4em;
  border-bottom: 3px solid ${h1.color};
  counter-increment: h1-counter;
}

h2 {
  color: ${h2.color};
  font-size: ${h2.fontSize / 100}em;
  font-weight: ${h2.bold ? 700 : 400};
  font-style: ${h2.italic ? 'italic' : 'normal'};
  text-decoration: ${h2.underline ? 'underline' : 'none'};
  margin: 1.8em 0 0.8em;
  padding-bottom: 0.3em;
  border-bottom: 2px solid ${h2.color}60;
}

h3 {
  color: ${h3.color};
  font-size: ${h3.fontSize / 100}em;
  font-weight: ${h3.bold ? 700 : 400};
  font-style: ${h3.italic ? 'italic' : 'normal'};
  text-decoration: ${h3.underline ? 'underline' : 'none'};
  margin: 1.5em 0 0.6em;
  padding-left: 0.8em;
  border-left: 4px solid ${h3.color};
}

p {
  color: var(--text-primary);
  text-indent: 0;
  line-height: 1.7;
  margin-bottom: 1.2em;
  text-align: justify;
}

p:nth-child(odd) { color: var(--text-primary); }
p:nth-child(even) { color: var(--text-secondary); }

p b:first-child, p strong:first-child {
  color: ${firstSentence.color};
  font-size: ${firstSentence.fontSize / 100}em;
  font-weight: ${firstSentence.bold ? 700 : 400};
  font-style: ${firstSentence.italic ? 'italic' : 'normal'};
  text-decoration: ${firstSentence.underline ? 'underline' : 'none'};
  background-color: ${firstSentence.color}15;
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

b, strong { 
  color: ${h1.color}; 
  font-weight: 600; 
}

a {
  color: ${link};
  text-decoration: none;
  border-bottom: 1px solid ${link}60;
  transition: border-color 0.2s;
}

blockquote {
  border-left: 4px solid ${blockquote};
  margin: 1.5em 0;
  padding: 1em 1.5em;
  background-color: ${blockquote}08;
  color: var(--text-secondary);
  border-radius: 0 4px 4px 0;
}

code {
  background-color: #E8E8E8;
  color: #D32F2F;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "JetBrains Mono", "Fira Code", "Source Code Pro", monospace;
  font-size: 0.88em;
}

pre {
  background-color: #263238;
  color: #ECEFF1;
  padding: 1em 1.2em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.2em 0;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

hr {
  border: none;
  border-top: 2px solid ${h1.color}20;
  margin: 2.5em 0;
}

table { 
  border-collapse: collapse; 
  margin: 1.5em 0;
  width: 100%;
  font-size: 0.95em;
}
th, td { 
  border: 1px solid ${h1.color}30; 
  padding: 10px 14px; 
  text-align: left;
}
th { 
  background-color: ${h1.color}10; 
  color: ${h1.color};
  font-weight: 600;
}
tr:nth-child(even) {
  background-color: ${bg}CC;
}`;
};

const generateMagazineCSS = (settings: Partial<StyleSettings>): string => {
  const bg = settings.bg || '#FFFFFF';
  const text = settings.text || '#1A1A1A';
  const textSecondary = settings.textSecondary || '#666666';
  const h1 = settings.h1 || { color: '#E91E63', bold: true, italic: false, underline: false, fontSize: 200 };
  const h2 = settings.h2 || { color: '#9C27B0', bold: true, italic: false, underline: false, fontSize: 150 };
  const h3 = settings.h3 || { color: '#673AB7', bold: true, italic: false, underline: false, fontSize: 125 };
  const firstSentence = settings.firstSentence || { color: '#E91E63', bold: true, italic: false, underline: false, fontSize: 110 };
  const link = settings.link || '#00BCD4';
  const blockquote = settings.blockquote || '#9C27B0';

  return `/* Magazine Style - Modern, Dynamic, Colorful */
:root {
  --bg-primary: ${bg};
  --text-primary: ${text};
  --text-secondary: ${textSecondary};
  --h1-color: ${h1.color};
  --h2-color: ${h2.color};
  --h3-color: ${h3.color};
  --first-sentence: ${firstSentence.color};
  --link-color: ${link};
  --blockquote-color: ${blockquote};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans CJK SC", "Source Han Sans CN", "Helvetica Neue", sans-serif;
  font-size: 1rem;
  line-height: 1.75;
  background: linear-gradient(135deg, ${bg} 0%, ${h1.color}08 50%, ${h2.color}08 100%);
  color: var(--text-primary);
  max-width: 44rem;
  margin: 0 auto;
  padding: 2.5em 1.8em;
  text-align: justify;
}

h1 {
  color: ${h1.color};
  font-size: ${h1.fontSize / 100}em;
  font-weight: ${h1.bold ? 800 : 400};
  font-style: ${h1.italic ? 'italic' : 'normal'};
  text-decoration: ${h1.underline ? 'underline' : 'none'};
  text-align: center;
  margin: 2em 0 1.2em;
  padding: 0.8em 1.5em;
  background: linear-gradient(90deg, ${h1.color}15, ${h1.color}25, ${h1.color}15);
  border-radius: 8px;
  position: relative;
  letter-spacing: 0.05em;
}

h1::before,
h1::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 4px;
  width: 60px;
  background: linear-gradient(90deg, ${h2.color}, ${h1.color}, ${h2.color});
  border-radius: 2px;
}

h1::before { top: 0; }
h1::after { bottom: 0; }

h2 {
  color: ${h2.color};
  font-size: ${h2.fontSize / 100}em;
  font-weight: ${h2.bold ? 700 : 400};
  font-style: ${h2.italic ? 'italic' : 'normal'};
  text-decoration: ${h2.underline ? 'underline' : 'none'};
  margin: 1.8em 0 1em;
  padding: 0.6em 1em;
  background: linear-gradient(90deg, ${h2.color}12 0%, transparent 100%);
  border-left: 5px solid ${h2.color};
  border-radius: 0 6px 6px 0;
}

h3 {
  color: ${h3.color};
  font-size: ${h3.fontSize / 100}em;
  font-weight: ${h3.bold ? 700 : 400};
  font-style: ${h3.italic ? 'italic' : 'normal'};
  text-decoration: ${h3.underline ? 'underline' : 'none'};
  margin: 1.5em 0 0.8em;
  padding: 0.4em 0;
  border-bottom: 2px dashed ${h3.color}50;
}

p {
  color: var(--text-primary);
  text-indent: 2em;
  line-height: 1.75;
  margin-bottom: 1.3em;
  text-align: justify;
}

p:nth-child(odd) { color: var(--text-primary); }
p:nth-child(even) { color: var(--text-secondary); }

p b:first-child, p strong:first-child {
  color: ${firstSentence.color};
  font-size: ${firstSentence.fontSize / 100}em;
  font-weight: ${firstSentence.bold ? 700 : 400};
  font-style: ${firstSentence.italic ? 'italic' : 'normal'};
  text-decoration: ${firstSentence.underline ? 'underline' : 'none'};
  display: inline-block;
  padding: 0.15em 0.5em;
  background: linear-gradient(90deg, ${firstSentence.color}18, transparent);
  border-radius: 4px;
  margin-right: 0.2em;
}

b, strong { 
  color: ${h1.color}; 
  font-weight: 600; 
}

a {
  color: ${link};
  text-decoration: none;
  font-weight: 500;
  border-bottom: 2px solid ${link}40;
  transition: all 0.2s;
}

blockquote {
  border: none;
  margin: 1.5em 0;
  padding: 1.2em 1.5em;
  background: linear-gradient(135deg, ${blockquote}10, ${blockquote}05);
  color: var(--text-secondary);
  border-radius: 8px;
  position: relative;
  font-style: italic;
}

blockquote::before {
  content: '"';
  position: absolute;
  top: -5px;
  left: 10px;
  font-size: 3em;
  color: ${blockquote}30;
  font-family: Georgia, serif;
}

code, pre {
  background-color: #37474F;
  color: #ECEFF1;
  padding: 3px 8px;
  border-radius: 4px;
  font-family: "Fira Code", "Source Code Pro", monospace;
  font-size: 0.9em;
}

pre {
  padding: 1em 1.2em;
  margin: 1.5em 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

hr {
  border: none;
  height: 3px;
  background: linear-gradient(90deg, transparent, ${h1.color}40, ${h2.color}40, transparent);
  margin: 2.5em 0;
  border-radius: 2px;
}

table { 
  border-collapse: separate; 
  border-spacing: 0;
  margin: 1.5em 0;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
th, td { 
  border: none;
  padding: 12px 16px; 
  text-align: left;
}
th { 
  background: linear-gradient(90deg, ${h1.color}, ${h2.color});
  color: white;
  font-weight: 600;
}
td {
  background-color: ${bg};
  border-bottom: 1px solid ${h1.color}15;
}
tr:last-child td {
  border-bottom: none;
}`;
};

const generateClassicCSS = (settings: Partial<StyleSettings>): string => {
  const bg = settings.bg || '#F5F0E6';
  const text = settings.text || '#2C2416';
  const textSecondary = settings.textSecondary || '#5A4D3A';
  const h1 = settings.h1 || { color: '#6B3E26', bold: true, italic: false, underline: false, fontSize: 170 };
  const h2 = settings.h2 || { color: '#8B5A2B', bold: true, italic: false, underline: false, fontSize: 140 };
  const h3 = settings.h3 || { color: '#6B4423', bold: true, italic: false, underline: false, fontSize: 120 };
  const firstSentence = settings.firstSentence || { color: '#6B3E26', bold: true, italic: true, underline: false, fontSize: 105 };
  const link = settings.link || '#8B4513';
  const blockquote = settings.blockquote || '#6B4423';

  return `/* Classic Style - Elegant, Traditional, Paper-like */
:root {
  --bg-primary: ${bg};
  --text-primary: ${text};
  --text-secondary: ${textSecondary};
  --h1-color: ${h1.color};
  --h2-color: ${h2.color};
  --h3-color: ${h3.color};
  --first-sentence: ${firstSentence.color};
  --link-color: ${link};
  --blockquote-color: ${blockquote};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Noto Serif CJK SC", "Source Han Serif CN", "AR PL UMing CN", "Georgia", "Times New Roman", serif;
  font-size: 1.05rem;
  line-height: 1.85;
  background-color: var(--bg-primary);
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(139, 69, 19, 0.02) 28px,
      rgba(139, 69, 19, 0.02) 29px
    );
  color: var(--text-primary);
  max-width: 40rem;
  margin: 0 auto;
  padding: 3em 2em;
  text-align: justify;
}

h1 {
  color: ${h1.color};
  font-size: ${h1.fontSize / 100}em;
  font-weight: ${h1.bold ? 700 : 400};
  font-style: ${h1.italic ? 'italic' : 'normal'};
  text-decoration: ${h1.underline ? 'underline' : 'none'};
  text-align: center;
  margin: 2em 0 1.5em;
  padding: 1em 0;
  position: relative;
  letter-spacing: 0.2em;
}

h1::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, ${h1.color}, transparent);
}

h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, ${h1.color}, transparent);
}

h2 {
  color: ${h2.color};
  font-size: ${h2.fontSize / 100}em;
  font-weight: ${h2.bold ? 700 : 400};
  font-style: ${h2.italic ? 'italic' : 'normal'};
  text-decoration: ${h2.underline ? 'underline' : 'none'};
  margin: 1.8em 0 1em;
  padding: 0.5em 1em;
  border: 1px solid ${h2.color}40;
  border-left: 4px solid ${h2.color};
  background: linear-gradient(90deg, ${h2.color}08, transparent);
}

h3 {
  color: ${h3.color};
  font-size: ${h3.fontSize / 100}em;
  font-weight: ${h3.bold ? 600 : 400};
  font-style: ${h3.italic ? 'italic' : 'normal'};
  text-decoration: ${h3.underline ? 'underline' : 'none'};
  margin: 1.5em 0 0.8em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid ${h3.color}30;
}

p {
  color: var(--text-primary);
  text-indent: 2em;
  line-height: 1.85;
  margin-bottom: 1.3em;
  text-align: justify;
}

p:nth-child(odd) { color: var(--text-primary); }
p:nth-child(even) { color: var(--text-secondary); }

p b:first-child, p strong:first-child {
  color: ${firstSentence.color};
  font-size: ${firstSentence.fontSize / 100}em;
  font-weight: ${firstSentence.bold ? 600 : 400};
  font-style: ${firstSentence.italic ? 'italic' : 'normal'};
  text-decoration: ${firstSentence.underline ? 'underline' : 'none'};
}

b, strong { 
  color: ${h1.color}; 
  font-weight: 600; 
}

a {
  color: ${link};
  text-decoration: underline;
  text-decoration-style: wavy;
  text-underline-offset: 3px;
}

blockquote {
  border-left: 3px double ${blockquote};
  border-right: 3px double ${blockquote};
  margin: 1.5em 0;
  padding: 1em 1.5em;
  background-color: rgba(139, 69, 19, 0.04);
  color: var(--text-secondary);
  font-style: italic;
}

code, pre {
  background-color: rgba(139, 69, 19, 0.08);
  color: ${text};
  padding: 2px 6px;
  border-radius: 2px;
  font-family: "Courier New", "Noto Sans Mono CJK SC", monospace;
  font-size: 0.9em;
  border: 1px solid ${h1.color}20;
}

pre {
  padding: 1em;
  margin: 1.5em 0;
  overflow-x: auto;
}

hr {
  border: none;
  border-top: 1px solid ${h1.color}30;
  border-bottom: 1px solid ${h1.color}10;
  margin: 2.5em auto;
  width: 50%;
  height: 0;
}

table { 
  border-collapse: collapse; 
  margin: 1.5em auto;
  font-size: 0.95em;
}
th, td { 
  border: 1px solid ${h1.color}40; 
  padding: 8px 14px; 
}
th { 
  background-color: ${h1.color}12; 
  color: ${h1.color};
  font-weight: 600;
  border-bottom: 2px solid ${h1.color}60;
}`;
};

export const cssTemplates: CSSTemplate[] = [
  {
    id: 'novel',
    nameKey: 'templates.novel.name',
    descriptionKey: 'templates.novel.description',
    generateCSS: generateNovelCSS,
  },
  {
    id: 'technical',
    nameKey: 'templates.technical.name',
    descriptionKey: 'templates.technical.description',
    generateCSS: generateTechnicalCSS,
  },
  {
    id: 'magazine',
    nameKey: 'templates.magazine.name',
    descriptionKey: 'templates.magazine.description',
    generateCSS: generateMagazineCSS,
  },
  {
    id: 'classic',
    nameKey: 'templates.classic.name',
    descriptionKey: 'templates.classic.description',
    generateCSS: generateClassicCSS,
  },
];

export const getTemplateById = (id: string): CSSTemplate | undefined => {
  return cssTemplates.find(template => template.id === id);
};

export default cssTemplates;
