import { DrillItem } from '../../types';

// JLPT N5 Kanji — Beginner Level (80+ kanji)
export const KANJI_N5: Record<string, DrillItem[]> = {
    "Numbers": [
        { "character": "一", "primaryReading": "ichi", "meaning": "One", "onyomi": ["ICHI", "ITSU"], "kunyomi": ["hito-tsu"], "category": "noun" },
        { "character": "二", "primaryReading": "ni", "meaning": "Two", "onyomi": ["NI"], "kunyomi": ["futa-tsu"], "category": "noun" },
        { "character": "三", "primaryReading": "san", "meaning": "Three", "onyomi": ["SAN"], "kunyomi": ["mit-tsu"], "category": "noun" },
        { "character": "四", "primaryReading": "yon", "meaning": "Four", "onyomi": ["SHI"], "kunyomi": ["yot-tsu", "yon"], "category": "noun" },
        { "character": "五", "primaryReading": "go", "meaning": "Five", "onyomi": ["GO"], "kunyomi": ["itsu-tsu"], "category": "noun" },
        { "character": "六", "primaryReading": "roku", "meaning": "Six", "onyomi": ["ROKU"], "kunyomi": ["mut-tsu"], "category": "noun" },
        { "character": "七", "primaryReading": "nana", "meaning": "Seven", "onyomi": ["SHICHI"], "kunyomi": ["nana-tsu"], "category": "noun" },
        { "character": "八", "primaryReading": "hachi", "meaning": "Eight", "onyomi": ["HACHI"], "kunyomi": ["yat-tsu"], "category": "noun" },
        { "character": "九", "primaryReading": "kyuu", "meaning": "Nine", "onyomi": ["KYUU", "KU"], "kunyomi": ["kokono-tsu"], "category": "noun" },
        { "character": "十", "primaryReading": "juu", "meaning": "Ten", "onyomi": ["JUU"], "kunyomi": ["too"], "category": "noun" },
        { "character": "百", "primaryReading": "hyaku", "meaning": "Hundred", "onyomi": ["HYAKU"], "kunyomi": ["momo"], "category": "noun" },
        { "character": "千", "primaryReading": "sen", "meaning": "Thousand", "onyomi": ["SEN"], "kunyomi": ["chi"], "category": "noun" },
        { "character": "万", "primaryReading": "man", "meaning": "Ten Thousand", "onyomi": ["MAN", "BAN"], "kunyomi": [], "category": "noun" },
        { "character": "円", "primaryReading": "en", "meaning": "Yen/Circle", "onyomi": ["EN"], "kunyomi": ["maru-i"], "category": "noun" }
    ],
    "Nature & Elements": [
        { "character": "日", "primaryReading": "nichi", "meaning": "Day/Sun", "onyomi": ["NICHI", "JITSU"], "kunyomi": ["hi", "bi"], "category": "noun" },
        { "character": "月", "primaryReading": "getsu", "meaning": "Month/Moon", "onyomi": ["GETSU", "GATSU"], "kunyomi": ["tsuki"], "category": "noun" },
        { "character": "火", "primaryReading": "ka", "meaning": "Fire", "onyomi": ["KA"], "kunyomi": ["hi"], "category": "noun" },
        { "character": "水", "primaryReading": "sui", "meaning": "Water", "onyomi": ["SUI"], "kunyomi": ["mizu"], "category": "noun" },
        { "character": "木", "primaryReading": "moku", "meaning": "Tree", "onyomi": ["MOKU", "BOKU"], "kunyomi": ["ki"], "category": "noun" },
        { "character": "金", "primaryReading": "kin", "meaning": "Gold/Money", "onyomi": ["KIN", "KON"], "kunyomi": ["kane"], "category": "noun" },
        { "character": "土", "primaryReading": "do", "meaning": "Soil/Earth", "onyomi": ["DO", "TO"], "kunyomi": ["tsuchi"], "category": "noun" },
        { "character": "山", "primaryReading": "san", "meaning": "Mountain", "onyomi": ["SAN"], "kunyomi": ["yama"], "category": "noun" },
        { "character": "川", "primaryReading": "kawa", "meaning": "River", "onyomi": ["SEN"], "kunyomi": ["kawa"], "category": "noun" },
        { "character": "雨", "primaryReading": "ame", "meaning": "Rain", "onyomi": ["U"], "kunyomi": ["ame"], "category": "noun" },
        { "character": "天", "primaryReading": "ten", "meaning": "Heaven", "onyomi": ["TEN"], "kunyomi": ["ama"], "category": "noun" }
    ],
    "People": [
        { "character": "人", "primaryReading": "jin", "meaning": "Person", "onyomi": ["JIN", "NIN"], "kunyomi": ["hito"], "category": "noun" },
        { "character": "子", "primaryReading": "shi", "meaning": "Child", "onyomi": ["SHI", "SU"], "kunyomi": ["ko"], "category": "noun" },
        { "character": "女", "primaryReading": "jo", "meaning": "Woman", "onyomi": ["JO", "NYO"], "kunyomi": ["onna"], "category": "noun" },
        { "character": "男", "primaryReading": "dan", "meaning": "Man", "onyomi": ["DAN", "NAN"], "kunyomi": ["otoko"], "category": "noun" },
        { "character": "父", "primaryReading": "fu", "meaning": "Father", "onyomi": ["FU"], "kunyomi": ["chichi"], "category": "noun" },
        { "character": "母", "primaryReading": "bo", "meaning": "Mother", "onyomi": ["BO"], "kunyomi": ["haha"], "category": "noun" }
    ],
    "Directions": [
        { "character": "上", "primaryReading": "jou", "meaning": "Up/Above", "onyomi": ["JOU"], "kunyomi": ["ue", "a-geru"], "category": "noun" },
        { "character": "下", "primaryReading": "ka", "meaning": "Down/Below", "onyomi": ["KA", "GE"], "kunyomi": ["shita", "sa-geru"], "category": "noun" },
        { "character": "左", "primaryReading": "sa", "meaning": "Left", "onyomi": ["SA"], "kunyomi": ["hidari"], "category": "noun" },
        { "character": "右", "primaryReading": "u", "meaning": "Right", "onyomi": ["U", "YUU"], "kunyomi": ["migi"], "category": "noun" },
        { "character": "中", "primaryReading": "chuu", "meaning": "Middle/Inside", "onyomi": ["CHUU"], "kunyomi": ["naka"], "category": "noun" },
        { "character": "外", "primaryReading": "gai", "meaning": "Outside", "onyomi": ["GAI", "GE"], "kunyomi": ["soto"], "category": "noun" },
        { "character": "北", "primaryReading": "hoku", "meaning": "North", "onyomi": ["HOKU"], "kunyomi": ["kita"], "category": "noun" },
        { "character": "南", "primaryReading": "nan", "meaning": "South", "onyomi": ["NAN"], "kunyomi": ["minami"], "category": "noun" },
        { "character": "東", "primaryReading": "tou", "meaning": "East", "onyomi": ["TOU"], "kunyomi": ["higashi"], "category": "noun" },
        { "character": "西", "primaryReading": "sei", "meaning": "West", "onyomi": ["SEI", "SAI"], "kunyomi": ["nishi"], "category": "noun" }
    ],
    "Basic Verbs": [
        { "character": "行", "primaryReading": "kou", "meaning": "Go", "onyomi": ["KOU", "GYOU"], "kunyomi": ["i-ku"], "category": "verb", "verbCategory": "godan" },
        { "character": "来", "primaryReading": "rai", "meaning": "Come", "onyomi": ["RAI"], "kunyomi": ["ku-ru"], "category": "verb", "verbCategory": "irregular" },
        { "character": "食", "primaryReading": "shoku", "meaning": "Eat", "onyomi": ["SHOKU"], "kunyomi": ["ta-beru"], "category": "verb", "verbCategory": "ichidan" },
        { "character": "飲", "primaryReading": "in", "meaning": "Drink", "onyomi": ["IN"], "kunyomi": ["no-mu"], "category": "verb", "verbCategory": "godan" },
        { "character": "見", "primaryReading": "ken", "meaning": "See", "onyomi": ["KEN"], "kunyomi": ["mi-ru"], "category": "verb", "verbCategory": "ichidan" },
        { "character": "聞", "primaryReading": "bun", "meaning": "Hear/Listen", "onyomi": ["BUN", "MON"], "kunyomi": ["ki-ku"], "category": "verb", "verbCategory": "godan" },
        { "character": "読", "primaryReading": "doku", "meaning": "Read", "onyomi": ["DOKU"], "kunyomi": ["yo-mu"], "category": "verb", "verbCategory": "godan" },
        { "character": "書", "primaryReading": "sho", "meaning": "Write", "onyomi": ["SHO"], "kunyomi": ["ka-ku"], "category": "verb", "verbCategory": "godan" },
        { "character": "話", "primaryReading": "wa", "meaning": "Talk/Speak", "onyomi": ["WA"], "kunyomi": ["hana-su"], "category": "verb", "verbCategory": "godan" },
        { "character": "買", "primaryReading": "bai", "meaning": "Buy", "onyomi": ["BAI"], "kunyomi": ["ka-u"], "category": "verb", "verbCategory": "godan" }
    ],
    "Basic Adjectives": [
        { "character": "大", "primaryReading": "dai", "meaning": "Big", "onyomi": ["DAI", "TAI"], "kunyomi": ["oo-kii"], "category": "i-adjective" },
        { "character": "小", "primaryReading": "shou", "meaning": "Small", "onyomi": ["SHOU"], "kunyomi": ["chii-sai"], "category": "i-adjective" },
        { "character": "新", "primaryReading": "shin", "meaning": "New", "onyomi": ["SHIN"], "kunyomi": ["atara-shii"], "category": "i-adjective" },
        { "character": "古", "primaryReading": "ko", "meaning": "Old", "onyomi": ["KO"], "kunyomi": ["furu-i"], "category": "i-adjective" },
        { "character": "高", "primaryReading": "kou", "meaning": "High/Expensive", "onyomi": ["KOU"], "kunyomi": ["taka-i"], "category": "i-adjective" },
        { "character": "安", "primaryReading": "an", "meaning": "Cheap/Safe", "onyomi": ["AN"], "kunyomi": ["yasu-i"], "category": "i-adjective" },
        { "character": "長", "primaryReading": "chou", "meaning": "Long/Leader", "onyomi": ["CHOU"], "kunyomi": ["naga-i"], "category": "i-adjective" },
        { "character": "白", "primaryReading": "haku", "meaning": "White", "onyomi": ["HAKU"], "kunyomi": ["shiro"], "category": "i-adjective" },
        { "character": "黒", "primaryReading": "koku", "meaning": "Black", "onyomi": ["KOKU"], "kunyomi": ["kuro"], "category": "i-adjective" },
        { "character": "赤", "primaryReading": "seki", "meaning": "Red", "onyomi": ["SEKI"], "kunyomi": ["aka"], "category": "i-adjective" },
        { "character": "青", "primaryReading": "sei", "meaning": "Blue", "onyomi": ["SEI"], "kunyomi": ["ao"], "category": "i-adjective" }
    ],
    "Time & Frequency": [
        { "character": "時", "primaryReading": "ji", "meaning": "Time/Hour", "onyomi": ["JI"], "kunyomi": ["toki"], "category": "noun" },
        { "character": "間", "primaryReading": "kan", "meaning": "Interval/Space", "onyomi": ["KAN", "KEN"], "kunyomi": ["aida", "ma"], "category": "noun" },
        { "character": "年", "primaryReading": "nen", "meaning": "Year", "onyomi": ["NEN"], "kunyomi": ["toshi"], "category": "noun" },
        { "character": "今", "primaryReading": "kon", "meaning": "Now", "onyomi": ["KON", "KIN"], "kunyomi": ["ima"], "category": "noun" },
        { "character": "午", "primaryReading": "go", "meaning": "Noon", "onyomi": ["GO"], "kunyomi": ["uma"], "category": "noun" },
        { "character": "前", "primaryReading": "zen", "meaning": "Before/Front", "onyomi": ["ZEN"], "kunyomi": ["mae"], "category": "noun" },
        { "character": "後", "primaryReading": "go", "meaning": "After/Behind", "onyomi": ["GO", "KOU"], "kunyomi": ["nochi", "ushi-ro", "ato"], "category": "noun" },
        { "character": "半", "primaryReading": "han", "meaning": "Half", "onyomi": ["HAN"], "kunyomi": ["naka-ba"], "category": "noun" },
        { "character": "分", "primaryReading": "bun", "meaning": "Part/Minute", "onyomi": ["BUN", "FUN", "BU"], "kunyomi": ["wa-keru"], "category": "noun" },
        { "character": "毎", "primaryReading": "mai", "meaning": "Every", "onyomi": ["MAI"], "kunyomi": ["goto-ni"], "category": "prefix" }
    ],
    "Actions & Movement": [
        { "character": "出", "primaryReading": "shutsu", "meaning": "Exit/Leave", "onyomi": ["SHUTSU", "SUI"], "kunyomi": ["de-ru", "da-su"], "category": "verb", "verbCategory": "ichidan" },
        { "character": "入", "primaryReading": "nyuu", "meaning": "Enter", "onyomi": ["NYUU"], "kunyomi": ["i-ru", "hai-ru"], "category": "verb", "verbCategory": "godan" },
        { "character": "休", "primaryReading": "kyuu", "meaning": "Rest/Day Off", "onyomi": ["KYUU"], "kunyomi": ["yasu-mu"], "category": "verb", "verbCategory": "godan" }
    ],
    "Learning & Language": [
        { "character": "学", "primaryReading": "gaku", "meaning": "Study", "onyomi": ["GAKU"], "kunyomi": ["mana-bu"], "category": "verb", "verbCategory": "godan" },
        { "character": "校", "primaryReading": "kou", "meaning": "School", "onyomi": ["KOU"], "kunyomi": [], "category": "noun" },
        { "character": "先", "primaryReading": "sen", "meaning": "Previous/Ahead", "onyomi": ["SEN"], "kunyomi": ["saki", "ma-zu"], "category": "noun" },
        { "character": "生", "primaryReading": "sei", "meaning": "Life/Birth", "onyomi": ["SEI", "SHOU"], "kunyomi": ["i-kiru", "u-mu", "nama"], "category": "noun" },
        { "character": "本", "primaryReading": "hon", "meaning": "Book/Origin", "onyomi": ["HON"], "kunyomi": ["moto"], "category": "noun" },
        { "character": "語", "primaryReading": "go", "meaning": "Word/Language", "onyomi": ["GO"], "kunyomi": ["kata-ru"], "category": "noun" },
        { "character": "名", "primaryReading": "mei", "meaning": "Name", "onyomi": ["MEI", "MYOU"], "kunyomi": ["na"], "category": "noun" }
    ],
    "Daily Life": [
        { "character": "国", "primaryReading": "koku", "meaning": "Country", "onyomi": ["KOKU"], "kunyomi": ["kuni"], "category": "noun" },
        { "character": "車", "primaryReading": "sha", "meaning": "Car/Vehicle", "onyomi": ["SHA"], "kunyomi": ["kuruma"], "category": "noun" },
        { "character": "電", "primaryReading": "den", "meaning": "Electricity", "onyomi": ["DEN"], "kunyomi": [], "category": "noun" },
        { "character": "何", "primaryReading": "nani", "meaning": "What", "onyomi": ["KA"], "kunyomi": ["nani", "nan"], "category": "pronoun" },
        { "character": "気", "primaryReading": "ki", "meaning": "Spirit/Air", "onyomi": ["KI", "KE"], "kunyomi": ["iki"], "category": "noun" },
        { "character": "友", "primaryReading": "yuu", "meaning": "Friend", "onyomi": ["YUU"], "kunyomi": ["tomo"], "category": "noun" }
    ]
};
