export interface TotalStats {
  healthPoints: number;
  mana: number;
  armor: number;
  magicResistance: number;
  attackDamage: number;

  attackSpeed: number;

  criticalChance: number;
  lethalityFlat: number;
  magicPenFlat: number;
  abilityPower: number;
  abilityHaste: number;
  healAndShieldPower: number;
  lifeSteal: number;
  omnivamp: number;
  physicalVamp: number;

  healthRegen: number;
  manaRegen: number;

  armorPenPercentage: number;
  magicPenPercentage: number;
  tenacity: number;
  slowResistance: number;

  [key: string]: number;
}
