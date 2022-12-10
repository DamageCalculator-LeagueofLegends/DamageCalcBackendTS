import { BasedOnLevelStats } from '../BasedOnLevelStats';
import { BonusStats } from '../BonusStats';
import { TotalStats } from '../TotalStats';

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
