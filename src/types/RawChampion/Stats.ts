export interface Stats {
  health: StatsInfo;
  healthRegen: StatsInfo;
  mana: StatsInfo;
  manaRegen: StatsInfo;
  armor: StatsInfo;
  magicResistance: StatsInfo;
  attackDamage: StatsInfo;
  movespeed: StatsInfo;
  acquisitionRadius: StatsInfo;
  selectionRadius: StatsInfo;
  pathingRadius: StatsInfo;
  gameplayRadius: StatsInfo;
  criticalStrikeDamage: StatsInfo;
  criticalStrikeDamageModifier: StatsInfo;
  attackSpeed: StatsInfo;
  attackSpeedRatio: StatsInfo;
  attackCastTime: StatsInfo;
  attackTotalTime: StatsInfo;
  attackDelayOffset: StatsInfo;
  attackRange: StatsInfo;
  aramDamageTaken: StatsInfo;
  aramDamageDealt: StatsInfo;
  aramHealing: StatsInfo;
  aramShielding: StatsInfo;
  urfDamageTaken: StatsInfo;
  urfDamageDealt: StatsInfo;
  urfHealing: StatsInfo;
  urfShielding: StatsInfo;
}

export interface StatsInfo {
  flat: number;
  percent: number;
  perLevel: number;
  percentPerLevel: number;
}
