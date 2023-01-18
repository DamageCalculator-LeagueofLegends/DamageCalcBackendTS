import { FighterUnit, FighterStats } from '../Fighter/Fighter';

export class Dummy extends FighterUnit {
  constructor(dummyStats: FighterStats) {
    super('DUMMY', false);
    this.combatStats = {
      totalHealth: dummyStats.totalHealth,
      currentHealth: dummyStats.totalHealth,
      armor: dummyStats.armor,
      magicResistance: dummyStats.magicResistance,
    };
  }

  updateCurrentHealthBasedOnDamage(damage: number) {
    this.combatStats.currentHealth! -= damage;
  }

  updateArmor(armor: number) {
    this.combatStats.armor = armor;
  }

  updateMagicResistance(magicResistance: number) {
    this.combatStats.magicResistance = magicResistance;
  }
}
