import { Item } from '../../../Item/Item';
import { BonusStats } from '../BonusStats';
import {
  checkForMythicItemAndGetMythicItem,
  getNumberOfLegendaryItems,
} from './helperFunctions';

export function getBonusStatsFromItems(
  items: Item[],
  attackSpeed: number
): BonusStats {
  let currStats: BonusStats = {
    healthPoints: 0,
    mana: 0,
    armor: 0,
    magicResistance: 0,
    attackDamage: 0,
    attackSpeed: attackSpeed,
  };

  const numberOfLegendaryItems: number = getNumberOfLegendaryItems(items);
  const mythicItem = checkForMythicItemAndGetMythicItem(items);

  const hasMythic = mythicItem != null;

  if (items.length > 0) {
    for (const item of items) {
      currStats.healthPoints += item.itemStats.health.flat;
      currStats.mana += item.itemStats.mana.flat;
      currStats.armor += item.itemStats.armor.flat;
      currStats.magicResistance += item.itemStats.magicResistance.flat;
      currStats.attackDamage += Array.isArray(item.itemStats.attackDamage)
        ? item.itemStats.attackDamage[0]!.flat
        : item.itemStats.attackDamage.flat;
      currStats.attackSpeed += item.itemStats.attackSpeed.flat;
    }

    if (hasMythic) {
      currStats.healthPoints +=
        mythicItem.mythicStats.health.flat * numberOfLegendaryItems;
      currStats.armor +=
        mythicItem.mythicStats.armor.flat * numberOfLegendaryItems;
      currStats.magicResistance +=
        mythicItem.mythicStats.magicResistance.flat * numberOfLegendaryItems;
      currStats.attackDamage += Array.isArray(
        mythicItem.mythicStats.attackDamage
      )
        ? mythicItem.mythicStats.attackDamage[0]!.flat * numberOfLegendaryItems
        : mythicItem.mythicStats.attackDamage.flat * numberOfLegendaryItems;
      currStats.attackSpeed +=
        mythicItem.mythicStats.attackSpeed.flat * numberOfLegendaryItems;
    }
  }
  return currStats;
}
