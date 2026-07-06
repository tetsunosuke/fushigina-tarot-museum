// ============================================================
// SOPHIA Online Museum — All 78 Tarot Cards Data (Scratch)
// ============================================================

import { TarotCard } from "./artMuseumData";

export const TAROT_CARDS_78: TarotCard[] = [
  {
    "id": "fool",
    "exhibitionNo": "EX-00",
    "acquisitionYear": "2015",
    "name": "愚者",
    "nameEn": "The Fool",
    "symbol": "0",
    "imagePath": "/tarot/0.jpg",
    "caption": "崖のふちに立つ若者が、上を見上げて一歩を踏み出そうとしている。足元では白い犬が警告するように吠えている。この絵画が問うのは「未知への一歩を踏み出す勇気があるか」という問いである。",
    "symbols": [
      {
        "id": "fool-cliff",
        "name": "崖のふち",
        "location": "足元右側",
        "highlightPassage": "崖のふちは危うさを示していますが、同時に新しい冒険や未知の世界への境界線でもあります。",
        "description": "安全な大地と、不安定な空中（未知の領域）との境界。危険を恐れずに踏み出す決意を促す。"
      },
      {
        "id": "fool-dog",
        "name": "白い犬",
        "location": "足元左側",
        "highlightPassage": "足元で吠える白い犬は、理性の警告や本能的な危険察知能力を表しています。",
        "description": "盲目的な前進に対する警告であり、同時に忠実な旅の伴侶でもある内なる理性の象徴。"
      }
    ]
  },
  {
    "id": "magician",
    "exhibitionNo": "EX-01",
    "acquisitionYear": "2018",
    "name": "魔術師",
    "nameEn": "The Magician",
    "symbol": "I",
    "imagePath": "/tarot/1.jpg",
    "caption": "机の前に立つ人物は、四つのスート（ワンド・カップ・ソード・ペンタクル）を手元に揃えている。上を指す右手と、下を指す左手。ウロボロスの帯が腰を巡る。この絵画が問うのは「始まりとは何か」という問いである。",
    "symbols": [
      {
        "id": "four-suits",
        "name": "机上の四つのスート",
        "location": "中央・机の上",
        "highlightPassage": "机上に並ぶ四つの道具は、あなたがすでに創造に必要なものをすべて持っていることを示しています。",
        "description": "ワンド（情熱・行動力）、カップ（感情・直感）、ソード（論理・言葉）、ペンタクル（現実・身体）の四つが揃う。これは創造に必要なすべての要素が手元にあることを意味する。"
      },
      {
        "id": "pointing-hands",
        "name": "上を指す右手・下を指す左手",
        "location": "中央・人物の両手",
        "highlightPassage": "上を指す右手は理想や意図を、下を指す左手は現実への実践を表し、その両手が媒介するのはあなた自身の能動的意思です。",
        "description": "「上のものは下のものの如く」というヘルメス哲学を体現する。理想を意図し、現実に実践する——その橋渡しをする能動的意思の象徴。"
      },
      {
        "id": "ouroboros",
        "name": "ウロボロスの帯",
        "location": "腰部",
        "highlightPassage": "ウロボロスが示すように、今この瞬間から始めることで循環が生まれ、終わりと始まりは同じ場所に存在します。",
        "description": "検の尾を噛む蛇＝ウロボロスは永遠の循環を意味する。「いつ始めるか」という問いへの答えは「今この瞬間」であることを示す。"
      },
      {
        "id": "wand-raised",
        "name": "掲げられたワンド",
        "location": "右手の先",
        "highlightPassage": "掲げられた杖（ワンド）は、まだ形のない可能性を天から引き下ろし、地上の現実へと変換しようとする意志の象徴です。",
        "description": "ワンドは行動・情熱・意志の象徴。それを天に向けて掲げることで、潜在的なエネルギーを意識的な行為へと転換しようとしている。"
      }
    ]
  },
  {
    "id": "high-priestess",
    "exhibitionNo": "EX-02",
    "acquisitionYear": "2017",
    "name": "女教皇",
    "nameEn": "The High Priestess",
    "symbol": "II",
    "imagePath": "/tarot/2.jpg",
    "caption": "白と黒の二本の柱の間に座る女性。手には律法（TORA）の巻物を持ち、足元には三日月が輝く。この絵画が問うのは「言葉にできない直感を信じるか」という問いである。",
    "symbols": [
      {
        "id": "priestess-pillars",
        "name": "白と黒の柱（JとB）",
        "location": "人物の左右",
        "highlightPassage": "黒い柱と白い柱は、光と影、意識と無意識という世界の二面性を示しています。",
        "description": "ソロモン神殿の柱「ヤヒンとボアズ」とされる。対立する二つの力が調和する境界に知恵が存在することを示す。"
      },
      {
        "id": "priestess-scroll",
        "name": "TORAの巻物",
        "location": "手元",
        "highlightPassage": "手に隠し持たれた巻物は、表立って語られない隠された真理や無意識の知識を表しています。",
        "description": "律法の書であり、すべてを露わにせず一部を衣で隠すことで、直感的・内省的な理解が必要であることを示す。"
      }
    ]
  },
  {
    "id": "empress",
    "exhibitionNo": "EX-03",
    "acquisitionYear": "2018",
    "name": "女帝",
    "nameEn": "The Empress",
    "symbol": "III",
    "imagePath": "/tarot/3.jpg",
    "caption": "豊かな森と麦畑に囲まれ、ふかふかのクッションに座る女性。頭上には12の星の冠が輝く。この絵画が問うのは「自己や周囲を十分に満たしているか」という問いである。",
    "symbols": [
      {
        "id": "empress-wheat",
        "name": "豊かな麦畑",
        "location": "手前下部",
        "highlightPassage": "実った麦畑は、物質的・精神的な豊かさと、努力が実を結ぶ収穫の時を表しています。",
        "description": "大地の恵みと生産力、育まれてきたアイデアや関係が成熟した状態を示す。"
      },
      {
        "id": "empress-stars",
        "name": "12の星の冠",
        "location": "頭上",
        "highlightPassage": "頭上の十二の星は、一年の十二ヶ月や時間のサイクルを支配し、自然の調和を示す知恵を象徴しています。",
        "description": "12星座や宇宙の秩序を表し、自然の流れに逆らわず受け入れることの重要性を示す。"
      }
    ]
  },
  {
    "id": "emperor",
    "exhibitionNo": "EX-04",
    "acquisitionYear": "2019",
    "name": "皇帝",
    "nameEn": "The Emperor",
    "symbol": "IV",
    "imagePath": "/tarot/4.jpg",
    "caption": "荒涼とした山々を背に、彫刻の施された石の玉座に座る年長者。手にはアンクの笏を持ち、威厳を放つ。この絵画が問うのは「自らの秩序と責任で境界を守れているか」という問いである。",
    "symbols": [
      {
        "id": "emperor-throne",
        "name": "牡羊の石の玉座",
        "location": "中央・玉座",
        "highlightPassage": "強固な石の玉座は揺るぎない社会的基盤と、理性による絶対的な統治力を表しています。",
        "description": "四隅に牡羊の頭が彫られた石の玉座。冷徹でありながら確固たるシステムと規律、社会秩序の象徴。"
      },
      {
        "id": "emperor-ankh",
        "name": "アンクの笏",
        "location": "右手",
        "highlightPassage": "右手に握られたアンク（生命の鍵）は、生命を維持し支配する正当な権力を示しています。",
        "description": "エジプトの生命のシンボルであり、自己の人生や組織における主導権を自分で握る意思を意味する。"
      }
    ]
  },
  {
    "id": "hierophant",
    "exhibitionNo": "EX-05",
    "acquisitionYear": "2020",
    "name": "法王",
    "nameEn": "The Hierophant",
    "symbol": "V",
    "imagePath": "/tarot/5.jpg",
    "caption": "神殿の二本の柱の間で、二人の参拝者に教えを説く聖職者。右手は祝福を授け、左手には三重の十字架を持つ。この絵画が問うのは「信頼に足る教えや伝統を継承しているか」という問いである。",
    "symbols": [
      {
        "id": "hierophant-keys",
        "name": "交差する二つの鍵",
        "location": "足元中央",
        "highlightPassage": "足元の二つの鍵は、顕在意識と潜在意識の対話を仲介し、秘密を解き明かす鍵を示しています。",
        "description": "天界と地上の法をつなぐ鍵。制度や教育を通じて謎が解き明かされ、導きが得られることを象徴。"
      },
      {
        "id": "hierophant-cross",
        "name": "三重の十字架",
        "location": "左手",
        "highlightPassage": "三重の十字架は、精神・身体・魂という三つの領域における統合された権威を表しています。",
        "description": "神・人・大地の三界、または霊・魂・肉体の三位一体の秩序を表し、高次の教えや指針を示す。"
      }
    ]
  },
  {
    "id": "lovers",
    "exhibitionNo": "EX-06",
    "acquisitionYear": "2020",
    "name": "恋人",
    "nameEn": "The Lovers",
    "symbol": "VI",
    "imagePath": "/tarot/6.jpg",
    "caption": "二人の人物の上に天使が広げた翼を持つ。女性の背後には善悪知識の木と蛇、男性の背後には炎の木。中央に立つ天使は、どちらにも同じ距離から光を照らしている。この絵画が問うのは「選択とは誰のためのものか」という問いである。",
    "symbols": [
      {
        "id": "angel",
        "name": "中央の天使（ラファエル）",
        "location": "上部中央",
        "highlightPassage": "祝福する天使は外から与えられる正解ではなく、あなた自身の内なる声——本音と価値観の象徴です。",
        "description": "大天使ラファエルは「神の癒し」を意味する。ここでは外部からの命令ではなく、自己の内なる声・本音を照らすものとして描かれている。"
      },
      {
        "id": "knowledge-tree",
        "name": "善悪知識の木と蛇",
        "location": "左・女性の背後",
        "highlightPassage": "知識の木に巻きつく蛇は、選択には常に何かを知る痛みと責任が伴うことを示しています。",
        "description": "エデンの蛇は誘惑・知識・選択の複雑さを象徴する。選択するとは、単純な安心を手放すことでもある。"
      },
      {
        "id": "flame-tree",
        "name": "炎の木",
        "location": "右・男性の背後",
        "highlightPassage": "燃える木は消えることのない情熱と、選択への変容のエネルギーを表しています。",
        "description": "炎は変容・情熱・エネルギーの象徴。選択によって人は変容し、元には戻れないことを示す。"
      },
      {
        "id": "two-figures",
        "name": "二人の人物",
        "location": "中央下部",
        "highlightPassage": "向き合う二人は、自己の中にある異なる声——従いたい気持ちと、本当にしたいこと——の対話を表しています。",
        "description": "二人は外部の誰かとの関係ではなく、自己の内側にある二つの声の対話として読むこともできる。"
      }
    ]
  },
  {
    "id": "chariot",
    "exhibitionNo": "EX-07",
    "acquisitionYear": "2016",
    "name": "戦車",
    "nameEn": "The Chariot",
    "symbol": "VII",
    "imagePath": "/tarot/7.jpg",
    "caption": "星を散りばめた天蓋の戦車に乗り、二頭のスフィンクスを従える若い戦士。手綱はなく、ただ意思の力で進む方向を制御している。この絵画が問うのは「対立する衝動をコントロールし進めているか」という問いである。",
    "symbols": [
      {
        "id": "chariot-sphinxes",
        "name": "白黒のスフィンクス",
        "location": "手前下部",
        "highlightPassage": "逆方向を向く二頭のスフィンクスは、感情と理性という相反する内的衝動を示しています。",
        "description": "手綱でなく精神力によってのみ御される対照的な二つのエネルギー。自制心と統合力の象徴。"
      },
      {
        "id": "chariot-canopy",
        "name": "星の天蓋",
        "location": "戦車の上部",
        "highlightPassage": "星の天蓋は、地上の戦いが大いなる宇宙の法と大志のもとで行われていることを示しています。",
        "description": "高い理想と天からの加護、物質世界を超えた崇高な目的意識を表す。"
      }
    ]
  },
  {
    "id": "strength",
    "exhibitionNo": "EX-08",
    "acquisitionYear": "2017",
    "name": "力",
    "nameEn": "Strength",
    "symbol": "VIII",
    "imagePath": "/tarot/8.jpg",
    "caption": "頭上に無限大の記号を戴く女性が、獰猛なライオンの口を優しく閉じる。武力ではなく、慈愛と忍耐によって猛獣を鎮めている。この絵画が問うのは「自らの本能的な恐れや怒りを愛で包み込めるか」という問いである。",
    "symbols": [
      {
        "id": "strength-lion",
        "name": "手懐けられるライオン",
        "location": "中央右側",
        "highlightPassage": "ライオンは内に秘めた本能、情熱、あるいは恐れや怒りそのものを表しています。",
        "description": "抑圧するのでも支配するのでもなく、信頼と慈しみをもって本能と手を取り合うプロセスを示す。"
      },
      {
        "id": "strength-lemniscate",
        "name": "無限大（レムニスケート）",
        "location": "頭上",
        "highlightPassage": "頭上の無限大の記号は、精神の無限のエネルギーと尽きることのない忍耐力を示しています。",
        "description": "魔術師の帽子と同じ記号。精神的な強さ、自己統制力がもたらす無限の可能性を象徴する。"
      }
    ]
  },
  {
    "id": "hermit",
    "exhibitionNo": "EX-09",
    "acquisitionYear": "2018",
    "name": "隠者",
    "nameEn": "The Hermit",
    "symbol": "IX",
    "imagePath": "/tarot/9.jpg",
    "caption": "暗闇の山の頂に一人立ち、六角星の灯るランタンを掲げ、杖をつく老人。静寂の中で自らの内なる光だけを頼りに思索している。この絵画が問うのは「他者の喧騒を離れ、自らの中の真実を求めているか」という問いである。",
    "symbols": [
      {
        "id": "hermit-lantern",
        "name": "六角星のランタン",
        "location": "右手",
        "highlightPassage": "ランタンに灯る六角星は、他者を照らすためではなく、自分自身の足元を確実に一歩ずつ照らす知恵の光です。",
        "description": "ソロモンの封印（ダビデの星）が輝くランタン。客観的な知識ではなく、内的省察から生まれる直観的真理。"
      },
      {
        "id": "hermit-staff",
        "name": "黄金の杖",
        "location": "左手",
        "highlightPassage": "しっかりと握られた杖は、これまでに培ってきた自立した経験と揺るぎない自己信頼を表しています。",
        "description": "自己の経験に基づいた支え。外部の誰かに寄りかかることなく、自らの旅路を自分で歩む力の象徴。"
      }
    ]
  },
  {
    "id": "wheel-of-fortune",
    "exhibitionNo": "EX-10",
    "acquisitionYear": "2019",
    "name": "運命の輪",
    "nameEn": "Wheel of Fortune",
    "symbol": "X",
    "imagePath": "/tarot/10.jpg",
    "caption": "青空を背景に、不思議な文字が刻まれた巨大な輪が巡る。輪の周りには聖獣やスフィンクスが配されている。この絵画が問うのは「制御できない大きな変化や周期をどう受け止めるか」という問いである。",
    "symbols": [
      {
        "id": "wheel-letters",
        "name": "輪の文字（TORA/TARO）",
        "location": "中央・車輪",
        "highlightPassage": "輪に刻まれた文字は、終わりのない生命のサイクルと万物の流転を示しています。",
        "description": "ヘブライ文字とアルファベットが交互に並び、宇宙の周期運動や不可避の変化の法則を象徴。"
      },
      {
        "id": "wheel-beasts",
        "name": "四隅の聖獣",
        "location": "四隅",
        "highlightPassage": "本を読みふける四隅の聖獣は、変化の中でも変わることのない永遠の知恵と学びを示しています。",
        "description": "四つの固定星座（牡牛、獅子、鷲、人間＝水瓶）の象徴。激動する現実の中でも揺らがない本質を学ぶ重要性。"
      }
    ]
  },
  {
    "id": "justice",
    "exhibitionNo": "EX-11",
    "acquisitionYear": "2019",
    "name": "正義",
    "nameEn": "Justice",
    "symbol": "XI",
    "imagePath": "/tarot/11.jpg",
    "caption": "玉座に座る人物が、右手に剣、左手に天秤を持つ。表情は揺るぎなく、眼差しは正面を向いている。後方には紫のカーテンが垂れ、頭上には四角い冠が輝く。この絵画が問うのは「あなたは誰の基準で自分を測っているか」という問いである。",
    "symbols": [
      {
        "id": "scales",
        "name": "左手の天秤",
        "location": "左手",
        "highlightPassage": "天秤は平衡を測るものですが、何を両側に置くかを決めるのは、天秤を持つあなた自身です。",
        "description": "天秤は公正さ・バランス・判断の象徴。しかし重要なのは「何を測るか」の選択そのものが、すでに一つの判断であること。"
      },
      {
        "id": "sword",
        "name": "右手の剣",
        "location": "右手",
        "highlightPassage": "まっすぐ立つ剣は、論理と真実の力を示します。感情や他者の圧力に揺れず、自分の判断を言葉にして貫く力です。",
        "description": "剣は真実・論理・言語の象徴。曲がらないまっすぐな剣は、他者の評価や感情に揺れない客観的判断力を意味する。"
      },
      {
        "id": "crown",
        "name": "四角い冠",
        "location": "頭上",
        "highlightPassage": "四角い冠は権威の象徴ではなく、自己の中に定めた法則——他者ではなく自分が設けた基準——への服従を表しています。",
        "description": "四角形は安定・大地・現実の象徴。冠として頂くことで「外の権威ではなく自己の法則」への誠実さを示す。"
      },
      {
        "id": "purple-curtain",
        "name": "紫のカーテン",
        "location": "背後",
        "highlightPassage": "紫のカーテンは、その判断의 背後に深い内省と洞察の時間があることを示しています。即断ではなく、熟考の上の決断です。",
        "description": "紫は知恵・霊性・深い洞察の色。背後に控えることで「見えない内省のプロセス」を示す。"
      }
    ]
  },
  {
    "id": "hanged-man",
    "exhibitionNo": "EX-12",
    "acquisitionYear": "2015",
    "name": "吊るされた男",
    "nameEn": "The Hanged Man",
    "symbol": "XII",
    "imagePath": "/tarot/12.jpg",
    "caption": "生きているT字の木から、片足を縛られて逆さまに吊るされた男。しかしその表情は穏やかで、頭部からは眩しい後光が差している。この絵画が問うのは「あえて行動を止め、逆の視点から物事を見る覚悟があるか」という問いである。",
    "symbols": [
      {
        "id": "hanged-halo",
        "name": "後光（ハロー）",
        "location": "頭部",
        "highlightPassage": "逆光の中に輝く後光は、物理的な拘束の中で得られる精神的な解放と新しい悟りを示しています。",
        "description": "身体的自由を失うことで、かえって自己の内面や物事の別側面に対する認識が明晰になることの象徴。"
      },
      {
        "id": "hanged-wood",
        "name": "芽吹くT字の木",
        "location": "背景・木",
        "highlightPassage": "青々と芽吹く木は、一見すると停止している犠牲の時間が、実は新たな成長の土壌であるという事実を表しています。",
        "description": "生命ある木に吊るされていることは、この試練が生命力に溢れ、一時的な自己犠牲が成長につながることを示す。"
      }
    ]
  },
  {
    "id": "death",
    "exhibitionNo": "EX-13",
    "acquisitionYear": "2016",
    "name": "死神",
    "nameEn": "Death",
    "symbol": "XIII",
    "imagePath": "/tarot/13.jpg",
    "caption": "白馬に跨り、漆黒の甲冑を着た死神が、ゆっくりと進軍する。足元では王が倒れ、少女や聖職者が祈りを捧げる。遠くの二つの塔の間に太陽が沈む。この絵画が問うのは「終わりを受け入れ、新しい始まりのために手放せるか」という問いである。",
    "symbols": [
      {
        "id": "death-flag",
        "name": "白い薔薇の黒い旗",
        "location": "右手・旗",
        "highlightPassage": "黒い旗に描かれた白い薔薇は、古い形が滅びることで生まれる純粋な新生と再生の約束です。",
        "description": "生と死のサイクルにおいて、解体（死）の後にのみ、純粋な形（白薔薇）での再生が可能であることを示す。"
      },
      {
        "id": "death-sun",
        "name": "地平線の太陽と二つの塔",
        "location": "背景の奥",
        "highlightPassage": "二つの塔の間に沈む（あるいは昇る）太陽は、境界を超えて生命が不滅であるという巡環を示しています。",
        "description": "死は絶対的な終焉ではなく、次への移行であるという境界。不死と復活の象徴。"
      }
    ]
  },
  {
    "id": "temperance",
    "exhibitionNo": "EX-14",
    "acquisitionYear": "2017",
    "name": "節制",
    "nameEn": "Temperance",
    "symbol": "XIV",
    "imagePath": "/tarot/14.jpg",
    "caption": "片足を水に、もう片足を大地に置き、二つの杯の間で絶え間なく流れる水を移し替える天使。極端な偏りを避け、中庸を保ちながらエネルギーを循環させている。この絵画が問うのは「相反する力を自らの中で調和させられるか」という問いである。",
    "symbols": [
      {
        "id": "temperance-flow",
        "name": "杯の間の水流",
        "location": "手元・二つの杯",
        "highlightPassage": "重力に逆らうように斜めに流れる水は、異なる性質のものを融合させる意思と錬金術的な調和を表しています。",
        "description": "水（感情）と光、あるいは二つの二面性を持つ力を慎重に混合し、新しい価値を創造する中庸の知恵。"
      },
      {
        "id": "temperance-foot",
        "name": "水と大地の両足",
        "location": "足元",
        "highlightPassage": "片足を無意識（水）に、もう片足を現実（大地）に置く姿勢は、直感と理性の両立を示しています。",
        "description": "精神世界と現実世界に同時に足をかけ、どちらにも溺れることなくバランスをとる姿勢の象徴。"
      }
    ]
  },
  {
    "id": "devil",
    "exhibitionNo": "EX-15",
    "acquisitionYear": "2018",
    "name": "悪魔",
    "nameEn": "The Devil",
    "symbol": "XV",
    "imagePath": "/tarot/15.jpg",
    "caption": "角を持つ巨大な悪魔が黒い祭壇の上に立ち、足元で男女が首に鎖を巻かれて繋がれている。しかし、鎖は緩く、本人がその気になれば外せるように見える。この絵画が問うのは「自らを縛り付けている執着の正体を見破れるか」という問いである。",
    "symbols": [
      {
        "id": "devil-chains",
        "name": "緩い首の鎖",
        "location": "足元の男女の首",
        "highlightPassage": "ゆるく繋がれた鎖は、あなたが囚われている拘束が、実はあなた自身の依存や諦めによって維持されていることを示しています。",
        "description": "他人の力で縛られているのではなく、自分でその不自由を選択し、安住してしまっている甘えや恐怖の象徴。"
      },
      {
        "id": "devil-torch",
        "name": "下を向いた松明",
        "location": "悪魔の左手",
        "highlightPassage": "下を向けられた松明の炎は、知性や情熱が物質的な欲望や盲目的な執着のために消費されていることを表しています。",
        "description": "高次の目的のためではなく、本能的・物質的盲執のためにエネルギーを無駄遣いしていることの象徴。"
      }
    ]
  },
  {
    "id": "tower",
    "exhibitionNo": "EX-16",
    "acquisitionYear": "2019",
    "name": "塔",
    "nameEn": "The Tower",
    "symbol": "XVI",
    "imagePath": "/tarot/16.jpg",
    "caption": "暗闇の空から落雷を受け、王冠が吹き飛ぶ石造りの塔。二人の人物が真っ逆さまに落下している。強固に築いたはずの幻想が崩壊する劇的な瞬間。この絵画が問うのは「作られた安全に安住せず、崩壊から真実を見出せるか」という問いである。",
    "symbols": [
      {
        "id": "tower-lightning",
        "name": "天からの稲妻",
        "location": "塔の頂点",
        "highlightPassage": "塔を穿つ稲妻は、虚飾の平和や自己欺瞞の防壁を突如として打ち砕く、冷徹な真実の光です。",
        "description": "突然の気づき、避けられないパラダイムシフト。防ぎようのない外部的・内発的な衝撃の象徴。"
      },
      {
        "id": "tower-crown",
        "name": "落下する王冠",
        "location": "塔の上空",
        "highlightPassage": "吹き飛ぶ王冠は、偽りの権威や自己の傲慢、積み上げた偽りのステータスが崩れ去ることを示しています。",
        "description": "エゴの防壁の頂点が取り除かれることで、虚勢から解放され、強制的に裸の現実と向き合わされる。"
      }
    ]
  },
  {
    "id": "star",
    "exhibitionNo": "EX-17",
    "acquisitionYear": "2020",
    "name": "星",
    "nameEn": "The Star",
    "symbol": "XVII",
    "imagePath": "/tarot/17.jpg",
    "caption": "満天の星空の下、一人の裸の女性が二つの水瓶から大地と泉に水を注ぐ。背後には鳥がとまる木があり、大きな八角の星がひときわ明るく輝く。この絵画が問うのは「すべての見返りを求めず、ただ希望を注ぎ出せるか」という問いである。",
    "symbols": [
      {
        "id": "star-pitchers",
        "name": "二つの水瓶",
        "location": "手元",
        "highlightPassage": "惜しみなく大地と水面に注がれる水は、枯れることのない愛と直感を世界へ還元する無私の姿勢を表しています。",
        "description": "一方は潜在意識の泉へ波紋を広げ、もう一方は大地を潤し豊かな緑を育む。与え続けることへの信頼。"
      },
      {
        "id": "star-ibis",
        "name": "木にとまる鳥（トキ）",
        "location": "右奥の木",
        "highlightPassage": "木にとまる聖なる鳥は、夜が明け、新しい意識の夜明けが近づいていることを告げるメッセンジャーです。",
        "description": "エジプトのトート神の象徴であるトキ。知恵と再生、嵐が去った後の新しいサイクルの訪れを示す。"
      }
    ]
  },
  {
    "id": "moon",
    "exhibitionNo": "EX-18",
    "acquisitionYear": "2015",
    "name": "月",
    "nameEn": "The Moon",
    "symbol": "XVIII",
    "imagePath": "/tarot/18.jpg",
    "caption": "不気味に歪む月が空に浮かび、地上の塔の間で犬と狼が吼え交わす。水面からは一匹のザリガニが這い出ようとしている。曖昧で幻想的な不安と無意識の世界。この絵画が問うのは「形のない不安を拒絶せず、そこから這い上がる知恵を紡げるか」という問いである。",
    "symbols": [
      {
        "id": "moon-crayfish",
        "name": "這い出るザリガニ",
        "location": "手前の池",
        "highlightPassage": "水底から這い上がるザリガニは、心の奥底（無意識）から湧き上がる原始的な不安や記憶の萌芽を示しています。",
        "description": "意識の表面へと這い上がろうとする初期衝動。直視し難い恐怖や抑圧された感情の象徴。"
      },
      {
        "id": "moon-animals",
        "name": "犬と狼",
        "location": "中央下部",
        "highlightPassage": "対峙する犬と狼は、飼い慣らされた理性（犬）と、野性的な恐怖や野生（狼）の葛藤を表しています。",
        "description": "人間の中にある社会的習慣と本能的恐怖。月明かりに照らされ、自己の持つ二つの顔が浮き彫りになる。"
      }
    ]
  },
  {
    "id": "sun",
    "exhibitionNo": "EX-19",
    "acquisitionYear": "2016",
    "name": "太陽",
    "nameEn": "The Sun",
    "symbol": "XIX",
    "imagePath": "/tarot/19.jpg",
    "caption": "燦然と輝く大きな太陽の顔。その下で、赤い旗を持った裸の子供が白馬に跨り、後方にはひまわりが咲き誇る。この絵画が問うのは「何の偽りもなく、あるがままの喜びを全身で表現できるか」という問いである。",
    "symbols": [
      {
        "id": "sun-child",
        "name": "白馬に乗る裸の子供",
        "location": "中央下部",
        "highlightPassage": "裸の子供は虚飾や秘密が一切ないこと、白馬はそれを運ぶ純粋な生命力と純潔を表しています。",
        "description": "無邪気さ、自己受容、社会的なペルソナ（仮面）を必要としない、ありのままの生き生きとした喜び。"
      },
      {
        "id": "sun-sunflowers",
        "name": "壁の向こうのひまわり",
        "location": "背景・灰色の壁の上",
        "highlightPassage": "灰色のレンガの壁を越えて咲くひまわりは、制限や過去を乗り越えた生命の勝利と祝福の象徴です。",
        "description": "太陽に向かって咲き誇る4輪のひまわり。自然界の繁栄、意識の明晰化、前向きな実現力を示す。"
      }
    ]
  },
  {
    "id": "judgement",
    "exhibitionNo": "EX-20",
    "acquisitionYear": "2017",
    "name": "審判",
    "nameEn": "Judgement",
    "symbol": "XX",
    "imagePath": "/tarot/20.jpg",
    "caption": "雲の中から大天使ミカエルが金色の喇叭を吹き鳴らす。その音色に呼応し、灰色の海に浮かぶ棺から、裸の人々が両手を広げて立ち上がる。この絵画が問うのは「過去の呪縛から目覚め、本来の自己を呼び戻す時が来たか」という問いである。",
    "symbols": [
      {
        "id": "judgement-trumpet",
        "name": "大天使の喇叭",
        "location": "上部中央",
        "highlightPassage": "響き渡る喇叭の音は、妥協していた過去の生き方を捨て、真の使命へ目覚めるための「内なる招集」です。",
        "description": "赤十字の旗がついた喇叭。大いなる天からの呼びかけ、自己への最終的な気づきの瞬間を告げる。"
      },
      {
        "id": "judgement-people",
        "name": "棺から立ち上がる人々",
        "location": "下部・海の上",
        "highlightPassage": "棺から蘇る人々は、抑圧されていた可能性や、死んでいた情熱が再び命を得る復活のプロセスを示しています。",
        "description": "水に浮かぶ棺は過去の限界。そこから裸で立ち上がるのは、再生と過去からの完全な解放を表す。"
      }
    ]
  },
  {
    "id": "world",
    "exhibitionNo": "EX-21",
    "acquisitionYear": "2018",
    "name": "世界",
    "nameEn": "The World",
    "symbol": "XXI",
    "imagePath": "/tarot/21.jpg",
    "caption": "月桂樹の輪の中に浮かび、両手に杖を持って軽やかに踊る人物。四隅には四つの聖獣が静かに見守る。すべてが完成し、調和した大団円の姿。この絵画が問うのは「旅の完結を祝い、新しい宇宙と一体になる準備はできたか」という問いである。",
    "symbols": [
      {
        "id": "world-wreath",
        "name": "月桂樹の輪（ウロボロス状）",
        "location": "中央・輪",
        "highlightPassage": "月桂樹の楕円の輪は、完成された境界線でありながら、次の次元へ移行するための扉でもあります。",
        "description": "勝利と栄光の月桂冠。結び目は無限大の形をし、終わりのない調和と、新たな旅への準備を示す。"
      },
      {
        "id": "world-dancer",
        "name": "踊る踊り子",
        "location": "輪の内側",
        "highlightPassage": "両手にワンドを持って踊る姿は、二面性のあるエネルギーを調和させ、人生というダンスを楽しんでいる象徴です。",
        "description": "男女の性質を内包し、重力から解放されて無限の調和の中で踊る、自己統合の極みのシンボル。"
      }
    ]
  },
  {
    "id": "wands-ace",
    "exhibitionNo": "EX-22",
    "acquisitionYear": "2021",
    "name": "ワンドのエース",
    "nameEn": "Ace of Wands",
    "symbol": "Wands Ace",
    "imagePath": "/tarot/w1.jpg",
    "caption": "『ワンドのエース』。雲から伸びる手と新緑の芽吹く杖が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、情熱的な新しい冒険やプロジェクトの種火。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-ace-sym1",
        "name": "雲から伸びる手",
        "location": "中央",
        "highlightPassage": "湧き上がる情熱の最初の一歩を表します。",
        "description": "情熱的な新しい冒険やプロジェクトの種火。"
      },
      {
        "id": "wands-ace-sym2",
        "name": "新緑の芽吹く杖",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、湧き上がる情熱の最初の一歩を表します。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-2",
    "exhibitionNo": "EX-23",
    "acquisitionYear": "2021",
    "name": "ワンドの2",
    "nameEn": "Two of Wands",
    "symbol": "Wands 2",
    "imagePath": "/tarot/w2.jpg",
    "caption": "『ワンドの2』。地球儀を見つめる男と二本の強固な杖が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、獲得した成果をもとに、さらなる展望を描く段階。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-2-sym1",
        "name": "地球儀を見つめる男",
        "location": "中央",
        "highlightPassage": "自らの意志で未知の未来への計画を立てる視野を示しています。",
        "description": "獲得した成果をもとに、さらなる展望を描く段階。"
      },
      {
        "id": "wands-2-sym2",
        "name": "二本の強固な杖",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、自らの意志で未知の未来への計画を立てる視野を示しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-3",
    "exhibitionNo": "EX-24",
    "acquisitionYear": "2021",
    "name": "ワンドの3",
    "nameEn": "Three of Wands",
    "symbol": "Wands 3",
    "imagePath": "/tarot/w3.jpg",
    "caption": "『ワンドの3』。海を見送る後ろ姿と立つ三本の杖が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、船出し、確信を持って将来の展開を待つ。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-3-sym1",
        "name": "海を見送る後ろ姿",
        "location": "中央",
        "highlightPassage": "行動を起こした後、その結果が実りとなって戻るのを待つ希望を表します。",
        "description": "船出し、確信を持って将来の展開を待つ。"
      },
      {
        "id": "wands-3-sym2",
        "name": "立つ三本の杖",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、行動を起こした後、その結果が実りとなって戻るのを待つ希望を表します。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-4",
    "exhibitionNo": "EX-25",
    "acquisitionYear": "2021",
    "name": "ワンドの4",
    "nameEn": "Four of Wands",
    "symbol": "Wands 4",
    "imagePath": "/tarot/w4.jpg",
    "caption": "『ワンドの4』。花輪が飾られた四本の杖と祝福の門が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、歓迎と休息、強固なコミュニティの確立。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-4-sym1",
        "name": "花輪が飾られた四本の杖",
        "location": "中央",
        "highlightPassage": "一つの段階が完了し、仲間と平和や安心を分かち合う祝福を示しています。",
        "description": "歓迎と休息、強固なコミュニティの確立。"
      },
      {
        "id": "wands-4-sym2",
        "name": "祝福の門",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、一つの段階が完了し、仲間と平和や安心を分かち合う祝福を示しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-5",
    "exhibitionNo": "EX-26",
    "acquisitionYear": "2021",
    "name": "ワンドの5",
    "nameEn": "Five of Wands",
    "symbol": "Wands 5",
    "imagePath": "/tarot/w5.jpg",
    "caption": "『ワンドの5』。競い合う五人の若者と交差する杖が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、悪意のない競争、切磋琢磨、内なる葛藤。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-5-sym1",
        "name": "競い合う五人の若者",
        "location": "中央",
        "highlightPassage": "互いに高め合うための葛藤や、意見の衝突による議論を表しています。",
        "description": "悪意のない競争、切磋琢磨、内なる葛藤。"
      },
      {
        "id": "wands-5-sym2",
        "name": "交差する杖",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、互いに高め合うための葛藤や、意見の衝突による議論を表しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-6",
    "exhibitionNo": "EX-27",
    "acquisitionYear": "2021",
    "name": "ワンドの6",
    "nameEn": "Six of Wands",
    "symbol": "Wands 6",
    "imagePath": "/tarot/w6.jpg",
    "caption": "『ワンドの6』。月桂冠を戴いて馬に乗る勝者と周囲の杖が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、勝利のパレード、公の場での成功とリーダーシップ。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-6-sym1",
        "name": "月桂冠を戴いて馬に乗る勝者",
        "location": "中央",
        "highlightPassage": "周囲からの承認と、困難を乗り越えて勝ち得た自信を示しています。",
        "description": "勝利のパレード、公の場での成功とリーダーシップ。"
      },
      {
        "id": "wands-6-sym2",
        "name": "周囲の杖",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、周囲からの承認と、困難を乗り越えて勝ち得た自信を示しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-7",
    "exhibitionNo": "EX-28",
    "acquisitionYear": "2021",
    "name": "ワンドの7",
    "nameEn": "Seven of Wands",
    "symbol": "Wands 7",
    "imagePath": "/tarot/w7.jpg",
    "caption": "『ワンドの7』。崖の上から防衛する男と向かい来る六本の杖が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、不利に見える挑戦に対しても、折れずに抵抗する強さ。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-7-sym1",
        "name": "崖の上から防衛する男",
        "location": "中央",
        "highlightPassage": "優位な立場から自分の信念やテリトリーを毅然と守る意志を表しています。",
        "description": "不利に見える挑戦に対しても、折れずに抵抗する強さ。"
      },
      {
        "id": "wands-7-sym2",
        "name": "向かい来る六本の杖",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、優位な立場から自分の信念やテリトリーを毅然と守る意志を表しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-8",
    "exhibitionNo": "EX-29",
    "acquisitionYear": "2021",
    "name": "ワンドの8",
    "nameEn": "Eight of Wands",
    "symbol": "Wands 8",
    "imagePath": "/tarot/w8.jpg",
    "caption": "『ワンドの8』。空を同じ角度で飛行する八本の杖が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、素早い行動、メッセージの到来、停滞の終わり。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-8-sym1",
        "name": "空を同じ角度で飛行する八本の杖",
        "location": "中央",
        "highlightPassage": "事態が急速に展開し、目的地に向かって加速している変化を示しています。",
        "description": "素早い行動、メッセージの到来、停滞の終わり。"
      },
      {
        "id": "wands-8-sym2",
        "name": "空を同じ角度で飛行する八本の杖",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、事態が急速に展開し、目的地に向かって加速している変化を示しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-9",
    "exhibitionNo": "EX-30",
    "acquisitionYear": "2021",
    "name": "ワンドの9",
    "nameEn": "Nine of Wands",
    "symbol": "Wands 9",
    "imagePath": "/tarot/w9.jpg",
    "caption": "『ワンドの9』。包帯を頭に巻いて警戒する男と九本の杖が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、最後の難関に対する備え、粘り強さと防衛。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-9-sym1",
        "name": "包帯を頭に巻いて警戒する男",
        "location": "中央",
        "highlightPassage": "過去の傷から学び、次の挑戦に備えて警戒と防衛を固める強さを表しています。",
        "description": "最後の難関に対する備え、粘り強さと防衛。"
      },
      {
        "id": "wands-9-sym2",
        "name": "九本の杖",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、過去の傷から学び、次の挑戦に備えて警戒と防衛を固める強さを表しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-10",
    "exhibitionNo": "EX-31",
    "acquisitionYear": "2021",
    "name": "ワンドの10",
    "nameEn": "Ten of Wands",
    "symbol": "Wands 10",
    "imagePath": "/tarot/w10.jpg",
    "caption": "『ワンドの10』。十本の杖を抱えて重そうに歩く男が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、重荷のピーク、他者への委譲や整理が必要な段階。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-10-sym1",
        "name": "十本の杖を抱えて重そうに歩く男",
        "location": "中央",
        "highlightPassage": "過度な責任や義務を一人で抱え込み、限界に達しているプレッシャーを示しています。",
        "description": "重荷のピーク、他者への委譲や整理が必要な段階。"
      },
      {
        "id": "wands-10-sym2",
        "name": "十本の杖を抱えて重そうに歩く男",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、過度な責任や義務を一人で抱え込み、限界に達しているプレッシャーを示しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-page",
    "exhibitionNo": "EX-32",
    "acquisitionYear": "2021",
    "name": "ワンドのペイジ",
    "nameEn": "Page of Wands",
    "symbol": "Wands Page",
    "imagePath": "/tarot/w11.jpg",
    "caption": "『ワンドのペイジ』。杖の芽を見つめる使者と熱砂の砂漠が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、メッセンジャー、未熟ながらも無限の可能性を秘めた若者。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-page-sym1",
        "name": "杖の芽を見つめる使者",
        "location": "中央",
        "highlightPassage": "新しい冒険や学びに対する知的好奇心と、情熱的な知らせを表しています。",
        "description": "メッセンジャー、未熟ながらも無限の可能性を秘めた若者。"
      },
      {
        "id": "wands-page-sym2",
        "name": "熱砂の砂漠",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、新しい冒険や学びに対する知的好奇心と、情熱的な知らせを表しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-knight",
    "exhibitionNo": "EX-33",
    "acquisitionYear": "2021",
    "name": "ワンドのナイト",
    "nameEn": "Knight of Wands",
    "symbol": "Wands Knight",
    "imagePath": "/tarot/w12.jpg",
    "caption": "『ワンドのナイト』。跳ねる馬に跨り熱い砂漠を進む騎士が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、急進、情熱の赴くままに進む推進力。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-knight-sym1",
        "name": "跳ねる馬に跨り熱い砂漠を進む騎士",
        "location": "中央",
        "highlightPassage": "目的地の見極めよりも、まず行動を起こす猛烈な突破力を示しています。",
        "description": "急進、情熱の赴くままに進む推進力。"
      },
      {
        "id": "wands-knight-sym2",
        "name": "跳ねる馬に跨り熱い砂漠を進む騎士",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、目的地の見極めよりも、まず行動を起こす猛烈な突破力を示しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-queen",
    "exhibitionNo": "EX-34",
    "acquisitionYear": "2021",
    "name": "ワンドのクイーン",
    "nameEn": "Queen of Wands",
    "symbol": "Wands Queen",
    "imagePath": "/tarot/w13.jpg",
    "caption": "『ワンドのクイーン』。ひまわりと黒猫を連れて座る女王が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、包容力のある情熱、自己肯定感、親しみやすさ。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-queen-sym1",
        "name": "ひまわり",
        "location": "中央",
        "highlightPassage": "周囲に温もりと活力を与え、磁力のように人々を引きつける魅力を表しています。",
        "description": "包容力のある情熱、自己肯定感、親しみやすさ。"
      },
      {
        "id": "wands-queen-sym2",
        "name": "黒猫を連れて座る女王",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、周囲に温もりと活力を与え、磁力のように人々を引きつける魅力を表しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "wands-king",
    "exhibitionNo": "EX-35",
    "acquisitionYear": "2021",
    "name": "ワンドのKing",
    "nameEn": "King of Wands",
    "symbol": "Wands King",
    "imagePath": "/tarot/w14.jpg",
    "caption": "『ワンドのKing』。燃えるトカゲの玉座に座る権威者が描かれている。この絵画が問うのは「自らの情熱、意志、創造的行動力において、情熱の統制、起業家精神、強固な意志の確立。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "wands-king-sym1",
        "name": "燃えるトカゲの玉座に座る権威者",
        "location": "中央",
        "highlightPassage": "自らのビジョンを社会的に具現化し、人々を率いる揺るぎない指導力を示しています。",
        "description": "情熱の統制、起業家精神、強固な意志の確立。"
      },
      {
        "id": "wands-king-sym2",
        "name": "燃えるトカゲの玉座に座る権威者",
        "location": "背景",
        "highlightPassage": "ワンドの特性を通じて、自らのビジョンを社会的に具現化し、人々を率いる揺るぎない指導力を示しています。",
        "description": "ワンドのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-ace",
    "exhibitionNo": "EX-36",
    "acquisitionYear": "2022",
    "name": "カップのエース",
    "nameEn": "Ace of Cups",
    "symbol": "Cups Ace",
    "imagePath": "/tarot/c1.jpg",
    "caption": "『カップのエース』。溢れ出る五つの水流と聖杯が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、精神的な充足、新たな感情的体験の幕開け。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-ace-sym1",
        "name": "溢れ出る五つの水流",
        "location": "中央",
        "highlightPassage": "心の内側から無条件に溢れ出す愛と感情の始まりを示しています。",
        "description": "精神的な充足、新たな感情的体験の幕開け。"
      },
      {
        "id": "cups-ace-sym2",
        "name": "聖杯",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、心の内側から無条件に溢れ出す愛と感情の始まりを示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-2",
    "exhibitionNo": "EX-37",
    "acquisitionYear": "2022",
    "name": "カップの2",
    "nameEn": "Two of Cups",
    "symbol": "Cups 2",
    "imagePath": "/tarot/c2.jpg",
    "caption": "『カップの2』。杯を交わす男女と翼のあるライオンの紋章が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、絆、信頼関係、対話の始まり。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-2-sym1",
        "name": "杯を交わす男女",
        "location": "中央",
        "highlightPassage": "他者と心を通わせ、真の相互理解や調和を結ぶ契約を表しています。",
        "description": "絆、信頼関係、対話の始まり。"
      },
      {
        "id": "cups-2-sym2",
        "name": "翼のあるライオンの紋章",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、他者と心を通わせ、真の相互理解や調和を結ぶ契約を表しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-3",
    "exhibitionNo": "EX-38",
    "acquisitionYear": "2022",
    "name": "カップの3",
    "nameEn": "Three of Cups",
    "symbol": "Cups 3",
    "imagePath": "/tarot/c3.jpg",
    "caption": "『カップの3』。杯を掲げて踊る三人の女性が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、祝祭、友情、成果の共有と祝福。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-3-sym1",
        "name": "杯を掲げて踊る三人の女性",
        "location": "中央",
        "highlightPassage": "共通の喜びを仲間と共有し、分かち合うコミュニティの温もりを示しています。",
        "description": "祝祭、友情、成果の共有と祝福。"
      },
      {
        "id": "cups-3-sym2",
        "name": "杯を掲げて踊る三人の女性",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、共通の喜びを仲間と共有し、分かち合うコミュニティの温もりを示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-4",
    "exhibitionNo": "EX-39",
    "acquisitionYear": "2022",
    "name": "カップの4",
    "nameEn": "Four of Cups",
    "symbol": "Cups 4",
    "imagePath": "/tarot/c4.jpg",
    "caption": "『カップの4』。腕を組み木の下に座る男と雲から差し出される杯が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、マンネリ、内省、一時的な自己閉鎖。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-4-sym1",
        "name": "腕を組み木の下に座る男",
        "location": "中央",
        "highlightPassage": "既存の満たされた状況に飽き、新たな提案に対しても無関心になっている退屈を示しています。",
        "description": "マンネリ、内省、一時的な自己閉鎖。"
      },
      {
        "id": "cups-4-sym2",
        "name": "雲から差し出される杯",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、既存の満たされた状況に飽き、新たな提案に対しても無関心になっている退屈を示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-5",
    "exhibitionNo": "EX-40",
    "acquisitionYear": "2022",
    "name": "カップの5",
    "nameEn": "Five of Cups",
    "symbol": "Cups 5",
    "imagePath": "/tarot/c5.jpg",
    "caption": "『カップの5』。倒れた三つの杯を見つめる黒いマントの男が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、喪失感からの回復、視点の切り替えが必要な移行期。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-5-sym1",
        "name": "倒れた三つの杯を見つめる黒いマントの男",
        "location": "中央",
        "highlightPassage": "失ったもの（倒れた杯）だけに囚われ、残された可能性（背後の二つの杯）に気づかない落胆を表しています。",
        "description": "喪失感からの回復、視点の切り替えが必要な移行期。"
      },
      {
        "id": "cups-5-sym2",
        "name": "倒れた三つの杯を見つめる黒いマントの男",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、失ったもの（倒れた杯）だけに囚われ、残された可能性（背後の二つの杯）に気づかない落胆を表しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-6",
    "exhibitionNo": "EX-41",
    "acquisitionYear": "2022",
    "name": "カップの6",
    "nameEn": "Six of Cups",
    "symbol": "Cups 6",
    "imagePath": "/tarot/c6.jpg",
    "caption": "『カップの6』。花が飾られた古い杯を差し出す子供たちが描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、郷愁、純粋な好意、過去から受け取るヒント。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-6-sym1",
        "name": "花が飾られた古い杯を差し出す子供たち",
        "location": "中央",
        "highlightPassage": "純粋だった幼少期の思い出や、過去の無垢な感情との再会を示しています。",
        "description": "郷愁、純粋な好意、過去から受け取るヒント。"
      },
      {
        "id": "cups-6-sym2",
        "name": "花が飾られた古い杯を差し出す子供たち",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、純粋だった幼少期の思い出や、過去の無垢な感情との再会を示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-7",
    "exhibitionNo": "EX-42",
    "acquisitionYear": "2022",
    "name": "カップの7",
    "nameEn": "Seven of Cups",
    "symbol": "Cups 7",
    "imagePath": "/tarot/c7.jpg",
    "caption": "『カップの7』。雲の上に浮かぶ多様な誘惑の入った七つの杯が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、夢想、目移り、現実味のないアイデア。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-7-sym1",
        "name": "雲の上に浮かぶ多様な誘惑の入った七つの杯",
        "location": "中央",
        "highlightPassage": "多くの選択肢や幻想に迷い、現実的な決定を下せない混乱を表しています。",
        "description": "夢想、目移り、現実味のないアイデア。"
      },
      {
        "id": "cups-7-sym2",
        "name": "雲の上に浮かぶ多様な誘惑の入った七つの杯",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、多くの選択肢や幻想に迷い、現実的な決定を下せない混乱を表しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-8",
    "exhibitionNo": "EX-43",
    "acquisitionYear": "2022",
    "name": "カップの8",
    "nameEn": "Eight of Cups",
    "symbol": "Cups 8",
    "imagePath": "/tarot/c8.jpg",
    "caption": "『カップの8』。積み上げられた杯の背後を去る旅人が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、現状からの卒業、未練の手放し、新たな目的地の模索。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-8-sym1",
        "name": "積み上げられた杯の背後を去る旅人",
        "location": "中央",
        "highlightPassage": "物質的・感情的な充足をあえて手放し、次の精神的探求へ旅立つ引き際を示しています。",
        "description": "現状からの卒業、未練の手放し、新たな目的地の模索。"
      },
      {
        "id": "cups-8-sym2",
        "name": "積み上げられた杯の背後を去る旅人",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、物質的・感情的な充足をあえて手放し、次の精神的探求へ旅立つ引き際を示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-9",
    "exhibitionNo": "EX-44",
    "acquisitionYear": "2022",
    "name": "カップの9",
    "nameEn": "Nine of Cups",
    "symbol": "Cups 9",
    "imagePath": "/tarot/c9.jpg",
    "caption": "『カップの9』。満足げに腕を組み杯の前に座る男が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、ウィッシュカード（願いの成就）、充足感、自己満悦。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-9-sym1",
        "name": "満足げに腕を組み杯の前に座る男",
        "location": "中央",
        "highlightPassage": "自らの願いが叶い、物質的・精神的な満足を手にした状態を表しています。",
        "description": "ウィッシュカード（願いの成就）、充足感、自己満悦。"
      },
      {
        "id": "cups-9-sym2",
        "name": "満足げに腕を組み杯の前に座る男",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、自らの願いが叶い、物質的・精神的な満足を手にした状態を表しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-10",
    "exhibitionNo": "EX-45",
    "acquisitionYear": "2022",
    "name": "カップの10",
    "nameEn": "Ten of Cups",
    "symbol": "Cups 10",
    "imagePath": "/tarot/c10.jpg",
    "caption": "『カップの10』。虹の架け橋の下で手を広げる家族と十個の杯が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、究極の幸福、平和、共有される愛の完結。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-10-sym1",
        "name": "虹の架け橋の下で手を広げる家族",
        "location": "中央",
        "highlightPassage": "家庭やコミュニティにおいて、永続的な調和と感情的な幸福が達成された姿を示しています。",
        "description": "究極の幸福、平和、共有される愛の完結。"
      },
      {
        "id": "cups-10-sym2",
        "name": "十個の杯",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、家庭やコミュニティにおいて、永続的な調和と感情的な幸福が達成された姿を示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-page",
    "exhibitionNo": "EX-46",
    "acquisitionYear": "2022",
    "name": "カップのペイジ",
    "nameEn": "Page of Cups",
    "symbol": "Cups Page",
    "imagePath": "/tarot/c11.jpg",
    "caption": "『カップのペイジ』。杯から飛び出す魚を見つめる若者が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、感受性の芽生え、無邪気な感性、嬉しいニュース。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-page-sym1",
        "name": "杯から飛び出す魚を見つめる若者",
        "location": "中央",
        "highlightPassage": "感受性豊かで親しみやすく、新しいインスピレーションを受け取る芸術的な心を示しています。",
        "description": "感受性の芽生え、無邪気な感性、嬉しいニュース。"
      },
      {
        "id": "cups-page-sym2",
        "name": "杯から飛び出す魚を見つめる若者",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、感受性豊かで親しみやすく、新しいインスピレーションを受け取る芸術的な心を示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-knight",
    "exhibitionNo": "EX-47",
    "acquisitionYear": "2022",
    "name": "カップのナイト",
    "nameEn": "Knight of Cups",
    "symbol": "Cups Knight",
    "imagePath": "/tarot/c12.jpg",
    "caption": "『カップのナイト』。静かに馬を進め杯を差し出す騎士が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、理想主義、愛情の提示、ロマンチックな展開。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-knight-sym1",
        "name": "静かに馬を進め杯を差し出す騎士",
        "location": "中央",
        "highlightPassage": "誠実さと愛情を持って近づき、心温まる提案や招待をもたらす役割を表しています。",
        "description": "理想主義、愛情の提示、ロマンチックな展開。"
      },
      {
        "id": "cups-knight-sym2",
        "name": "静かに馬を進め杯を差し出す騎士",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、誠実さと愛情を持って近づき、心温まる提案や招待をもたらす役割を表しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-queen",
    "exhibitionNo": "EX-48",
    "acquisitionYear": "2022",
    "name": "カップのクイーン",
    "nameEn": "Queen of Cups",
    "symbol": "Cups Queen",
    "imagePath": "/tarot/c13.jpg",
    "caption": "『カップのクイーン』。装飾された美しい杯を凝視する女王が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、直感の女王、深い共感、無意識の知恵。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-queen-sym1",
        "name": "装飾された美しい杯を凝視する女王",
        "location": "中央",
        "highlightPassage": "他者の痛みを深く理解し、静かに寄り添う高い感受性と直感力を示しています。",
        "description": "直感の女王、深い共感、無意識の知恵。"
      },
      {
        "id": "cups-queen-sym2",
        "name": "装飾された美しい杯を凝視する女王",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、他者の痛みを深く理解し、静かに寄り添う高い感受性と直感力を示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "cups-king",
    "exhibitionNo": "EX-49",
    "acquisitionYear": "2022",
    "name": "カップのKing",
    "nameEn": "King of Cups",
    "symbol": "Cups King",
    "imagePath": "/tarot/c14.jpg",
    "caption": "『カップのKing』。荒波の上に浮かぶ石座に座る権威者が描かれている。この絵画が問うのは「自らの感情、関係性、直感、感受性において、情緒の成熟、包容力、カウンセラーのような存在。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "cups-king-sym1",
        "name": "荒波の上に浮かぶ石座に座る権威者",
        "location": "中央",
        "highlightPassage": "感情の波に溺れず、慈愛と寛容さを持って周囲を包み込む理性の感情管理を示しています。",
        "description": "情緒の成熟、包容力、カウンセラーのような存在。"
      },
      {
        "id": "cups-king-sym2",
        "name": "荒波の上に浮かぶ石座に座る権威者",
        "location": "背景",
        "highlightPassage": "カップの特性を通じて、感情の波に溺れず、慈愛と寛容さを持って周囲を包み込む理性の感情管理を示しています。",
        "description": "カップのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-ace",
    "exhibitionNo": "EX-50",
    "acquisitionYear": "2023",
    "name": "ソードのエース",
    "nameEn": "Ace of Swords",
    "symbol": "Swords Ace",
    "imagePath": "/tarot/s1.jpg",
    "caption": "『ソードのエース』。王冠を貫く一本の剣と雲から伸びる手が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、客観的真理、障壁の突破、言葉による勝利。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-ace-sym1",
        "name": "王冠を貫く一本の剣",
        "location": "中央",
        "highlightPassage": "思考がクリアになり、真実を見定めて力強く決断する始まりを示しています。",
        "description": "客観的真理、障壁の突破、言葉による勝利。"
      },
      {
        "id": "swords-ace-sym2",
        "name": "雲から伸びる手",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、思考がクリアになり、真実を見定めて力強く決断する始まりを示しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-2",
    "exhibitionNo": "EX-51",
    "acquisitionYear": "2023",
    "name": "ソードの2",
    "nameEn": "Two of Swords",
    "symbol": "Swords 2",
    "imagePath": "/tarot/s2.jpg",
    "caption": "『ソードの2』。目隠しをして二本の剣を交差させる女性が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、静観、決断への恐れ、感情の遮断。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-2-sym1",
        "name": "目隠しをして二本の剣を交差させる女性",
        "location": "中央",
        "highlightPassage": "二つの相反する意見や状況の狭間で葛藤し、判断を保留している均衡を表しています。",
        "description": "静観、決断への恐れ、感情の遮断。"
      },
      {
        "id": "swords-2-sym2",
        "name": "目隠しをして二本の剣を交差させる女性",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、二つの相反する意見や状況の狭間で葛藤し、判断を保留している均衡を表しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-3",
    "exhibitionNo": "EX-52",
    "acquisitionYear": "2023",
    "name": "ソードの3",
    "nameEn": "Three of Swords",
    "symbol": "Swords 3",
    "imagePath": "/tarot/s3.jpg",
    "caption": "『ソードの3』。雨の中でハートを貫く三本の剣が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、悲嘆、失意、避けて通れない真実の直視。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-3-sym1",
        "name": "雨の中でハートを貫く三本の剣",
        "location": "中央",
        "highlightPassage": "言葉の刃や冷酷な真実によって、心に深い痛みや悲しみを受ける受容を示しています。",
        "description": "悲嘆、失意、避けて通れない真実の直視。"
      },
      {
        "id": "swords-3-sym2",
        "name": "雨の中でハートを貫く三本の剣",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、言葉の刃や冷酷な真実によって、心に深い痛みや悲しみを受ける受容を示しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-4",
    "exhibitionNo": "EX-53",
    "acquisitionYear": "2023",
    "name": "ソードの4",
    "nameEn": "Four of Swords",
    "symbol": "Swords 4",
    "imagePath": "/tarot/s4.jpg",
    "caption": "『ソードの4』。礼拝堂の墓碑の上で横たわる戦士と四本の剣が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、休息、退却、内なる再チャージ。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-4-sym1",
        "name": "礼拝堂の墓碑の上で横たわる戦士",
        "location": "中央",
        "highlightPassage": "戦いや葛藤の手を一時的に休め、心身を回復させるための静寂の時間を表しています。",
        "description": "休息、退却、内なる再チャージ。"
      },
      {
        "id": "swords-4-sym2",
        "name": "四本の剣",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、戦いや葛藤の手を一時的に休め、心身を回復させるための静寂の時間を表しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-5",
    "exhibitionNo": "EX-54",
    "acquisitionYear": "2023",
    "name": "ソードの5",
    "nameEn": "Five of Swords",
    "symbol": "Swords 5",
    "imagePath": "/tarot/s5.jpg",
    "caption": "『ソードの5』。剣を奪い嘲笑する男と去りゆく敗者たちが描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、エゴのぶつかり合い、不和、代償の大きい勝利。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-5-sym1",
        "name": "剣を奪い嘲笑する男",
        "location": "中央",
        "highlightPassage": "勝利したものの、信頼や人間関係を失って孤独になる虚しい勝利を示しています。",
        "description": "エゴのぶつかり合い、不和、代償の大きい勝利。"
      },
      {
        "id": "swords-5-sym2",
        "name": "去りゆく敗者たち",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、勝利したものの、信頼や人間関係を失って孤独になる虚しい勝利を示しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-6",
    "exhibitionNo": "EX-55",
    "acquisitionYear": "2023",
    "name": "ソードの6",
    "nameEn": "Six of Swords",
    "symbol": "Swords 6",
    "imagePath": "/tarot/s6.jpg",
    "caption": "『ソードの6』。水面を静かに進む船と六本の剣が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、回復への旅立ち、客観的支援、難局からの脱出。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-6-sym1",
        "name": "水面を静かに進む船",
        "location": "中央",
        "highlightPassage": "辛い過去や葛藤のあった場所を離れ、平穏な対岸へと移動する移行期間を表しています。",
        "description": "回復への旅立ち、客観的支援、難局からの脱出。"
      },
      {
        "id": "swords-6-sym2",
        "name": "六本の剣",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、辛い過去や葛藤のあった場所を離れ、平穏な対岸へと移動する移行期間を表しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-7",
    "exhibitionNo": "EX-56",
    "acquisitionYear": "2023",
    "name": "ソードの7",
    "nameEn": "Seven of Swords",
    "symbol": "Swords 7",
    "imagePath": "/tarot/s7.jpg",
    "caption": "『ソードの7』。五本の剣を盗み出して逃げる男と残された二本の剣が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、逃避、裏切り、戦略的な妥協。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-7-sym1",
        "name": "五本の剣を盗み出して逃げる男",
        "location": "中央",
        "highlightPassage": "正面突破を避け、策略や秘密の行動で目的を達成しようとする狡猾さを示しています。",
        "description": "逃避、裏切り、戦略的な妥協。"
      },
      {
        "id": "swords-7-sym2",
        "name": "残された二本の剣",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、正面突破を避け、策略や秘密の行動で目的を達成しようとする狡猾さを示しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-8",
    "exhibitionNo": "EX-57",
    "acquisitionYear": "2023",
    "name": "ソードの8",
    "nameEn": "Eight of Swords",
    "symbol": "Swords 8",
    "imagePath": "/tarot/s8.jpg",
    "caption": "『ソードの8』。目隠しをされ剣の檻に囲まれた女性が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、自己否定、身動きの取れなさ、幻想の限界。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-8-sym1",
        "name": "目隠しをされ剣の檻に囲まれた女性",
        "location": "中央",
        "highlightPassage": "周囲が敵だらけに見えるが、実は自らの思い込みで行動を制限している束縛を表しています。",
        "description": "自己否定、身動きの取れなさ、幻想の限界。"
      },
      {
        "id": "swords-8-sym2",
        "name": "目隠しをされ剣の檻に囲まれた女性",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、周囲が敵だらけに見えるが、実は自らの思い込みで行動を制限している束縛を表しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-9",
    "exhibitionNo": "EX-58",
    "acquisitionYear": "2023",
    "name": "ソードの9",
    "nameEn": "Nine of Swords",
    "symbol": "Swords 9",
    "imagePath": "/tarot/s9.jpg",
    "caption": "『ソードの9』。ベッドの上で顔を覆って泣く人物と背景の九本の剣が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、過度の不安、不眠、内なる恐怖の拡大。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-9-sym1",
        "name": "ベッドの上で顔を覆って泣く人物",
        "location": "中央",
        "highlightPassage": "夜も眠れないほどの過度な心配事や、悪夢のような被害妄想に苛まれる精神的苦痛を示しています。",
        "description": "過度の不安、不眠、内なる恐怖の拡大。"
      },
      {
        "id": "swords-9-sym2",
        "name": "背景の九本の剣",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、夜も眠れないほどの過度な心配事や、悪夢のような被害妄想に苛まれる精神的苦痛を示しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-10",
    "exhibitionNo": "EX-59",
    "acquisitionYear": "2023",
    "name": "ソードの10",
    "nameEn": "Ten of Swords",
    "symbol": "Swords 10",
    "imagePath": "/tarot/s10.jpg",
    "caption": "『ソードの10』。十本の剣に体を貫かれて倒れる人物が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、底を打つ、劇的な終焉、再出発の兆し。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-10-sym1",
        "name": "十本の剣に体を貫かれて倒れる人物",
        "location": "中央",
        "highlightPassage": "これ以上の悪化はない最悪の状況に達し、古いパターンが完全に終わる限界を表しています。",
        "description": "底を打つ、劇的な終焉、再出発の兆し。"
      },
      {
        "id": "swords-10-sym2",
        "name": "十本の剣に体を貫かれて倒れる人物",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、これ以上の悪化はない最悪の状況に達し、古いパターンが完全に終わる限界を表しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-page",
    "exhibitionNo": "EX-60",
    "acquisitionYear": "2023",
    "name": "ソードのペイジ",
    "nameEn": "Page of Swords",
    "symbol": "Swords Page",
    "imagePath": "/tarot/s11.jpg",
    "caption": "『ソードのペイジ』。風の吹く丘の上で両手で剣を構える若者が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、情報収集、鋭い観察眼、警戒心の強さ。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-page-sym1",
        "name": "風の吹く丘の上で両手で剣を構える若者",
        "location": "中央",
        "highlightPassage": "警戒心を怠らず、知的な好奇心と明晰な言葉で真実を探求する姿勢を示しています。",
        "description": "情報収集、鋭い観察眼、警戒心の強さ。"
      },
      {
        "id": "swords-page-sym2",
        "name": "風の吹く丘の上で両手で剣を構える若者",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、警戒心を怠らず、知的な好奇心と明晰な言葉で真実を探求する姿勢を示しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-knight",
    "exhibitionNo": "EX-61",
    "acquisitionYear": "2023",
    "name": "ソードのナイト",
    "nameEn": "Knight of Swords",
    "symbol": "Swords Knight",
    "imagePath": "/tarot/s12.jpg",
    "caption": "『ソードのナイト』。激しい向かい風の中を突撃する若き騎士が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、果敢な挑戦、急展開、容赦のない言葉。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-knight-sym1",
        "name": "激しい向かい風の中を突撃する若き騎士",
        "location": "中央",
        "highlightPassage": "目標に向かって一直線に突き進む、圧倒的なスピードと知的な突進力を表しています。",
        "description": "果敢な挑戦、急展開、容赦のない言葉。"
      },
      {
        "id": "swords-knight-sym2",
        "name": "激しい向かい風の中を突撃する若き騎士",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、目標に向かって一直線に突き進む、圧倒的なスピードと知的な突進力を表しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-queen",
    "exhibitionNo": "EX-62",
    "acquisitionYear": "2023",
    "name": "ソードのクイーン",
    "nameEn": "Queen of Swords",
    "symbol": "Swords Queen",
    "imagePath": "/tarot/s13.jpg",
    "caption": "『ソードのクイーン』。雲の上に厳かに座り、片手を挙げる女王が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、境界線の確立、自立心、明晰な批判精神。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-queen-sym1",
        "name": "雲の上に厳かに座り、片手を挙げる女王",
        "location": "中央",
        "highlightPassage": "私情を挟まず、客観的事実と論理に基づいて冷徹かつ公正に判断する知性を表しています。",
        "description": "境界線の確立、自立心、明晰な批判精神。"
      },
      {
        "id": "swords-queen-sym2",
        "name": "雲の上に厳かに座り、片手を挙げる女王",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、私情を挟まず、客観的事実と論理に基づいて冷徹かつ公正に判断する知性を表しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "swords-king",
    "exhibitionNo": "EX-63",
    "acquisitionYear": "2023",
    "name": "ソードのKing",
    "nameEn": "King of Swords",
    "symbol": "Swords King",
    "imagePath": "/tarot/s14.jpg",
    "caption": "『ソードのKing』。玉座に座り、剣をわずかに傾ける指揮官が描かれている。この絵画が問うのは「自らの論理、知性、言葉、葛藤、決断において、専門的知恵、ルール、客観的決断の最高権威。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "swords-king-sym1",
        "name": "玉座に座り、剣をわずかに傾ける指揮官",
        "location": "中央",
        "highlightPassage": "法とルールを遵守し、冷静な知性と的確な助言で集団を統率する絶対的知力を示しています。",
        "description": "専門的知恵、ルール、客観的決断の最高権威。"
      },
      {
        "id": "swords-king-sym2",
        "name": "玉座に座り、剣をわずかに傾ける指揮官",
        "location": "背景",
        "highlightPassage": "ソードの特性を通じて、法とルールを遵守し、冷静な知性と的確な助言で集団を統率する絶対的知力を示しています。",
        "description": "ソードのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-ace",
    "exhibitionNo": "EX-64",
    "acquisitionYear": "2024",
    "name": "ペンタクルのエース",
    "nameEn": "Ace of Pentacles",
    "symbol": "Pentacles Ace",
    "imagePath": "/tarot/p1.jpg",
    "caption": "『ペンタクルのエース』。雲から現れる手と輝く金貨が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、ビジネスの種、健康、経済的チャンスの萌芽。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-ace-sym1",
        "name": "雲から現れる手",
        "location": "中央",
        "highlightPassage": "現実的なプロジェクトや財産、身体的な取り組みの確かなスタートを示しています。",
        "description": "ビジネスの種、健康、経済的チャンスの萌芽。"
      },
      {
        "id": "pentacles-ace-sym2",
        "name": "輝く金貨",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、現実的なプロジェクトや財産、身体的な取り組みの確かなスタートを示しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-2",
    "exhibitionNo": "EX-65",
    "acquisitionYear": "2024",
    "name": "ペンタクルの2",
    "nameEn": "Two of Pentacles",
    "symbol": "Pentacles 2",
    "imagePath": "/tarot/p2.jpg",
    "caption": "『ペンタクルの2』。金貨をジャグリングしながら踊る男と背後の荒波が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、優先順位の調整、柔軟性、臨機応変な対応。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-2-sym1",
        "name": "金貨をジャグリングしながら踊る男",
        "location": "中央",
        "highlightPassage": "変化する状況や複数のタスクを、柔軟にコントロールして楽しむバランスを表しています。",
        "description": "優先順位の調整、柔軟性、臨機応変な対応。"
      },
      {
        "id": "pentacles-2-sym2",
        "name": "背後の荒波",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、変化する状況や複数のタスクを、柔軟にコントロールして楽しむバランスを表しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-3",
    "exhibitionNo": "EX-66",
    "acquisitionYear": "2024",
    "name": "ペンタクルの3",
    "nameEn": "Three of Pentacles",
    "symbol": "Pentacles 3",
    "imagePath": "/tarot/p3.jpg",
    "caption": "『ペンタクルの3』。大聖堂で議論を重ねる彫刻家と二人の聖職者が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、チームワーク、専門技術の研鑽、確実なスタート。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-3-sym1",
        "name": "大聖堂で議論を重ねる彫刻家",
        "location": "中央",
        "highlightPassage": "異なるスキルを持つプロフェッショナルが協力し、質の高い作品を作り上げる協働を示しています。",
        "description": "チームワーク、専門技術の研鑽、確実なスタート。"
      },
      {
        "id": "pentacles-3-sym2",
        "name": "二人の聖職者",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、異なるスキルを持つプロフェッショナルが協力し、質の高い作品を作り上げる協働を示しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-4",
    "exhibitionNo": "EX-67",
    "acquisitionYear": "2024",
    "name": "ペンタクルの4",
    "nameEn": "Four of Pentacles",
    "symbol": "Pentacles 4",
    "imagePath": "/tarot/p4.jpg",
    "caption": "『ペンタクルの4』。金貨をしっかりと抱きしめ、頭や足で固定する男が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、独占欲、過度な防衛、現状維持の罠。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-4-sym1",
        "name": "金貨をしっかり",
        "location": "中央",
        "highlightPassage": "得た富や立場を絶対に失うまいと固執し、変化を拒んでいる保守的な姿勢を表しています。",
        "description": "独占欲、過度な防衛、現状維持の罠。"
      },
      {
        "id": "pentacles-4-sym2",
        "name": "抱きしめ、頭や足で固定する男",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、得た富や立場を絶対に失うまいと固執し、変化を拒んでいる保守的な姿勢を表しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-5",
    "exhibitionNo": "EX-68",
    "acquisitionYear": "2024",
    "name": "ペンタクルの5",
    "nameEn": "Five of Pentacles",
    "symbol": "Pentacles 5",
    "imagePath": "/tarot/p5.jpg",
    "caption": "『ペンタクルの5』。雪の降る教会の前を通り過ぎる二人の困窮者が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、一時的な困窮、孤立、視野の狭窄。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-5-sym1",
        "name": "雪の降る教会の前を通り過ぎる二人の困窮者",
        "location": "中央",
        "highlightPassage": "精神的・物質的な貧しさに直面し、近くにある救い（教会）を見落としている困惑を示しています。",
        "description": "一時的な困窮、孤立、視野の狭窄。"
      },
      {
        "id": "pentacles-5-sym2",
        "name": "雪の降る教会の前を通り過ぎる二人の困窮者",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、精神的・物質的な貧しさに直面し、近くにある救い（教会）を見落としている困惑を示しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-6",
    "exhibitionNo": "EX-69",
    "acquisitionYear": "2024",
    "name": "ペンタクルの6",
    "nameEn": "Six of Pentacles",
    "symbol": "Pentacles 6",
    "imagePath": "/tarot/p6.jpg",
    "caption": "『ペンタクルの6』。天秤を持ち、困窮者に施しを与える裕福な男が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、寛大さ、資金援助、パワーバランスの調整。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-6-sym1",
        "name": "天秤を持ち、困窮者に施しを与える裕福な男",
        "location": "中央",
        "highlightPassage": "自らの資源を公平に分配し、健全なギブアンドテイクの関係を築く寛容さを表しています。",
        "description": "寛大さ、資金援助、パワーバランスの調整。"
      },
      {
        "id": "pentacles-6-sym2",
        "name": "天秤を持ち、困窮者に施しを与える裕福な男",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、自らの資源を公平に分配し、健全なギブアンドテイクの関係を築く寛容さを表しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-7",
    "exhibitionNo": "EX-70",
    "acquisitionYear": "2024",
    "name": "ペンタクルの7",
    "nameEn": "Seven of Pentacles",
    "symbol": "Pentacles 7",
    "imagePath": "/tarot/p7.jpg",
    "caption": "『ペンタクルの7』。実った作物を見つめて手を止める農夫が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、進捗の確認、待機、やり方の見直し。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-7-sym1",
        "name": "実った作物を見つめて手を止める農夫",
        "location": "中央",
        "highlightPassage": "これまで努力して育てた成果を振り返り、次の計画を立てるための中間査定を示しています。",
        "description": "進捗の確認、待機、やり方の見直し。"
      },
      {
        "id": "pentacles-7-sym2",
        "name": "実った作物を見つめて手を止める農夫",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、これまで努力して育てた成果を振り返り、次の計画を立てるための中間査定を示しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-8",
    "exhibitionNo": "EX-71",
    "acquisitionYear": "2024",
    "name": "ペンタクルの8",
    "nameEn": "Eight of Pentacles",
    "symbol": "Pentacles 8",
    "imagePath": "/tarot/p8.jpg",
    "caption": "『ペンタクルの8』。黙々と石の金貨を彫り続ける職人が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、専門技能の習得、継続は力、ディテールへのこだわり。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-8-sym1",
        "name": "黙々",
        "location": "中央",
        "highlightPassage": "地道な反復作業を通じて、自らの技術や価値を磨き続ける真摯な姿勢を表しています。",
        "description": "専門技能の習得、継続は力、ディテールへのこだわり。"
      },
      {
        "id": "pentacles-8-sym2",
        "name": "石の金貨を彫り続ける職人",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、地道な反復作業を通じて、自らの技術や価値を磨き続ける真摯な姿勢を表しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-9",
    "exhibitionNo": "EX-72",
    "acquisitionYear": "2024",
    "name": "ペンタクルの9",
    "nameEn": "Nine of Pentacles",
    "symbol": "Pentacles 9",
    "imagePath": "/tarot/p9.jpg",
    "caption": "『ペンタクルの9』。豊かな庭で手に鷹を乗せて佇む女性が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、自立した繁栄、洗練、優雅なひととき。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-9-sym1",
        "name": "豊かな庭で手に鷹を乗せて佇む女性",
        "location": "中央",
        "highlightPassage": "自立した努力によって経済的な成功と優雅なプライベートを手に入れた満足を示しています。",
        "description": "自立した繁栄、洗練、優雅なひととき。"
      },
      {
        "id": "pentacles-9-sym2",
        "name": "豊かな庭で手に鷹を乗せて佇む女性",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、自立した努力によって経済的な成功と優雅なプライベートを手に入れた満足を示しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-10",
    "exhibitionNo": "EX-73",
    "acquisitionYear": "2024",
    "name": "ペンタクルの10",
    "nameEn": "Ten of Pentacles",
    "symbol": "Pentacles 10",
    "imagePath": "/tarot/p10.jpg",
    "caption": "『ペンタクルの10』。古い城門で家族と老人が集う安らぎが描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、永続する富、家族の絆、伝統の継承。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-10-sym1",
        "name": "古い城門で家族",
        "location": "中央",
        "highlightPassage": "長い時間をかけて築かれた安定した資産や家系、確固たる基盤の継承を表しています。",
        "description": "永続する富、家族の絆、伝統の継承。"
      },
      {
        "id": "pentacles-10-sym2",
        "name": "老人が集う安らぎ",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、長い時間をかけて築かれた安定した資産や家系、確固たる基盤の継承を表しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-page",
    "exhibitionNo": "EX-74",
    "acquisitionYear": "2024",
    "name": "ペンタクルのペイジ",
    "nameEn": "Page of Pentacles",
    "symbol": "Pentacles Page",
    "imagePath": "/tarot/p11.jpg",
    "caption": "『ペンタクルのペイジ』。広大な野原で両手で金貨を見つめる若者が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、勉学、現実的なアプローチ、価値の発見。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-page-sym1",
        "name": "広大な野原で両手で金貨を見つめる若者",
        "location": "中央",
        "highlightPassage": "現実的な価値や知識を学び始め、確実に育てる実務的な可能性を示しています。",
        "description": "勉学、現実的なアプローチ、価値の発見。"
      },
      {
        "id": "pentacles-page-sym2",
        "name": "広大な野原で両手で金貨を見つめる若者",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、現実的な価値や知識を学び始め、確実に育てる実務的な可能性を示しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-knight",
    "exhibitionNo": "EX-75",
    "acquisitionYear": "2024",
    "name": "ペンタクルのナイト",
    "nameEn": "Knight of Pentacles",
    "symbol": "Pentacles Knight",
    "imagePath": "/tarot/p12.jpg",
    "caption": "『ペンタクルのナイト』。耕された畑の前に立ち、金貨を見つめて静止する馬上の騎士が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、忍耐強さ、地道な実行力、保守的な進捗。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-knight-sym1",
        "name": "耕された畑の前に立ち、金貨を見つめて静止する馬上の騎士",
        "location": "中央",
        "highlightPassage": "急がず、一歩一歩着実に任務を遂行する揺るぎない信頼性と堅実さを表しています。",
        "description": "忍耐強さ、地道な実行力、保守的な進捗。"
      },
      {
        "id": "pentacles-knight-sym2",
        "name": "耕された畑の前に立ち、金貨を見つめて静止する馬上の騎士",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、急がず、一歩一歩着実に任務を遂行する揺るぎない信頼性と堅実さを表しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-queen",
    "exhibitionNo": "EX-76",
    "acquisitionYear": "2024",
    "name": "ペンタクルのクイーン",
    "nameEn": "Queen of Pentacles",
    "symbol": "Pentacles Queen",
    "imagePath": "/tarot/p13.jpg",
    "caption": "『ペンタクルのクイーン』。豊かな自然の中で金貨を慈しむように見つめる女王が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、物質的な育成、心地よさ、家庭の守護。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-queen-sym1",
        "name": "豊かな自然の中で金貨を慈しむように見つめる女王",
        "location": "中央",
        "highlightPassage": "生命や現実的な繁栄を優しく育み、心地よい環境を整える包容力を示しています。",
        "description": "物質的な育成、心地よさ、家庭の守護。"
      },
      {
        "id": "pentacles-queen-sym2",
        "name": "豊かな自然の中で金貨を慈しむように見つめる女王",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、生命や現実的な繁栄を優しく育み、心地よい環境を整える包容力を示しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  },
  {
    "id": "pentacles-king",
    "exhibitionNo": "EX-77",
    "acquisitionYear": "2024",
    "name": "ペンタクルのKing",
    "nameEn": "King of Pentacles",
    "symbol": "Pentacles King",
    "imagePath": "/tarot/p14.jpg",
    "caption": "『ペンタクルのKing』。牛の頭が彫られた玉座に座る富豪が描かれている。この絵画が問うのは「自らの現実、物質、財産、身体、堅実な成果において、経済的成功、経営能力、絶対的な安定の象徴。とどう向き合うか」という問いである。",
    "symbols": [
      {
        "id": "pentacles-king-sym1",
        "name": "牛の頭が彫られた玉座に座る富豪",
        "location": "中央",
        "highlightPassage": "現実的な成果を最大化し、安定した繁栄の帝国を維持する確固たる統率力を表しています。",
        "description": "経済的成功、経営能力、絶対的な安定の象徴。"
      },
      {
        "id": "pentacles-king-sym2",
        "name": "牛の頭が彫られた玉座に座る富豪",
        "location": "背景",
        "highlightPassage": "ペンタクルの特性を通じて、現実的な成果を最大化し、安定した繁栄の帝国を維持する確固たる統率力を表しています。",
        "description": "ペンタクルのエネルギーを象徴する属性としての描写。"
      }
    ]
  }
];
