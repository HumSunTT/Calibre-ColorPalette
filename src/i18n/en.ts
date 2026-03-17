export default {
  title: 'Calibre Color Palette',
  subtitle: 'Generate professional color schemes, export Calibre reader styles',
  
  presets: {
    title: 'Color Presets',
  },
  
  colorInput: {
    title: 'Color Input',
    hexLabel: 'HEX Color',
    hexError: 'Please enter a valid HEX value',
    random: 'Random',
    pickColor: 'Pick from Screen',
    pickColorNotSupported: 'Your browser does not support color picker. Please use Chrome/Edge.',
    pickColorHint: 'Click 🎯 to pick color from anywhere on screen',
  },
  
  colorPreview: {
    title: 'Current Color',
  },
  
  textPreview: {
    title: '📖 E-book Preview',
    editStyle: '🎨 Edit Style',
    exportCSS: '📦 Export CSS',
    bg: 'BG',
    text: 'Text',
    copied: 'Copied!',
    copyFailed: 'Copy failed, please copy manually',
  },
  
  styleEditor: {
    title: '🎨 Style Editor',
    basicColors: 'Basic Colors',
    bg: 'Background',
    mainText: 'Main Text',
    secondaryText: 'Secondary',
    link: 'Link',
    blockquote: 'Quote',
    titleStyles: 'Title Styles',
    h1Chapter: 'H1 Chapter',
    h2Section: 'H2 Section',
    h3Subsection: 'H3 Subsection',
    firstSentence: 'First Sentence',
    color: 'Color',
    fontSize: 'Size',
  },
  
  cssModal: {
    title: '📦 Calibre CSS Styles',
    copy: '📋 Copy CSS',
    copied: '✓ Copied to clipboard',
    selectAll: 'Select All',
    usage: 'How to use:',
    step1: 'Open Calibre e-reader',
    step2: 'Preferences → Look & Feel → Styles',
    step3: 'Paste CSS into style box',
    step4: 'Click Apply',
    tip: 'Tip: CSS code can be selected directly',
  },
  
  schemes: {
    title: 'Color Schemes',
    save: '💾 Save',
    triadic: 'Triadic',
    square: 'Square',
    'split-complementary': 'Split-Comp',
    monochromatic: 'Monochrome',
    'double-complementary': 'Double-Comp',
    compound: 'Compound',
    shades: 'Shades',
    neutral: 'Neutral',
    'five-tone': 'Five-Tone',
    'six-tone': 'Six-Tone',
  },
  
  schemeDescriptions: {
    triadic: 'Three equidistant colors, balanced',
    square: 'Four equidistant colors, varied',
    'split-complementary': 'Base + adjacent to complement',
    monochromatic: 'Same hue, different lightness',
    'double-complementary': 'Two complementary pairs',
    compound: 'Analogous + complementary',
    shades: 'Same hue, different saturation',
    neutral: 'Added gray tones, soft',
    'five-tone': 'Five equidistant colors',
    'six-tone': 'Six equidistant colors',
  },
  
  sampleText: {
    chapter: 'Chapter 1 First Encounter',
    section1: 'Section 1 The Meeting',
    paragraph1: 'It was a late autumn evening. The setting sun cast its golden light on the ancient stone road. Lin Xiao stood before the café window, watching the hurried passersby, a strange anticipation rising in her heart.',
    dialog: '"Your latte, enjoy," the server said softly, interrupting her wandering thoughts.',
    paragraph2: 'Lin Xiao smiled as she took the coffee, her gaze inadvertently falling on a quiet figure in the corner. That person was intently reading a yellowed old book, as if the surrounding noise had nothing to do with them.',
    section2: 'Section 2 Heartbeat',
    paragraph3: 'At that moment, fate quietly turned its wheel. She never imagined that a chance encounter would change her life\'s trajectory. Outside, the autumn breeze gently blew, sweeping up a few golden leaves that danced in the air before drifting into the distance.',
  },
  
  savedPalettes: {
    title: '💝 Saved Palettes',
    expand: 'Expand',
    collapse: 'Collapse',
    baseColor: 'Base',
    delete: '🗑️ Delete',
    rename: '✏️ Rename',
    savedAt: 'Saved at',
    empty: 'No saved palettes yet',
    exportJSON: '📤 Export',
    importJSON: '📥 Import',
    favorite: '⭐ Favorite',
    unfavorite: 'Unfavorite',
    tags: 'Tags',
    addTag: 'Add Tag',
    noTags: 'No tags',
  },
  
  footer: {
    tip: '💡 Click color card to copy, click "Export CSS" for reader styles',
  },
  
  notification: {
    saved: '✅ Palette saved!',
    importFailed: '❌ Import failed',
    exportFailed: '❌ Export failed',
  },
  
  contrast: {
    title: 'Contrast Check',
    ratio: 'Ratio',
    level: 'Level',
    pass: 'Pass',
    fail: 'Fail',
    aaa: 'AAA (≥7)',
    aa: 'AA (≥4.5)',
    check: 'Check Contrast',
    noContrast: 'Insufficient contrast',
  },
  
  theme: {
    title: 'Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    toggleTheme: 'Toggle Theme',
  },
  
  history: {
    undo: 'Undo',
    redo: 'Redo',
    noUndo: 'Nothing to undo',
    noRedo: 'Nothing to redo',
  },
  
  tags: {
    addTag: 'Add Tag',
    removeTag: 'Remove Tag',
    filterByTag: 'Filter by Tag',
    noTags: 'No tags',
  },
  
  imageExtractor: {
    title: 'Extract Colors from Image',
    upload: 'Upload Image',
    dropImage: 'Drop image here',
    extracting: 'Extracting colors...',
    extractSuccess: 'Colors extracted!',
    extractFailed: 'Extraction failed',
    supportedFormats: 'Supported: JPG, PNG, GIF, WebP',
    clickOrDrop: 'Click or drag image',
  },
  
  templates: {
    title: 'CSS Templates',
    novel: {
      name: 'Novel',
      description: 'Warm and comfortable for long reading',
    },
    technical: {
      name: 'Technical',
      description: 'Clean, structured, code-friendly',
    },
    magazine: {
      name: 'Magazine',
      description: 'Modern, dynamic, colorful',
    },
    classic: {
      name: 'Classic',
      description: 'Elegant, traditional, paper-like',
    },
  },
};