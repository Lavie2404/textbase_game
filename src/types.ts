export type CharacterClass = 'cuong_cong' | 'man_cong' | 'phong_thu' | 'khong_che' | 'ho_tro';

export interface Stats {
  atk: number;          // Tấn công
  spd: number;          // Tốc độ
  hp: number;           // Máu tối đa
  def: number;          // Phòng thủ
  critRate: number;     // Tỷ lệ bạo kích (%)
  critDmg: number;      // Sát thương bạo kích (%)
  dmgReduce: number;    // Giảm sát thương (%)
  dmgIncrease: number;  // Tăng sát thương (%)
}

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type ItemType = 'weapon' | 'armor' | 'accessory' | 'boots' | 'helm' | 'anomaly' | 'mount' | 'storage';

export interface PassiveEffect {
  name: string;
  description: string;
  type: 'dmg_inc' | 'dmg_red' | 'heal_turn' | 'crit_boost' | 'spd_boost';
  value: number;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  rarity: Rarity;
  stats: Partial<Stats>;
  substats?: { stat: keyof Stats; value: number }[];
  passiveEffect?: PassiveEffect;
  price: number;
  level: number;
  description: string;
  isEquipped?: boolean;
  enhanceLevel?: number; // Ví dụ: +1, +2
}

export interface Skill {
  id: string;
  name: string;
  type: 'passive' | 'soul' | 'avatar';
  description: string;
  costMp: number;
  effectType: 'dmg' | 'heal' | 'buff_atk' | 'buff_def' | 'shield' | 'stun' | 'passive_atk' | 'passive_hp' | 'passive_crit' | 'passive_dmg_red';
  effectValue: number;
  rarity: Rarity;
  levelReq: number;
  price: number; // Giá bán (vàng hoặc hồn thạch)
}

export interface Monster {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  dmg: number;
  def: number;
  xp: number;
  gold: number;
  type: 'normal' | 'elite' | 'boss';
  imageSeed: string;
}

export interface CombatLog {
  id: string;
  text: string;
  type: 'info' | 'player_attack' | 'monster_attack' | 'heal' | 'dodge' | 'loot' | 'system' | 'victory' | 'defeat';
  timestamp: string;
}

export interface QuestOption {
  text: string;
  reqStat?: keyof Stats;
  reqVal?: number;
  outcome: {
    text: string;
    hpChange: number;
    mpChange: number;
    goldChange: number;
    xpChange: number;
    essenceChange: number;
    itemLoot?: boolean;
    lootRarityChance?: Rarity;
  };
}

export interface AdventureScenario {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  options: QuestOption[];
}

export interface Player {
  name: string;
  class: CharacterClass;
  level: number;
  xp: number;
  maxXp: number;
  gold: number;
  essence: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  baseStats: Stats;
  bonusStats: Stats; // Từ trang bị
  ap: number; // Attribute Points
  inventory: Item[];
  activeZoneId: string;
  kills: number;
  skills?: string[]; // danh sách kỹ năng đã mở khóa
  equippedSkills?: {
    passive: string[]; // tối đa 3
    soul: string[];    // tối đa 8
    avatar: string | null; // tối đa 1
  };
}

export interface Zone {
  id: string;
  name: string;
  minLevel: number;
  description: string;
  bgClass: string;
  monsters: string[];
}
