export interface BonusStats {
  healthPoints: number;
  mana: number;
  armor: number;
  magicResistance: number;
  attackDamage: number;
  attackSpeed: number;

  [key: string]: number;
}
