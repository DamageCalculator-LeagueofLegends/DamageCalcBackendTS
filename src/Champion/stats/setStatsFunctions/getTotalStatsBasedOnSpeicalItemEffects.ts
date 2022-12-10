import { Item } from '../../../Item/Item';
import { BasedOnLevelStats } from '../BasedOnLevelStats';
import { BonusStats } from '../BonusStats';
import { TotalStats } from '../TotalStats';

export function getTotalStatsBasedOnSpeicalItemEffects(
  items: Item[],
  levelStats: BasedOnLevelStats | null,
  bonusStats: BonusStats,
  totalStats: TotalStats
): UpdateStats | null {
  let currStats: UpdateStats | null = null;

  let currBonusStats: BonusStats = { ...bonusStats };
  let currTotalStats: TotalStats = { ...totalStats };
  let currUpdatedStats: UpdateStats = {
    bonusStats: currBonusStats,
    totalStats: currTotalStats,
  };

  if (items.length > 0) {
    for (let item of items) {
      //Sterak's Gage
      if (item.itemID === 3053) {
        currUpdatedStats.bonusStats.attackDamage +=
          0.45 * levelStats!.attackDamage;
        currUpdatedStats.totalStats.attackDamage +=
          0.45 * levelStats!.attackDamage;
        currStats = currUpdatedStats;
      }
      //Rabadon's Deathcap
      else if (item.itemID === 3089) {
        currUpdatedStats.totalStats.abilityPower *= 1.35;
        currStats = currUpdatedStats;
      }
      //Titanic Hydra
      else if (item.itemID === 3748) {
        currUpdatedStats.bonusStats.attackDamage +=
          0.45 * bonusStats.healthPoints;
        currUpdatedStats.totalStats.attackDamage +=
          0.45 * bonusStats.healthPoints;
        currStats = currUpdatedStats;
      }
      //Demonic Embrace
      else if (item.itemID === 4637) {
        currUpdatedStats.totalStats.abilityPower +=
          0.45 * bonusStats.healthPoints;
        currStats = currUpdatedStats;
      }
    }
  }

  return currStats;
}

export interface UpdateStats {
  bonusStats: BonusStats;
  totalStats: TotalStats;
}
