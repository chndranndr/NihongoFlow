import { DrillItem } from './types';

export const KANJI_DATA: Record<string, Record<string, DrillItem[]>> = {
  "BEGINNER": {
    "Numbers": [
      { "character": "一", "primaryReading": "ichi", "meaning": "One", "onyomi": ["ICHI", "ITSU"], "kunyomi": ["hito-tsu"] },
      { "character": "二", "primaryReading": "ni", "meaning": "Two", "onyomi": ["NI"], "kunyomi": ["futa-tsu"] },
      { "character": "三", "primaryReading": "san", "meaning": "Three", "onyomi": ["SAN"], "kunyomi": ["mit-tsu"] },
      { "character": "四", "primaryReading": "yon", "meaning": "Four", "onyomi": ["SHI"], "kunyomi": ["yot-tsu", "yon"] },
      { "character": "五", "primaryReading": "go", "meaning": "Five", "onyomi": ["GO"], "kunyomi": ["itsu-tsu"] },
      { "character": "六", "primaryReading": "roku", "meaning": "Six", "onyomi": ["ROKU"], "kunyomi": ["mut-tsu"] },
      { "character": "七", "primaryReading": "nana", "meaning": "Seven", "onyomi": ["SHICHI"], "kunyomi": ["nana-tsu"] },
      { "character": "八", "primaryReading": "hachi", "meaning": "Eight", "onyomi": ["HACHI"], "kunyomi": ["yat-tsu"] },
      { "character": "九", "primaryReading": "kyuu", "meaning": "Nine", "onyomi": ["KYUU", "KU"], "kunyomi": ["kokono-tsu"] },
      { "character": "十", "primaryReading": "juu", "meaning": "Ten", "onyomi": ["JUU"], "kunyomi": ["too"] },
      { "character": "百", "primaryReading": "hyaku", "meaning": "Hundred", "onyomi": ["HYAKU"], "kunyomi": ["momo"] },
      { "character": "千", "primaryReading": "sen", "meaning": "Thousand", "onyomi": ["SEN"], "kunyomi": ["chi"] },
      { "character": "万", "primaryReading": "man", "meaning": "Ten Thousand", "onyomi": ["MAN", "BAN"], "kunyomi": [] },
      { "character": "円", "primaryReading": "en", "meaning": "Yen/Circle", "onyomi": ["EN"], "kunyomi": ["maru-i"] }
    ],
    "Nature & Elements": [
      { "character": "日", "primaryReading": "nichi", "meaning": "Day/Sun", "onyomi": ["NICHI", "JITSU"], "kunyomi": ["hi", "bi"] },
      { "character": "月", "primaryReading": "getsu", "meaning": "Month/Moon", "onyomi": ["GETSU", "GATSU"], "kunyomi": ["tsuki"] },
      { "character": "火", "primaryReading": "ka", "meaning": "Fire", "onyomi": ["KA"], "kunyomi": ["hi"] },
      { "character": "水", "primaryReading": "sui", "meaning": "Water", "onyomi": ["SUI"], "kunyomi": ["mizu"] },
      { "character": "木", "primaryReading": "moku", "meaning": "Tree", "onyomi": ["MOKU", "BOKU"], "kunyomi": ["ki"] },
      { "character": "金", "primaryReading": "kin", "meaning": "Gold/Money", "onyomi": ["KIN", "KON"], "kunyomi": ["kane"] },
      { "character": "土", "primaryReading": "do", "meaning": "Soil/Earth", "onyomi": ["DO", "TO"], "kunyomi": ["tsuchi"] },
      { "character": "山", "primaryReading": "san", "meaning": "Mountain", "onyomi": ["SAN"], "kunyomi": ["yama"] },
      { "character": "川", "primaryReading": "kawa", "meaning": "River", "onyomi": ["SEN"], "kunyomi": ["kawa"] },
      { "character": "雨", "primaryReading": "ame", "meaning": "Rain", "onyomi": ["U"], "kunyomi": ["ame"] },
      { "character": "天", "primaryReading": "ten", "meaning": "Heaven", "onyomi": ["TEN"], "kunyomi": ["ama"] }
    ],
    "People": [
      { "character": "人", "primaryReading": "jin", "meaning": "Person", "onyomi": ["JIN", "NIN"], "kunyomi": ["hito"] },
      { "character": "子", "primaryReading": "shi", "meaning": "Child", "onyomi": ["SHI", "SU"], "kunyomi": ["ko"] },
      { "character": "女", "primaryReading": "jo", "meaning": "Woman", "onyomi": ["JO", "NYO"], "kunyomi": ["onna"] },
      { "character": "男", "primaryReading": "dan", "meaning": "Man", "onyomi": ["DAN", "NAN"], "kunyomi": ["otoko"] },
      { "character": "父", "primaryReading": "fu", "meaning": "Father", "onyomi": ["FU"], "kunyomi": ["chichi"] },
      { "character": "母", "primaryReading": "bo", "meaning": "Mother", "onyomi": ["BO"], "kunyomi": ["haha"] }
    ],
    "Directions": [
      { "character": "上", "primaryReading": "jou", "meaning": "Up/Above", "onyomi": ["JOU"], "kunyomi": ["ue", "a-geru"] },
      { "character": "下", "primaryReading": "ka", "meaning": "Down/Below", "onyomi": ["KA", "GE"], "kunyomi": ["shita", "sa-geru"] },
      { "character": "左", "primaryReading": "sa", "meaning": "Left", "onyomi": ["SA"], "kunyomi": ["hidari"] },
      { "character": "右", "primaryReading": "u", "meaning": "Right", "onyomi": ["U", "YUU"], "kunyomi": ["migi"] },
      { "character": "中", "primaryReading": "chuu", "meaning": "Middle/Inside", "onyomi": ["CHUU"], "kunyomi": ["naka"] },
      { "character": "外", "primaryReading": "gai", "meaning": "Outside", "onyomi": ["GAI", "GE"], "kunyomi": ["soto"] },
      { "character": "北", "primaryReading": "hoku", "meaning": "North", "onyomi": ["HOKU"], "kunyomi": ["kita"] },
      { "character": "南", "primaryReading": "nan", "meaning": "South", "onyomi": ["NAN"], "kunyomi": ["minami"] },
      { "character": "東", "primaryReading": "tou", "meaning": "East", "onyomi": ["TOU"], "kunyomi": ["higashi"] },
      { "character": "西", "primaryReading": "sei", "meaning": "West", "onyomi": ["SEI", "SAI"], "kunyomi": ["nishi"] }
    ],
    "Basic Verbs": [
      { "character": "行", "primaryReading": "kou", "meaning": "Go", "onyomi": ["KOU", "GYOU"], "kunyomi": ["i-ku"] },
      { "character": "来", "primaryReading": "rai", "meaning": "Come", "onyomi": ["RAI"], "kunyomi": ["ku-ru"] },
      { "character": "食", "primaryReading": "shoku", "meaning": "Eat", "onyomi": ["SHOKU"], "kunyomi": ["ta-beru"] },
      { "character": "飲", "primaryReading": "in", "meaning": "Drink", "onyomi": ["IN"], "kunyomi": ["no-mu"] },
      { "character": "見", "primaryReading": "ken", "meaning": "See", "onyomi": ["KEN"], "kunyomi": ["mi-ru"] },
      { "character": "聞", "primaryReading": "bun", "meaning": "Hear/Listen", "onyomi": ["BUN", "MON"], "kunyomi": ["ki-ku"] },
      { "character": "読", "primaryReading": "doku", "meaning": "Read", "onyomi": ["DOKU"], "kunyomi": ["yo-mu"] },
      { "character": "書", "primaryReading": "sho", "meaning": "Write", "onyomi": ["SHO"], "kunyomi": ["ka-ku"] },
      { "character": "話", "primaryReading": "wa", "meaning": "Talk/Speak", "onyomi": ["WA"], "kunyomi": ["hana-su"] },
      { "character": "買", "primaryReading": "bai", "meaning": "Buy", "onyomi": ["BAI"], "kunyomi": ["ka-u"] }
    ],
    "Basic Adjectives": [
      { "character": "大", "primaryReading": "dai", "meaning": "Big", "onyomi": ["DAI", "TAI"], "kunyomi": ["oo-kii"] },
      { "character": "小", "primaryReading": "shou", "meaning": "Small", "onyomi": ["SHOU"], "kunyomi": ["chii-sai"] },
      { "character": "新", "primaryReading": "shin", "meaning": "New", "onyomi": ["SHIN"], "kunyomi": ["atara-shii"] },
      { "character": "古", "primaryReading": "ko", "meaning": "Old", "onyomi": ["KO"], "kunyomi": ["furu-i"] },
      { "character": "高", "primaryReading": "kou", "meaning": "High/Expensive", "onyomi": ["KOU"], "kunyomi": ["taka-i"] },
      { "character": "安", "primaryReading": "an", "meaning": "Cheap/Safe", "onyomi": ["AN"], "kunyomi": ["yasu-i"] },
      { "character": "長", "primaryReading": "chou", "meaning": "Long/Leader", "onyomi": ["CHOU"], "kunyomi": ["naga-i"] },
      { "character": "白", "primaryReading": "haku", "meaning": "White", "onyomi": ["HAKU"], "kunyomi": ["shiro"] },
      { "character": "黒", "primaryReading": "koku", "meaning": "Black", "onyomi": ["KOKU"], "kunyomi": ["kuro"] },
      { "character": "赤", "primaryReading": "seki", "meaning": "Red", "onyomi": ["SEKI"], "kunyomi": ["aka"] },
      { "character": "青", "primaryReading": "sei", "meaning": "Blue", "onyomi": ["SEI"], "kunyomi": ["ao"] }
    ]
  },
  "INTERMEDIATE": {
    "Society & Life": [
      { "character": "政", "primaryReading": "sei", "meaning": "Politics", "onyomi": ["SEI"], "kunyomi": ["matsurigoto"] },
      { "character": "経", "primaryReading": "kei", "meaning": "Management", "onyomi": ["KEI"], "kunyomi": ["he-ru"] },
      { "character": "済", "primaryReading": "sai", "meaning": "Settle/Finish", "onyomi": ["SAI"], "kunyomi": ["su-mu"] },
      { "character": "会", "primaryReading": "kai", "meaning": "Meeting", "onyomi": ["KAI"], "kunyomi": ["a-u"] },
      { "character": "社", "primaryReading": "sha", "meaning": "Company/Shrine", "onyomi": ["SHA"], "kunyomi": ["yashiro"] },
      { "character": "店", "primaryReading": "ten", "meaning": "Shop", "onyomi": ["TEN"], "kunyomi": ["mise"] },
      { "character": "本", "primaryReading": "hon", "meaning": "Book/Origin", "onyomi": ["HON"], "kunyomi": ["moto"] },
      { "character": "国", "primaryReading": "koku", "meaning": "Country", "onyomi": ["KOKU"], "kunyomi": ["kuni"] },
      { "character": "町", "primaryReading": "chou", "meaning": "Town", "onyomi": ["CHOU"], "kunyomi": ["machi"] }
    ],
    "School & Education": [
      { "character": "校", "primaryReading": "kou", "meaning": "School", "onyomi": ["KOU"], "kunyomi": [] },
      { "character": "学", "primaryReading": "gaku", "meaning": "Study", "onyomi": ["GAKU"], "kunyomi": ["mana-bu"] },
      { "character": "先", "primaryReading": "sen", "meaning": "Previous/Ahead", "onyomi": ["SEN"], "kunyomi": ["saki"] },
      { "character": "生", "primaryReading": "sei", "meaning": "Life/Birth", "onyomi": ["SEI", "SHOU"], "kunyomi": ["i-kiru", "u-mareru"] },
      { "character": "勉", "primaryReading": "ben", "meaning": "Exertion", "onyomi": ["BEN"], "kunyomi": [] },
      { "character": "強", "primaryReading": "kyou", "meaning": "Strong", "onyomi": ["KYOU", "GOU"], "kunyomi": ["tsuyo-i"] },
      { "character": "文", "primaryReading": "bun", "meaning": "Sentence/Text", "onyomi": ["BUN", "MON"], "kunyomi": ["fumi"] },
      { "character": "字", "primaryReading": "ji", "meaning": "Character", "onyomi": ["JI"], "kunyomi": [] },
      { "character": "漢", "primaryReading": "kan", "meaning": "China", "onyomi": ["KAN"], "kunyomi": [] }
    ],
    "Time & Seasons": [
      { "character": "時", "primaryReading": "ji", "meaning": "Time", "onyomi": ["JI"], "kunyomi": ["toki"] },
      { "character": "間", "primaryReading": "kan", "meaning": "Interval", "onyomi": ["KAN", "KEN"], "kunyomi": ["aida"] },
      { "character": "週", "primaryReading": "shuu", "meaning": "Week", "onyomi": ["SHUU"], "kunyomi": [] },
      { "character": "年", "primaryReading": "nen", "meaning": "Year", "onyomi": ["NEN"], "kunyomi": ["toshi"] },
      { "character": "今", "primaryReading": "kon", "meaning": "Now", "onyomi": ["KON", "KIN"], "kunyomi": ["ima"] },
      { "character": "午", "primaryReading": "go", "meaning": "Noon", "onyomi": ["GO"], "kunyomi": [] },
      { "character": "前", "primaryReading": "zen", "meaning": "Before/Front", "onyomi": ["ZEN"], "kunyomi": ["mae"] },
      { "character": "後", "primaryReading": "go", "meaning": "After/Behind", "onyomi": ["GO", "KOU"], "kunyomi": ["ato", "ushi-ro"] },
      { "character": "朝", "primaryReading": "chou", "meaning": "Morning", "onyomi": ["CHOU"], "kunyomi": ["asa"] },
      { "character": "昼", "primaryReading": "chuu", "meaning": "Daytime", "onyomi": ["CHUU"], "kunyomi": ["hiru"] },
      { "character": "夕", "primaryReading": "seki", "meaning": "Evening", "onyomi": ["SEKI"], "kunyomi": ["yuu"] },
      { "character": "夜", "primaryReading": "ya", "meaning": "Night", "onyomi": ["YA"], "kunyomi": ["yoru"] },
      { "character": "春", "primaryReading": "shun", "meaning": "Spring", "onyomi": ["SHUN"], "kunyomi": ["haru"] },
      { "character": "夏", "primaryReading": "ka", "meaning": "Summer", "onyomi": ["KA"], "kunyomi": ["natsu"] },
      { "character": "秋", "primaryReading": "shuu", "meaning": "Autumn", "onyomi": ["SHUU"], "kunyomi": ["aki"] },
      { "character": "冬", "primaryReading": "tou", "meaning": "Winter", "onyomi": ["TOU"], "kunyomi": ["fuyu"] }
    ],
    "Transport & Movement": [
      { "character": "車", "primaryReading": "sha", "meaning": "Car", "onyomi": ["SHA"], "kunyomi": ["kuruma"] },
      { "character": "駅", "primaryReading": "eki", "meaning": "Station", "onyomi": ["EKI"], "kunyomi": [] },
      { "character": "電", "primaryReading": "den", "meaning": "Electricity", "onyomi": ["DEN"], "kunyomi": [] },
      { "character": "自", "primaryReading": "ji", "meaning": "Self", "onyomi": ["JI", "SHI"], "kunyomi": ["mizuka-ra"] },
      { "character": "道", "primaryReading": "dou", "meaning": "Road/Way", "onyomi": ["DOU"], "kunyomi": ["michi"] },
      { "character": "歩", "primaryReading": "ho", "meaning": "Walk", "onyomi": ["HO", "BU"], "kunyomi": ["aru-ku"] },
      { "character": "走", "primaryReading": "sou", "meaning": "Run", "onyomi": ["SOU"], "kunyomi": ["hashi-ru"] },
      { "character": "止", "primaryReading": "shi", "meaning": "Stop", "onyomi": ["SHI"], "kunyomi": ["to-maru"] },
      { "character": "動", "primaryReading": "dou", "meaning": "Move", "onyomi": ["DOU"], "kunyomi": ["ugo-ku"] }
    ],
    "Body & Health": [
      { "character": "目", "primaryReading": "moku", "meaning": "Eye", "onyomi": ["MOKU"], "kunyomi": ["me"] },
      { "character": "耳", "primaryReading": "ji", "meaning": "Ear", "onyomi": ["JI"], "kunyomi": ["mimi"] },
      { "character": "口", "primaryReading": "kou", "meaning": "Mouth", "onyomi": ["KOU"], "kunyomi": ["kuchi"] },
      { "character": "手", "primaryReading": "shu", "meaning": "Hand", "onyomi": ["SHU"], "kunyomi": ["te"] },
      { "character": "足", "primaryReading": "soku", "meaning": "Leg/Foot", "onyomi": ["SOKU"], "kunyomi": ["ashi", "ta-riru"] },
      { "character": "体", "primaryReading": "tai", "meaning": "Body", "onyomi": ["TAI"], "kunyomi": ["karada"] },
      { "character": "心", "primaryReading": "shin", "meaning": "Heart", "onyomi": ["SHIN"], "kunyomi": ["kokoro"] }
    ],
    "Family": [
      { "character": "家", "primaryReading": "ka", "meaning": "House/Family", "onyomi": ["KA", "KE"], "kunyomi": ["ie", "uchi"] },
      { "character": "族", "primaryReading": "zoku", "meaning": "Tribe/Family", "onyomi": ["ZOKU"], "kunyomi": [] },
      { "character": "兄", "primaryReading": "kyou", "meaning": "Older Brother", "onyomi": ["KYOU"], "kunyomi": ["ani"] },
      { "character": "弟", "primaryReading": "dai", "meaning": "Younger Brother", "onyomi": ["DAI", "TEI"], "kunyomi": ["otouto"] },
      { "character": "姉", "primaryReading": "shi", "meaning": "Older Sister", "onyomi": ["SHI"], "kunyomi": ["ane"] },
      { "character": "妹", "primaryReading": "mai", "meaning": "Younger Sister", "onyomi": ["MAI"], "kunyomi": ["imouto"] }
    ]
  }
};
