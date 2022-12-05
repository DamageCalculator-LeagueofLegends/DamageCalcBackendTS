import { Item } from '../../../Item/Item';
import { TotalStats } from '../TotalStats';

export function multiplicativeCalc(
  currentStat: number,
  itemStat: number
): number {
  if (itemStat !== 0) {
    if (currentStat === 0) {
      return 1 - itemStat / 100;
    } else {
      return 1 - currentStat * (itemStat / 100);
    }
  }
  return 0;
}

export function getNumberOfLegendaryItems(items: Item[]) {
  let count: number = 0;
  if (items.length > 0) {
    for (const item of items) {
      if (item.isLegendary === true) count++;
    }
  }
  return count;
}

export function checkForMythicItemAndGetMythicItem(items: Item[]) {
  let mythic: Item | null = null;
  if (items.length > 0) {
    for (const item of items) {
      if (item.isMythic === true) mythic = item;
    }
  }
  return mythic;
}

export function setAttackSpeedBasedOnLevel(growth: number, level: number) {
  let total = (growth / 100) * (level - 1) * (0.7025 + 0.175 * (level - 1));
  return total * 100;
}

export function setAttackSpeed(base: number, ratio: number, bonus: number) {
  let total = base + ratio * (bonus / 100);
  // TODO: there is an excpetion for some champs and other conditions needs to implemented at some point lol
  if (total > 2.5) {
    total = 2.5;
  }
  return total;
}

export function updateMultiplicativeStats(totalStats: TotalStats) {
  let currStats: TotalStats = { ...totalStats };

  currStats.armorPenPercentage = 1 - currStats.armorPenPercentage;
  currStats.magicPenPercentage = 1 - currStats.magicPenPercentage;
  currStats.tenacity = 1 - currStats.tenacity;
  currStats.slowResistance = 1 - currStats.slowResistance;

  return currStats;
}
