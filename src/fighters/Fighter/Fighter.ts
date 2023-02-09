export class FighterUnit {
  tpye: FighterType;

  combatStats: FighterStats;

  mayAttack: boolean;

  constructor(type: FighterType, mayAttack: boolean) {
    this.tpye = type;
    this.mayAttack = mayAttack;
  }

  dealDamage(action: Function) {
    return action();
  }
}

export type FighterType = 'CHAMPION' | 'DUMMY' | 'MINION' | 'TOWER';

export interface FighterStats {
  totalHealth: number;
  currentHealth?: number;
  armor: number;
  magicResistance: number;
}
