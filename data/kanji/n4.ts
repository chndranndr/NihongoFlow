import { DrillItem } from '../../types';

// JLPT N4 Kanji — Intermediate Level
// Note: Kanji already in N5 (本, 国, 校, 学, 先, 生, 時, 間, 年, 今, 午, 前, 後, 車, 電) are excluded
export const KANJI_N4: Record<string, DrillItem[]> = {
    "Society & Life": [
        { "character": "政", "primaryReading": "sei", "meaning": "Politics", "onyomi": ["SEI"], "kunyomi": ["matsurigoto"], "category": "noun" },
        { "character": "経", "primaryReading": "kei", "meaning": "Management", "onyomi": ["KEI"], "kunyomi": ["he-ru"], "category": "noun" },
        { "character": "済", "primaryReading": "sai", "meaning": "Settle/Finish", "onyomi": ["SAI"], "kunyomi": ["su-mu"], "category": "verb", "verbCategory": "godan" },
        { "character": "会", "primaryReading": "kai", "meaning": "Meeting", "onyomi": ["KAI"], "kunyomi": ["a-u"], "category": "noun" },
        { "character": "社", "primaryReading": "sha", "meaning": "Company/Shrine", "onyomi": ["SHA"], "kunyomi": ["yashiro"], "category": "noun" },
        { "character": "店", "primaryReading": "ten", "meaning": "Shop", "onyomi": ["TEN"], "kunyomi": ["mise"], "category": "noun" },
        { "character": "町", "primaryReading": "chou", "meaning": "Town", "onyomi": ["CHOU"], "kunyomi": ["machi"], "category": "noun" }
    ],
    "School & Education": [
        { "character": "勉", "primaryReading": "ben", "meaning": "Exertion", "onyomi": ["BEN"], "kunyomi": [], "category": "noun" },
        { "character": "強", "primaryReading": "kyou", "meaning": "Strong", "onyomi": ["KYOU", "GOU"], "kunyomi": ["tsuyo-i"], "category": "i-adjective" },
        { "character": "文", "primaryReading": "bun", "meaning": "Sentence/Text", "onyomi": ["BUN", "MON"], "kunyomi": ["fumi"], "category": "noun" },
        { "character": "字", "primaryReading": "ji", "meaning": "Character", "onyomi": ["JI"], "kunyomi": [], "category": "noun" },
        { "character": "漢", "primaryReading": "kan", "meaning": "China", "onyomi": ["KAN"], "kunyomi": [], "category": "noun" }
    ],
    "Time & Seasons": [
        { "character": "週", "primaryReading": "shuu", "meaning": "Week", "onyomi": ["SHUU"], "kunyomi": [], "category": "noun" },
        { "character": "朝", "primaryReading": "chou", "meaning": "Morning", "onyomi": ["CHOU"], "kunyomi": ["asa"], "category": "noun" },
        { "character": "昼", "primaryReading": "chuu", "meaning": "Daytime", "onyomi": ["CHUU"], "kunyomi": ["hiru"], "category": "noun" },
        { "character": "夕", "primaryReading": "seki", "meaning": "Evening", "onyomi": ["SEKI"], "kunyomi": ["yuu"], "category": "noun" },
        { "character": "夜", "primaryReading": "ya", "meaning": "Night", "onyomi": ["YA"], "kunyomi": ["yoru"], "category": "noun" },
        { "character": "春", "primaryReading": "shun", "meaning": "Spring", "onyomi": ["SHUN"], "kunyomi": ["haru"], "category": "noun" },
        { "character": "夏", "primaryReading": "ka", "meaning": "Summer", "onyomi": ["KA"], "kunyomi": ["natsu"], "category": "noun" },
        { "character": "秋", "primaryReading": "shuu", "meaning": "Autumn", "onyomi": ["SHUU"], "kunyomi": ["aki"], "category": "noun" },
        { "character": "冬", "primaryReading": "tou", "meaning": "Winter", "onyomi": ["TOU"], "kunyomi": ["fuyu"], "category": "noun" }
    ],
    "Transport & Movement": [
        { "character": "駅", "primaryReading": "eki", "meaning": "Station", "onyomi": ["EKI"], "kunyomi": [], "category": "noun" },
        { "character": "自", "primaryReading": "ji", "meaning": "Self", "onyomi": ["JI", "SHI"], "kunyomi": ["mizuka-ra"], "category": "pronoun" },
        { "character": "道", "primaryReading": "dou", "meaning": "Road/Way", "onyomi": ["DOU"], "kunyomi": ["michi"], "category": "noun" },
        { "character": "歩", "primaryReading": "ho", "meaning": "Walk", "onyomi": ["HO", "BU"], "kunyomi": ["aru-ku"], "category": "verb", "verbCategory": "godan" },
        { "character": "走", "primaryReading": "sou", "meaning": "Run", "onyomi": ["SOU"], "kunyomi": ["hashi-ru"], "category": "verb", "verbCategory": "godan" },
        { "character": "止", "primaryReading": "shi", "meaning": "Stop", "onyomi": ["SHI"], "kunyomi": ["to-maru"], "category": "verb", "verbCategory": "godan" },
        { "character": "動", "primaryReading": "dou", "meaning": "Move", "onyomi": ["DOU"], "kunyomi": ["ugo-ku"], "category": "verb", "verbCategory": "godan" }
    ],
    "Body & Health": [
        { "character": "目", "primaryReading": "moku", "meaning": "Eye", "onyomi": ["MOKU"], "kunyomi": ["me"], "category": "noun" },
        { "character": "耳", "primaryReading": "ji", "meaning": "Ear", "onyomi": ["JI"], "kunyomi": ["mimi"], "category": "noun" },
        { "character": "口", "primaryReading": "kou", "meaning": "Mouth", "onyomi": ["KOU"], "kunyomi": ["kuchi"], "category": "noun" },
        { "character": "手", "primaryReading": "shu", "meaning": "Hand", "onyomi": ["SHU"], "kunyomi": ["te"], "category": "noun" },
        { "character": "足", "primaryReading": "soku", "meaning": "Leg/Foot", "onyomi": ["SOKU"], "kunyomi": ["ashi", "ta-riru"], "category": "noun" },
        { "character": "体", "primaryReading": "tai", "meaning": "Body", "onyomi": ["TAI"], "kunyomi": ["karada"], "category": "noun" },
        { "character": "心", "primaryReading": "shin", "meaning": "Heart", "onyomi": ["SHIN"], "kunyomi": ["kokoro"], "category": "noun" }
    ],
    "Family": [
        { "character": "家", "primaryReading": "ka", "meaning": "House/Family", "onyomi": ["KA", "KE"], "kunyomi": ["ie", "uchi"], "category": "noun" },
        { "character": "族", "primaryReading": "zoku", "meaning": "Tribe/Family", "onyomi": ["ZOKU"], "kunyomi": [], "category": "noun" },
        { "character": "兄", "primaryReading": "kyou", "meaning": "Older Brother", "onyomi": ["KYOU"], "kunyomi": ["ani"], "category": "noun" },
        { "character": "弟", "primaryReading": "dai", "meaning": "Younger Brother", "onyomi": ["DAI", "TEI"], "kunyomi": ["otouto"], "category": "noun" },
        { "character": "姉", "primaryReading": "shi", "meaning": "Older Sister", "onyomi": ["SHI"], "kunyomi": ["ane"], "category": "noun" },
        { "character": "妹", "primaryReading": "mai", "meaning": "Younger Sister", "onyomi": ["MAI"], "kunyomi": ["imouto"], "category": "noun" }
    ]
};
