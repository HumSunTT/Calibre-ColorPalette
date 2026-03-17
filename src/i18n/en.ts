export default {
  title: 'Color Palette',
  subtitle: 'Generate professional color schemes, export Calibre CSS styles',
  
  presets: {
    title: 'Color Presets',
  },
  
  colorInput: {
    title: 'Color Input',
    hexLabel: 'HEX Color',
    hexError: 'Please enter a valid HEX value',
    random: 'Random',
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
    savedAt: 'Saved at',
    empty: 'No saved palettes yet',
  },
  
  footer: {
    tip: '💡 Click color card to copy, click "Export CSS" for reader styles',
  },
  
  notification: {
    saved: '✅ Palette saved!',
  },
};