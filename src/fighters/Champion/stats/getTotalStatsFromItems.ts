import { Item } from '../../../items/Item/Item';
import { UtilInfo } from '../types/UtilInfo';
import {
  getNumberOfLegendaryItems,
  checkForMythicItemAndGetMythicItem,
  updateMultiplicativeStats,
} from './helperFunctions';
import { TotalStats } from './types/TotalStats';
import { totalStatsFromItems } from './utilityFunctions/totalStatsFromItems';
import { totalStatsFromMythic } from './utilityFunctions/totalStatsFromMythic';

export function getTotalStatsFromItems(
  items: Item[],
  utilInfo: UtilInfo
): TotalStats {
  let currStats: TotalStats = {
    healthPoints: 0,
    mana: 0,
    armor: 0,
    magicResistance: 0,
    attackDamage: 0,

    attackSpeed: 0,

    criticalChance: 0,
    lethalityFlat: 0,
    magicPenFlat: 0,
    abilityPower: 0,
    abilityHaste: 0,
    healAndShieldPower: 0,
    lifeSteal: 0,
    omnivamp: 0,
    physicalVamp: 0,

    healthRegen: 0,
    manaRegen: 0,

    armorPenPercentage: 0,
    magicPenPercentage: 0,
    tenacity: 0,
    slowResistance: 0,
  };

  const numberOfLegendaryItems: number = getNumberOfLegendaryItems(items);

  const mythicItem = checkForMythicItemAndGetMythicItem(items);

  const hasMythic = mythicItem != null;

  for (const item of items) {
    currStats = totalStatsFromItems(item, currStats, utilInfo);
  }

  if (hasMythic) {
    currStats = totalStatsFromMythic(
      mythicItem,
      numberOfLegendaryItems,
      currStats
    );
  }

  currStats = updateMultiplicativeStats(currStats);

  return currStats;
}
