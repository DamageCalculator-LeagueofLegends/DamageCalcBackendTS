import { Item } from '../../../Item/Item';
import { TotalStats } from '../TotalStats';

export function multiplicativeCalc(
  currentStat: number,
  itemStat: number
): number {
  if (itemStat !== 0) {
    if (currentStat === 0) return 1 - itemStat / 100;
    else return 1 - currentStat * (itemStat / 100);
  }
  return 0;
}

export function getNumberOfLegendaryItems(items: Item[]): number {
  return items.filter((item) => item.isLegendary).length;
}

export function checkForMythicItemAndGetMythicItem(items: Item[]): Item | null {
  return items.find((item) => item.isMythic) || null;
}

export function setAttackSpeedBasedOnLevel(growth: number, level: number) {
  const total = (growth / 100) * (level - 1) * (0.7025 + 0.175 * (level - 1));
  return total * 100;
}

export function setAttackSpeed(base: number, ratio: number, bonus: number) {
  let total = base + ratio * (bonus / 100);
  // TODO: there is an excpetion for some champs and other conditions needs to implemented at some point lol
  total = Math.min(total, 2.5);
  return total;
}

export function updateMultiplicativeStats(totalStats: TotalStats) {
  let currStats: TotalStats = { ...totalStats };

  currStats.armorPenPercentage = 1 - totalStats.armorPenPercentage;
  currStats.magicPenPercentage = 1 - totalStats.magicPenPercentage;
  currStats.tenacity = 1 - totalStats.tenacity;
  currStats.slowResistance = 1 - totalStats.slowResistance;

  return currStats;
}
