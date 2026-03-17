export default {
  title: 'カラーパレット',
  subtitle: 'プロフェッショナルな配色スキームを生成、Calibre CSSスタイルをエクスポート',
  
  presets: {
    title: 'プリセット色系',
  },
  
  colorInput: {
    title: '色入力',
    hexLabel: 'HEX色値',
    hexError: '有効なHEX値を入力してください',
    random: 'ランダム',
    pickColor: '画面から採色',
    pickColorNotSupported: 'お使いのブラウザは画面採色に対応していません。Chrome/Edgeをご利用ください',
    pickColorHint: '🎯ボタンで画面の任意の場所から色を採取できます',
  },
  
  colorPreview: {
    title: '現在の色',
  },
  
  textPreview: {
    title: '📖 電子書籍プレビュー',
    editStyle: '🎨 スタイル編集',
    exportCSS: '📦 CSSエクスポート',
    bg: '背景',
    text: '文字',
    copied: 'コピーしました!',
    copyFailed: 'コピー失敗、手動でコピーしてください',
  },
  
  styleEditor: {
    title: '🎨 スタイルエディタ',
    basicColors: '基本色',
    bg: '背景',
    mainText: 'メインテキスト',
    secondaryText: 'サブテキスト',
    link: 'リンク',
    blockquote: '引用',
    titleStyles: 'タイトルスタイル',
    h1Chapter: 'H1 章',
    h2Section: 'H2 節',
    h3Subsection: 'H3 小節',
    firstSentence: '最初の文',
    color: '色',
    fontSize: 'サイズ',
  },
  
  cssModal: {
    title: '📦 Calibre CSSスタイル',
    copy: '📋 CSSをコピー',
    copied: '✓ クリップボードにコピーしました',
    selectAll: '全選択',
    usage: '使い方：',
    step1: 'Calibre電子書籍リーダーを開く',
    step2: '環境設定 → 外観 → スタイル',
    step3: 'CSSをスタイルボックスに貼り付け',
    step4: '適用をクリック',
    tip: 'ヒント：CSSコードは直接選択できます',
  },
  
  schemes: {
    title: '配色スキーム',
    save: '💾 保存',
    triadic: 'トライアド',
    square: 'スクエア',
    'split-complementary': 'スプリット',
    monochromatic: 'モノクロ',
    'double-complementary': 'ダブル',
    compound: 'コンパウンド',
    shades: 'シェード',
    neutral: 'ニュートラル',
    'five-tone': 'ファイブ',
    'six-tone': 'シックス',
  },
  
  schemeDescriptions: {
    triadic: '等間隔の3色、バランス良好',
    square: '等間隔の4色、変化豊富',
    'split-complementary': 'ベース色＋補色の両隣',
    monochromatic: '同じ色相、異なる明度',
    'double-complementary': '2組の補色',
    compound: '類似色＋補色',
    shades: '同じ色調、異なる彩度',
    neutral: 'グレートーン追加、柔らかい',
    'five-tone': '5等分の色',
    'six-tone': '6等分の色',
  },
  
  sampleText: {
    chapter: '第一章 出会い',
    section1: '第一節 巡り合い',
    paragraph1: '晩秋の夕暮れ時だった。夕日が古い石畳に金色の光を投げかけていた。林暁はカフェの窓際に立ち、外を急ぐ人々を眺めながら、胸に奇妙な期待が湧き上がるのを感じていた。',
    dialog: '「ラテになります、どうぞ」。店員の声で、彼女の彷徨う思考は中断された。',
    paragraph2: '林暁は微笑んでコーヒーを受け取った。ふと、隅の静かな人影に目が留まった。その人は黄ばんだ古い本に熱心に目を落とし、周囲の喧騒がまるで関係ないかのようだった。',
    section2: '第二節 心動',
    paragraph3: 'その瞬間、運命が静かに動き出した。彼女は想像もしなかった。偶然の出会いが、その後の人生の軌跡を変えることになるとは。窓の外では秋風がそよぎ、数枚の黄金色の落ち葉が空中で舞いながら遠くへ流れていった。',
  },
  
  savedPalettes: {
    title: '💝 保存したパレット',
    expand: '展開',
    collapse: '閉じる',
    baseColor: 'ベース色',
    delete: '🗑️ 削除',
    savedAt: '保存日時',
    empty: '保存したパレットはありません',
  },
  
  footer: {
    tip: '💡 カラーカードをクリックしてコピー、「CSSエクスポート」でリーダースタイルを取得',
  },
  
  notification: {
    saved: '✅ パレットを保存しました!',
  },
};