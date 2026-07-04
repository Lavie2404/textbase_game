import { Item, ItemType, Rarity, Stats, Monster, AdventureScenario, QuestOption, PassiveEffect } from '../types';

// Danh sách tên vật phẩm bằng Tiếng Việt đậm chất tiên hiệp / giả tưởng
const WEAPON_NAMES: Record<string, string[]> = {
  cuong_cong: ['Khai Thiên Phủ', 'Vô Cực Trọng Đao', 'Bá Vương Thần Thương', 'Cự Long Trảm', 'Xích Thần Kiếm', 'Hủy Diệt Ma Chùy'],
  man_cong: ['Tật Phong Chủy Thủ', 'Hắc Ám Song Nhận', 'Ám Ảnh Ly Hồn Thích', 'Huyết Ảnh Tuyệt Sát Kiếm', 'Vô Ảnh Cổ Đoản Kiếm'],
  phong_thu: ['Huyền Vũ Thần Khiên', 'Thái Cổ Trọng Khiên', 'Đại Đại Trọng Chùy', 'Hộ Quốc Thần Thương', 'Ngự Ma Khiên'],
  khong_che: ['U Minh Tỏa Hồn Xích', 'Tinh Thần Khống Thư', 'Cực Băng Trượng', 'Phong Thần Tiên', 'Hỗn Độn Kính'],
  ho_tro: ['Thánh Quang Thần Trượng', 'Cam Lộ Ngọc Bình', 'Sinh Mệnh Thần Đăng', 'Bách Thảo Bảo Điển', 'Hồi Thiên Phù']
};

const ARMOR_NAMES = [
  'Huyền Vũ Khải', 'Kim Ty Long Lân Giáp', 'Long Thần Bảo Y', 'Đại Địa Chiến Giáp', 'Thánh Vương Hộ Bào', 'Ma Hồn Y', 'Huyền Nguyên Trùng Giáp'
];

const ACCESSORY_NAMES = [
  'Nhẫn Long Nhãn', 'Phỉ Thúy Ngọc Bội', 'Cổ Thần Liên', 'Ngự Hồn Giới Chỉ', 'Cực Quang Liên', 'Hạng Liên Thái Dương', 'Thiên Lạc Ngọc Bội'
];

const BOOTS_NAMES = [
  'Tật Phong Ngoa', 'Bá Vương Chiến Ngoa', 'Lăng Ba Vi Bộ Hài', 'Thần Hành Trọng Hài', 'Thần Vân Bộ Bộ Sinh Liên'
];

const HELM_NAMES = [
  'Tinh Thần Quán', 'Huyền Vũ Thần Mũ', 'Long Hoàng Khôi', 'Phượng Vũ Sức', 'Huyết Ám Mũ'
];

const ANOMALY_NAMES = [
  'Ma Diễm Quỷ Đăng', 'Cổ Ngữ Linh Chúc', 'Thôn Phệ Ma Nhãn', 'Hỗn Độn Ngọc Tỷ', 'Bách Quỷ Dạ Hành Đồ'
];

const MOUNT_NAMES = [
  'Huyết Lân Độc Giác Thú', 'Ngự Gió Thần Phi Kiếm', 'Thái Cổ Kim Long', 'Hắc Diễm Ma Hổ', 'U Minh Cốt Quy'
];

const STORAGE_NAMES = [
  'Càn Khôn Túi', 'Hư Không Giới Chỉ', 'Thiên Địa Trữ Hộp', 'Di Thần Túi', 'Tụ Bảo Bồn'
];

const SPECIAL_TRAITS = [
  'Vô Địch', 'Hủy Diệt', 'Thần Thoại', 'Bất Tử', 'Tội Lỗi', 'Hư Không', 'Cổ Đại', 'Thiên Giới', 'Địa Ngục', 'Thái Cổ', 'Hỗn Độn'
];

const RARITY_PREFACES: Record<Rarity, string> = {
  common: 'Sứt Mẻ',
  uncommon: 'Cường Hóa',
  rare: 'Kỳ Dị',
  epic: 'Trầm Tích',
  legendary: 'Thượng Cổ',
  mythic: 'Thái Cổ'
};

export const PASSIVE_EFFECTS: PassiveEffect[] = [
  { name: "Chiến Ý Thần Thoại", description: "Tăng 15% Sát thương đầu ra", type: "dmg_inc", value: 15 },
  { name: "Long Lân Hộ Thể", description: "Giảm 15% Sát thương nhận vào", type: "dmg_red", value: 15 },
  { name: "Hồi Thiên Chi Lực", description: "Hồi phục 8% HP tối đa mỗi lượt đấu", type: "heal_turn", value: 8 },
  { name: "Thần Lực Chí Mạng", description: "Tăng thêm 15% Tỷ lệ bạo kích", type: "crit_boost", value: 15 },
  { name: "Bạo Phong Tốc Độ", description: "Tăng thêm 15% Tốc độ hành động", type: "spd_boost", value: 15 },
];

export const ZONES = [
  {
    id: 'zone_1',
    name: 'Tân Thủ Thôn & Rừng Khởi Đầu',
    minLevel: 1,
    description: 'Nơi tập luyện của các mạo hiểm giả mới. Quái vật chủ yếu là Slime, Thỏ Hoang và Goblin yếu ớt.',
    bgClass: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
    monsters: ['Slime Chất Độc', 'Thỏ Đột Biến', 'Goblin Trộm Cắp', 'Yêu Tinh Sồi']
  },
  {
    id: 'zone_2',
    name: 'Hang Động Quỷ Gió',
    minLevel: 5,
    description: 'Một hang động ẩm ướt đầy gió hú và bóng tối. Quái vật ở đây nhanh nhẹn và tàn ác hơn.',
    bgClass: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300',
    monsters: ['Dơi Hút Máu', 'Sói Xám Đói', 'Quỷ Lùn Hang Động', 'Thủ Lĩnh Goblin']
  },
  {
    id: 'zone_3',
    name: 'Phế Tích Cổ Đại Linh Hồn',
    minLevel: 10,
    description: 'Phế tích còn sót lại sau cuộc chiến ngàn năm. Linh hồn vất vưởng và quái vật khổng lồ canh giữ kho báu cổ.',
    bgClass: 'bg-purple-950/40 border-purple-500/30 text-purple-300',
    monsters: ['Bộ Xương Chiến Sĩ', 'Linh Hồn Ai Oán', 'Cương Thi Cổ Thư', 'Golem Đá Cổ']
  },
  {
    id: 'zone_4',
    name: 'Núi Lửa Tận Diệt (Boss)',
    minLevel: 15,
    description: 'Nơi rực lửa vĩnh hằng, có sự ngự trị của Ma Long và Ma Vương rực cháy. Chỉ có chiến sĩ vĩ đại nhất mới sống sót.',
    bgClass: 'bg-rose-950/40 border-rose-500/30 text-rose-300',
    monsters: ['Quỷ Lửa Inferno', 'Khổng Lồ Nham Thạch', 'Phượng Hoàng Lửa Quỷ', 'Ma Long Thượng Cổ']
  }
];

export function generateItem(level: number, forceRarity?: Rarity, forceType?: ItemType, playerLuk: number = 5): Item {
  const id = Math.random().toString(36).substring(2, 9);
  
  // Xác định độ hiếm dựa trên tỉ lệ ngẫu nhiên và chỉ số May Mắn (từ trang bị, hoặc mặc định)
  let rarity: Rarity = 'common';
  if (forceRarity) {
    rarity = forceRarity;
  } else {
    const roll = Math.random() * 100 + (playerLuk * 0.1);
    if (roll > 99) rarity = 'mythic';
    else if (roll > 95) rarity = 'legendary';
    else if (roll > 82) rarity = 'epic';
    else if (roll > 60) rarity = 'rare';
    else if (roll > 30) rarity = 'uncommon';
    else rarity = 'common';
  }

  // Xác định loại vật phẩm (8 loại)
  const types: ItemType[] = ['weapon', 'armor', 'accessory', 'boots', 'helm', 'anomaly', 'mount', 'storage'];
  const type = forceType || types[Math.floor(Math.random() * types.length)];

  // Tạo tên vật phẩm phù hợp
  let name = '';
  const prefix = RARITY_PREFACES[rarity];

  if (type === 'weapon') {
    const classes = ['cuong_cong', 'man_cong', 'phong_thu', 'khong_che', 'ho_tro'];
    const chosenClass = classes[Math.floor(Math.random() * classes.length)];
    const pool = WEAPON_NAMES[chosenClass];
    name = pool[Math.floor(Math.random() * pool.length)];
  } else if (type === 'armor') {
    name = ARMOR_NAMES[Math.floor(Math.random() * ARMOR_NAMES.length)];
  } else if (type === 'accessory') {
    name = ACCESSORY_NAMES[Math.floor(Math.random() * ACCESSORY_NAMES.length)];
  } else if (type === 'boots') {
    name = BOOTS_NAMES[Math.floor(Math.random() * BOOTS_NAMES.length)];
  } else if (type === 'helm') {
    name = HELM_NAMES[Math.floor(Math.random() * HELM_NAMES.length)];
  } else if (type === 'anomaly') {
    name = ANOMALY_NAMES[Math.floor(Math.random() * ANOMALY_NAMES.length)];
  } else if (type === 'mount') {
    name = MOUNT_NAMES[Math.floor(Math.random() * MOUNT_NAMES.length)];
  } else {
    name = STORAGE_NAMES[Math.floor(Math.random() * STORAGE_NAMES.length)];
  }

  // Nếu là Huyền Thoại hoặc Thần Thoại, thêm danh hiệu vĩ đại
  if (rarity === 'legendary' || rarity === 'mythic') {
    const trait = SPECIAL_TRAITS[Math.floor(Math.random() * SPECIAL_TRAITS.length)];
    name = `[${trait}] ${name}`;
  } else {
    name = `${prefix} ${name}`;
  }

  // Tính toán chỉ số chính dựa trên Level và Rarity
  const stats: Partial<Stats> = {};
  const multiplier = {
    common: 1.0,
    uncommon: 1.4,
    rare: 1.9,
    epic: 2.6,
    legendary: 3.8,
    mythic: 5.5
  }[rarity];

  // Base stats depending on type
  if (type === 'weapon') {
    stats.atk = Math.round(level * 5 * multiplier);
    stats.dmgIncrease = Math.round(level * 1.0 * multiplier);
  } else if (type === 'armor') {
    stats.hp = Math.round(level * 35 * multiplier);
    stats.def = Math.round(level * 3 * multiplier);
  } else if (type === 'accessory') {
    stats.critDmg = Math.round(10 + level * 2 * multiplier);
    stats.dmgIncrease = Math.round(level * 0.8 * multiplier);
  } else if (type === 'boots') {
    stats.spd = Math.round(5 + level * 1.5 * multiplier);
    stats.critRate = Math.round(2 + level * 0.4 * multiplier);
  } else if (type === 'helm') {
    stats.hp = Math.round(level * 20 * multiplier);
    stats.def = Math.round(level * 2 * multiplier);
  } else if (type === 'anomaly') {
    stats.critRate = Math.round(3 + level * 0.5 * multiplier);
    stats.dmgIncrease = Math.round(level * 1.2 * multiplier);
  } else if (type === 'mount') {
    stats.spd = Math.round(8 + level * 2.0 * multiplier);
    stats.dmgReduce = Math.round(level * 0.6 * multiplier);
  } else if (type === 'storage') {
    stats.hp = Math.round(level * 25 * multiplier);
    stats.dmgReduce = Math.round(level * 0.8 * multiplier);
  }

  // Thêm chỉ số phụ ngẫu nhiên (1 đến 7 dòng dựa trên độ hiếm)
  const extraStatsCount = {
    common: 0,
    uncommon: 1, // 1 dòng
    rare: 3,     // 3 dòng
    epic: 4,     // 4 dòng
    legendary: 6, // 6 dòng
    mythic: 7    // 7 dòng phụ!
  }[rarity];

  const possibleStats: (keyof Stats)[] = ['atk', 'spd', 'hp', 'def', 'critRate', 'critDmg', 'dmgReduce', 'dmgIncrease'];
  const substats: { stat: keyof Stats; value: number }[] = [];
  
  if (extraStatsCount > 0) {
    // Trộn ngẫu nhiên danh sách thuộc tính có sẵn
    const shuffled = [...possibleStats].sort(() => 0.5 - Math.random());
    const selectedKeys = shuffled.slice(0, extraStatsCount);
    
    selectedKeys.forEach(statKey => {
      let val = 0;
      if (statKey === 'atk') val = Math.round((Math.random() * 2 + 1) * level * multiplier);
      else if (statKey === 'spd') val = Math.round((Math.random() * 1 + 0.5) * level * multiplier);
      else if (statKey === 'hp') val = Math.round((Math.random() * 15 + 8) * level * multiplier);
      else if (statKey === 'def') val = Math.round((Math.random() * 1.5 + 0.5) * level * multiplier);
      else if (statKey === 'critRate') val = Math.round(2 + (Math.random() * 1.5) * multiplier);
      else if (statKey === 'critDmg') val = Math.round(5 + (Math.random() * 4) * multiplier);
      else if (statKey === 'dmgReduce') val = Math.round(1 + (Math.random() * 0.8) * multiplier);
      else if (statKey === 'dmgIncrease') val = Math.round(1 + (Math.random() * 0.8) * multiplier);
      
      substats.push({ stat: statKey, value: val });
    });
  }

  // Nếu là Huyền Thoại hoặc Thần Thoại, ban tặng đặc tính đặc biệt
  let passiveEffect: PassiveEffect | undefined;
  if (rarity === 'legendary' || rarity === 'mythic') {
    passiveEffect = PASSIVE_EFFECTS[Math.floor(Math.random() * PASSIVE_EFFECTS.length)];
  }

  const price = Math.round(level * 40 * multiplier);
  const descriptions: Record<Rarity, string> = {
    common: 'Trang bị cơ bản phổ biến khắp mọi ngóc ngách đại lục.',
    uncommon: 'Được chế tác khéo léo hơn thông thường, ẩn chứa năng lượng nhẹ.',
    rare: 'Ẩn chứa lực lượng nguyên tố hiếm gặp, phát ra ánh sáng lam nhạt.',
    epic: 'Cổ vật báu vật gia tộc cực kỳ mạnh mẽ, khảm bảo thạch lấp lánh linh lực.',
    legendary: 'Trang bị thượng cổ truyền thuyết mang ý chí thần binh, đủ sức lay trời chuyển đất.',
    mythic: 'Thần khí chí cao thái cổ, tích tụ tinh hoa tinh tú, vạn thế bất diệt.'
  };

  return {
    id,
    name,
    type,
    rarity,
    stats,
    substats,
    passiveEffect,
    price,
    level,
    description: descriptions[rarity],
    isEquipped: false,
    enhanceLevel: 0
  };
}

export function generateMonster(zoneId: string, playerLevel: number): Monster {
  const zone = ZONES.find(z => z.id === zoneId) || ZONES[0];
  const monsterName = zone.monsters[Math.floor(Math.random() * zone.monsters.length)];
  
  // Quyết định quái thường, Tinh Anh (Elite) hay Boss tinh anh
  const roll = Math.random() * 100;
  let monsterType: 'normal' | 'elite' | 'boss' = 'normal';
  let levelModifier = 0;
  let hpMultiplier = 1;
  let statMultiplier = 1;

  if (roll > 95 || monsterName.includes('Ma Long') || monsterName.includes('Thủ Lĩnh')) {
    monsterType = 'boss';
    levelModifier = 2;
    hpMultiplier = 5;
    statMultiplier = 2.0;
  } else if (roll > 80) {
    monsterType = 'elite';
    levelModifier = 1;
    hpMultiplier = 2.5;
    statMultiplier = 1.4;
  }

  const level = Math.max(zone.minLevel, playerLevel + levelModifier - (Math.random() > 0.5 ? 1 : 0));
  const maxHp = Math.round(level * 50 * hpMultiplier);
  const dmg = Math.round(level * 5 * statMultiplier);
  const def = Math.round(level * 2 * statMultiplier);
  const xp = Math.round(level * 15 * hpMultiplier);
  const gold = Math.round(level * 8 * hpMultiplier + Math.random() * 10);
  
  const id = Math.random().toString(36).substring(2, 9);
  const imageSeed = monsterName.toLowerCase().replace(/\s+/g, '_');

  return {
    id,
    name: `${monsterType === 'boss' ? '[BOSS] ' : monsterType === 'elite' ? '[T.ANH] ' : ''}${monsterName}`,
    level,
    hp: maxHp,
    maxHp,
    dmg,
    def,
    xp,
    gold,
    type: monsterType,
    imageSeed
  };
}

// Cốt truyện dã ngoại dựng sẵn khi Gemini ngoại tuyến
export function getOfflineScenario(playerLevel: number, playerStats: Stats): AdventureScenario {
  const offlineScenarios: Omit<AdventureScenario, 'id'>[] = [
    {
      title: 'Nhà Giả Kim Bí Ẩn',
      description: 'Trong sương mù dày đặc của rừng sâu, bạn bắt gặp một túp lều cũ tỏa ra mùi hương kỳ lạ. Một lão già có râu tóc dài trắng xóa đang khuấy một vạc nước xanh rờn. Lão ngước lên nhìn bạn và cười: "Kẻ mạo hiểm, ngươi có dám thử nghiệm độc dược mới nhất của ta không? Có thể nó sẽ cho ngươi sức mạnh vô biên, hoặc... thiêu rụi kinh mạch của ngươi."',
      options: [
        {
          text: 'Thử thách dũng khí uống tiên dược (Yêu cầu Tấn Công >= 25)',
          reqStat: 'atk',
          reqVal: 25,
          outcome: {
            text: 'Nhờ thần lực tấn công mãnh liệt trấn áp dược tính, bạn hấp thụ trọn vẹn dược lực! Cơ bắp căng tràn lực lượng cuồn cuộn.',
            hpChange: 30,
            mpChange: 0,
            goldChange: 150,
            xpChange: 150,
            essenceChange: 3,
            itemLoot: true,
            lootRarityChance: 'rare'
          }
        },
        {
          text: 'Vận khí điều hòa vạc thuốc độc (Yêu cầu Tốc Độ >= 20)',
          reqStat: 'spd',
          reqVal: 20,
          outcome: {
            text: 'Với phản xạ thần tốc và tốc độ kinh hoàng, bạn điều hòa dòng chảy nhiệt độ của vạc đan dược. Đan dược thành công đan thành màu hoàng kim linh động! Lão giả cung kính hiến dâng bảo vật.',
            hpChange: 0,
            mpChange: 30,
            goldChange: 300,
            xpChange: 200,
            essenceChange: 6,
            itemLoot: true,
            lootRarityChance: 'epic'
          }
        },
        {
          text: 'Trộm tiên đan quý giá của lão rồi đào tẩu (Yêu cầu Tỷ Lệ Chí Mạng >= 15)',
          reqStat: 'critRate',
          reqVal: 15,
          outcome: {
            text: 'Tấn công chí mạng siêu chuẩn xác dập tắt ngọn lửa bảo vệ của phong ấn, bạn nẫng đi thần đan tuyệt mỹ rồi biến mất trong chớp mắt. Nhận được một lượng lớn tài nguyên và một trang bị Sử Thi!',
            hpChange: -10,
            mpChange: 0,
            goldChange: 200,
            xpChange: 150,
            essenceChange: 4,
            itemLoot: true,
            lootRarityChance: 'epic'
          }
        },
        {
          text: 'Lịch sự từ chối và nép mình rời đi',
          outcome: {
            text: 'Bạn mỉm cười lịch thiệp khước từ lời mời kỳ quái rồi đi tiếp. Lão giả gật đầu tỏ ý tán thưởng sự cẩn trọng của bạn.',
            hpChange: 20,
            mpChange: 10,
            goldChange: 30,
            xpChange: 50,
            essenceChange: 0
          }
        }
      ]
    },
    {
      title: 'Bàn Thờ Cổ Thần Cấm Kỵ',
      description: 'Trước mắt bạn là một bệ đá rêu phong sừng sững giữa phế tích cổ, phủ đầy những chữ ký tự rune đỏ ngầu rực sáng dị thường. Một giọng nói vang vọng trực tiếp trong tâm trí bạn: "Hỡi phàm nhân yếu đuối... dâng hiến máu mủ của ngươi, ta sẽ ban tặng cổ khí... Hoặc hãy biến đi trước khi ngọn lửa hận thù của ta nuốt chửng linh hồn ngươi."',
      options: [
        {
          text: 'Hiến tế sức mạnh bùng nổ (Yêu cầu Sát Thương Bạo Kích >= 160)',
          reqStat: 'critDmg',
          reqVal: 160,
          outcome: {
            text: 'Sức mạnh chí mạng hủy diệt của bạn dung hợp hoàn mỹ với bệ đá! Cổ Thần run rẩy ban tặng thần binh tối thượng!',
            hpChange: 50,
            mpChange: 50,
            goldChange: 200,
            xpChange: 350,
            essenceChange: 12,
            itemLoot: true,
            lootRarityChance: 'legendary'
          }
        },
        {
          text: 'Vận dụng bức tường hộ thể hấp thụ rune (Yêu cầu Giảm Sát Thương >= 10)',
          reqStat: 'dmgReduce',
          reqVal: 10,
          outcome: {
            text: 'Khả năng giảm sát thương bền bỉ của bạn lọc sạch khí tức hắc ám của rune, giải phóng chân nguyên ma lực thần diệu!',
            hpChange: -20,
            mpChange: 20,
            goldChange: 150,
            xpChange: 280,
            essenceChange: 15,
            itemLoot: true,
            lootRarityChance: 'rare'
          }
        },
        {
          text: 'Hiến tế một phần sinh lực kiếm cổ ấn',
          outcome: {
            text: 'Bạn rạch tay nhỏ máu dâng lên Cổ Thần. Luồng ác khí thâm nhập kinh mạch gây thống khổ vạn phần, nhưng một pháp bảo Thần Thoại tỏa sáng chói lọi xuất thế!',
            hpChange: -60,
            mpChange: -20,
            goldChange: 250,
            xpChange: 200,
            essenceChange: 8,
            itemLoot: true,
            lootRarityChance: 'mythic'
          }
        }
      ]
    }
  ];

  const base = offlineScenarios[Math.floor(Math.random() * offlineScenarios.length)];
  return {
    ...base,
    id: Math.random().toString(36).substring(2, 9)
  };
}
