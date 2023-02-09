import { BasedOnLevelStats } from '../types/BasedOnLevelStats';
import { BonusStats } from '../types/BonusStats';
import { TotalStats } from '../types/TotalStats';

export function getTotalStatsFromLevelStatsAndBonusStats(
  levelStats: BasedOnLevelStats | null,
  bonusStats: BonusStats,
  totalStats: TotalStats
): TotalStats {
  let stats: TotalStats = { ...totalStats };

  stats.healthPoints += levelStats!.healthPoints + bonusStats.healthPoints;
  stats.healthRegen += levelStats!.healthPointsRegen;
  stats.mana += levelStats!.mana + bonusStats.mana;
  stats.manaRegen += levelStats!.manaRegen;
  stats.armor += levelStats!.armor + bonusStats.armor;
  stats.magicResistance +=
    levelStats!.magicResistance + bonusStats.magicResistance;
  stats.attackDamage += levelStats!.attackDamage + bonusStats.attackDamage;

  return stats;
}
