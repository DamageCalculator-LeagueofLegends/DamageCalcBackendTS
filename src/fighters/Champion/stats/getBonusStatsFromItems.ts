import { Item } from '../../../items/Item/Item';
import {
  checkForMythicItemAndGetMythicItem,
  getNumberOfLegendaryItems,
} from './helperFunctions';
import { BonusStats } from './types/BonusStats';

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
      const {
        health,
        mana,
        armor,
        magicResistance,
        attackDamage,
        attackSpeed,
      } = item.itemStats;
      currStats.healthPoints += health.flat;
      currStats.mana += mana.flat;
      currStats.armor += armor.flat;
      currStats.magicResistance += magicResistance.flat;
      currStats.attackDamage += Array.isArray(attackDamage)
        ? attackDamage[0]!.flat
        : attackDamage.flat;
      currStats.attackSpeed += attackSpeed.flat;
    }

    if (hasMythic) {
      const { health, armor, magicResistance, attackDamage, attackSpeed } =
        mythicItem.mythicStats;
      currStats.healthPoints += health.flat * numberOfLegendaryItems;
      currStats.armor += armor.flat * numberOfLegendaryItems;
      currStats.magicResistance +=
        magicResistance.flat * numberOfLegendaryItems;
      currStats.attackDamage += Array.isArray(attackDamage)
        ? attackDamage[0]!.flat * numberOfLegendaryItems
        : attackDamage.flat * numberOfLegendaryItems;
      currStats.attackSpeed += attackSpeed.flat * numberOfLegendaryItems;
    }
  }
  return currStats;
}
