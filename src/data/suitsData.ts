export interface SuitElementData {
  id: string;
  name: string;
  nameEn: string;
  element: string;
  elementEn: string;
  icon: string;
  color: string; // Tailwind用カラークラス（テキスト）
  bgClass: string; // カード背景用
  borderClass: string; // ホバー時枠線用
  badgeBg: string; // バッジ用背景
  keywords: string[];
  symbolism: string;
  psychological: string;
  inquiry: string;
}

export const SUITS_DATA: SuitElementData[] = [
  {
    id: "wands",
    name: "ワンド（棍棒）",
    nameEn: "Wands",
    element: "火",
    elementEn: "Fire",
    icon: "🪄",
    color: "text-[#d97706]", // アンバー・ゴールド系
    bgClass: "bg-[#fffbeb]/90",
    borderClass: "hover:border-[#d97706]/50",
    badgeBg: "bg-[#fef3c7] text-[#92400e]",
    keywords: ["情熱", "創造", "直感", "行動力", "エネルギー", "成長"],
    symbolism: "萌え出る若葉がついた木の棒。自然の生命力、絶え間なく上へと伸びゆく上昇志向、 tenderly 闇を照らす内なる情熱の火花を象徴しています。",
    psychological: "自己表現への強い欲求や、理屈抜きで「やってみたい」と沸き起こる衝動を表します。新しい挑戦へと一歩を踏み出すための原動力となる、生命エネルギーそのものです。",
    inquiry: "今、あなたの心の中で熱く燃えている関心事や情熱は何ですか？ まだ形になっていなくても、直感的に惹かれるものはありますか？"
  },
  {
    id: "cups",
    name: "カップ（聖杯）",
    nameEn: "Cups",
    element: "水",
    elementEn: "Water",
    icon: "🍷",
    color: "text-[#2563eb]", // ブルー系
    bgClass: "bg-[#eff6ff]/90",
    borderClass: "hover:border-[#2563eb]/50",
    badgeBg: "bg-[#dbeafe] text-[#1e40af]",
    keywords: ["感情", "愛", "受容性", "無意識", "人間関係", "直感"],
    symbolism: "満たされた水を受け入れる器。絶えず形を変えながら流れる水は、私たちの移り変わる感情や、言葉にできない無意識の海、他者と深く繋がろうとする優しさを象徴しています。",
    psychological: "自らの感情に寄り添い、それを受け入れること（受容）。安定した他者との情緒的な結びつきを司ります。",
    inquiry: "あなたの心は今、どんな感情で満たされていますか？ あなた自身、または大切な人の本音や感受性に、そっと耳を傾けられていますか？"
  },
  {
    id: "swords",
    name: "ソード（剣）",
    nameEn: "Swords",
    element: "風",
    elementEn: "Air",
    icon: "⚔️",
    color: "text-[#0d9488]", // ティール・グリーン系
    bgClass: "bg-[#f0fdfa]/90",
    borderClass: "hover:border-[#0d9488]/50",
    badgeBg: "bg-[#ccfbf1] text-[#115e59]",
    keywords: ["知性", "論理", "思考", "客観性", "決断", "葛藤"],
    symbolism: "鋭く研ぎ澄まされた両刃の剣。物事を鋭く分析して善悪を切り分ける知性と論理の力、そして言葉の鋭さを表します。また、風が雲を吹き払うように、迷いを断ち切る決断の象徴でもあります。",
    psychological: "感情に流されず客観的な事実を見据え、思考によって秩序をもたらす領域です。しかし、考えすぎによる精神的な葛藤（自分を責める刃）や、他者との論理的な対立をも内包します。",
    inquiry: "あなたが現在直面している問題に対して、感情を脇に置き、客観的に真実を見つめられていますか？ 何かを断ち切り、決断すべきことはありますか？"
  },
  {
    id: "pentacles",
    name: "ペンタクル（金貨）",
    nameEn: "Pentacles",
    element: "地",
    elementEn: "Earth",
    icon: "🪙",
    color: "text-[#78350f]", // ブラウン・アース系
    bgClass: "bg-[#faf7f2]/90",
    borderClass: "hover:border-[#78350f]/50",
    badgeBg: "bg-[#f3ece2] text-[#78350f]",
    keywords: ["現実", "物質", "身体", "成果", "安定", "価値観"],
    symbolism: "五芒星（ペンタグラム）が刻まれた黄金のコイン。種がまかれ、豊かな実りをもたらす肥沃な大地。私たちが手にできる具体的な成果、職人芸、そして日々の暮らしの安定を象徴します。",
    psychological: "現実に形にすることの価値。また、自分の五感を通じた身体的感覚、あるいは長い時間をかけて培ってきた才能や価値観を信じ、じっくりと安定を育む姿勢を表します。",
    inquiry: "あなたの日常生活における健康状態や、仕事・生活といった「現実的な基盤」は満たされていますか？ あなたが今、大切に育てている具体的な果実は何ですか？"
  }
];
