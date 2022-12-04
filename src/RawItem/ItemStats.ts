export interface ItemStats {
  abilityPower: ItemStatsInfo;
  armor: ItemStatsInfo;
  armorPenetration: ItemStatsInfo;
  attackDamage: ItemStatsInfo | ItemStatsInfo[];
  attackSpeed: ItemStatsInfo;
  cooldownReduction: ItemStatsInfo;
  criticalStrikeChance: ItemStatsInfo;
  goldPer_10: ItemStatsInfo;
  healAndShieldPower: ItemStatsInfo;
  health: ItemStatsInfo;
  healthRegen: ItemStatsInfo;
  lethality: ItemStatsInfo;
  lifesteal: ItemStatsInfo;
  magicPenetration: ItemStatsInfo;
  magicResistance: ItemStatsInfo;
  mana: ItemStatsInfo;
  manaRegen: ItemStatsInfo;
  movespeed: ItemStatsInfo | number;
  abilityHaste: ItemStatsInfo;
  omnivamp: ItemStatsInfo;
  tenacity: ItemStatsInfo;
  slowResitance?: ItemStatsInfo;
  physicalVamp?: ItemStatsInfo;
}

export interface ItemStatsInfo {
  flat: number;
  percent: number;
  perLevel: number;
  percentPerLevel: number;
  percentBase: number;
  percentBonus: number;
}
