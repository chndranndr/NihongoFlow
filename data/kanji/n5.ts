import { DrillItem } from '../../types';

// JLPT N5 Kanji — Beginner Level (80+ kanji)
export const KANJI_N5: Record<string, DrillItem[]> = {
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
    ],
    "Time & Frequency": [
        { "character": "時", "primaryReading": "ji", "meaning": "Time/Hour", "onyomi": ["JI"], "kunyomi": ["toki"] },
        { "character": "間", "primaryReading": "kan", "meaning": "Interval/Space", "onyomi": ["KAN", "KEN"], "kunyomi": ["aida", "ma"] },
        { "character": "年", "primaryReading": "nen", "meaning": "Year", "onyomi": ["NEN"], "kunyomi": ["toshi"] },
        { "character": "今", "primaryReading": "kon", "meaning": "Now", "onyomi": ["KON", "KIN"], "kunyomi": ["ima"] },
        { "character": "午", "primaryReading": "go", "meaning": "Noon", "onyomi": ["GO"], "kunyomi": ["uma"] },
        { "character": "前", "primaryReading": "zen", "meaning": "Before/Front", "onyomi": ["ZEN"], "kunyomi": ["mae"] },
        { "character": "後", "primaryReading": "go", "meaning": "After/Behind", "onyomi": ["GO", "KOU"], "kunyomi": ["nochi", "ushi-ro", "ato"] },
        { "character": "半", "primaryReading": "han", "meaning": "Half", "onyomi": ["HAN"], "kunyomi": ["naka-ba"] },
        { "character": "分", "primaryReading": "bun", "meaning": "Part/Minute", "onyomi": ["BUN", "FUN", "BU"], "kunyomi": ["wa-keru"] },
        { "character": "毎", "primaryReading": "mai", "meaning": "Every", "onyomi": ["MAI"], "kunyomi": ["goto-ni"] }
    ],
    "Actions & Movement": [
        { "character": "出", "primaryReading": "shutsu", "meaning": "Exit/Leave", "onyomi": ["SHUTSU", "SUI"], "kunyomi": ["de-ru", "da-su"] },
        { "character": "入", "primaryReading": "nyuu", "meaning": "Enter", "onyomi": ["NYUU"], "kunyomi": ["i-ru", "hai-ru"] },
        { "character": "休", "primaryReading": "kyuu", "meaning": "Rest/Day Off", "onyomi": ["KYUU"], "kunyomi": ["yasu-mu"] }
    ],
    "Learning & Language": [
        { "character": "学", "primaryReading": "gaku", "meaning": "Study", "onyomi": ["GAKU"], "kunyomi": ["mana-bu"] },
        { "character": "校", "primaryReading": "kou", "meaning": "School", "onyomi": ["KOU"], "kunyomi": [] },
        { "character": "先", "primaryReading": "sen", "meaning": "Previous/Ahead", "onyomi": ["SEN"], "kunyomi": ["saki", "ma-zu"] },
        { "character": "生", "primaryReading": "sei", "meaning": "Life/Birth", "onyomi": ["SEI", "SHOU"], "kunyomi": ["i-kiru", "u-mu", "nama"] },
        { "character": "本", "primaryReading": "hon", "meaning": "Book/Origin", "onyomi": ["HON"], "kunyomi": ["moto"] },
        { "character": "語", "primaryReading": "go", "meaning": "Word/Language", "onyomi": ["GO"], "kunyomi": ["kata-ru"] },
        { "character": "名", "primaryReading": "mei", "meaning": "Name", "onyomi": ["MEI", "MYOU"], "kunyomi": ["na"] }
    ],
    "Daily Life": [
        { "character": "国", "primaryReading": "koku", "meaning": "Country", "onyomi": ["KOKU"], "kunyomi": ["kuni"] },
        { "character": "車", "primaryReading": "sha", "meaning": "Car/Vehicle", "onyomi": ["SHA"], "kunyomi": ["kuruma"] },
        { "character": "電", "primaryReading": "den", "meaning": "Electricity", "onyomi": ["DEN"], "kunyomi": [] },
        { "character": "何", "primaryReading": "nani", "meaning": "What", "onyomi": ["KA"], "kunyomi": ["nani", "nan"] },
        { "character": "気", "primaryReading": "ki", "meaning": "Spirit/Air", "onyomi": ["KI", "KE"], "kunyomi": ["iki"] },
        { "character": "友", "primaryReading": "yuu", "meaning": "Friend", "onyomi": ["YUU"], "kunyomi": ["tomo"] }
    ]
};
