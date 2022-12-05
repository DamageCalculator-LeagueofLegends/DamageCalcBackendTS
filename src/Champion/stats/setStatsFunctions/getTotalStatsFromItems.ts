import { Item } from '../../../Item/Item';
import { UtilInfo } from '../../UtilInfo';
import { TotalStats } from '../TotalStats';
import {
  getNumberOfLegendaryItems,
  checkForMythicItemAndGetMythicItem,
  multiplicativeCalc,
  updateMultiplicativeStats,
} from './helperFunctions';

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
  const baseHealthRegen: number = utilInfo.baseHealthRegen;
  const baseManaRegen: number = utilInfo.baseManaRegen;

  let mythicArmorPenPercentage: number = 0;
  let mythicMagicPenPercentage: number = 0;
  let mythicTenacity: number = 0;
  let mythicSlowResistance: number = 0;

  const mythicItem = checkForMythicItemAndGetMythicItem(items);

  const hasMythic = mythicItem != null;

  for (const item of items) {
    currStats.criticalChance += item.itemStats.criticalStrikeChance.percent;
    currStats.lethalityFlat += item.itemStats.lethality.flat;
    currStats.magicPenFlat += item.itemStats.magicPenetration.flat;
    currStats.abilityPower += item.itemStats.abilityPower.flat;
    currStats.abilityHaste += item.itemStats.abilityHaste.flat;
    currStats.healAndShieldPower += item.itemStats.healAndShieldPower.percent;
    currStats.lifeSteal += item.itemStats.lifeSteal.percent;
    currStats.omnivamp += item.itemStats.omnivamp.percent;
    currStats.physicalVamp += item.itemStats.physicalVamp?.percent ?? 0;

    currStats.armorPenPercentage = multiplicativeCalc(
      currStats.armorPenPercentage,
      item.itemStats.armorPenetration.percent
    );
    currStats.magicPenPercentage = multiplicativeCalc(
      currStats.magicPenPercentage,
      item.itemStats.magicPenetration.percent
    );
    currStats.tenacity = multiplicativeCalc(
      currStats.tenacity,
      item.itemStats.tenacity.flat
    );
    currStats.slowResistance = multiplicativeCalc(
      currStats.slowResistance,
      item.itemStats.slowResitance?.percent ?? 0
    );

    if (item.itemStats.healthRegen.flat > 0)
      currStats.healthRegen = baseHealthRegen * item.itemStats.healthRegen.flat;

    if (item.itemStats.manaRegen.flat > 0)
      currStats.manaRegen = baseManaRegen * item.itemStats.manaRegen.flat;
  }

  if (hasMythic) {
    currStats.lethalityFlat +=
      mythicItem.mythicStats.lethality.flat * numberOfLegendaryItems;
    currStats.magicPenFlat +=
      mythicItem.mythicStats.magicPenetration.flat * numberOfLegendaryItems;
    currStats.abilityPower +=
      mythicItem.mythicStats.abilityPower.flat * numberOfLegendaryItems;
    currStats.abilityHaste +=
      mythicItem.mythicStats.abilityHaste.flat * numberOfLegendaryItems;
    currStats.omnivamp +=
      mythicItem.mythicStats.omnivamp.flat * numberOfLegendaryItems;

    mythicArmorPenPercentage =
      mythicItem.mythicStats.armorPenetration.percent * numberOfLegendaryItems;
    mythicMagicPenPercentage =
      mythicItem.mythicStats.magicPenetration.percent * numberOfLegendaryItems;
    mythicTenacity =
      mythicItem.mythicStats.tenacity.flat * numberOfLegendaryItems;
    mythicSlowResistance =
      mythicItem.mythicStats.slowResitance?.percent ??
      0 * numberOfLegendaryItems;
  }

  currStats.armorPenPercentage = multiplicativeCalc(
    currStats.armorPenPercentage,
    mythicArmorPenPercentage
  );
  currStats.magicPenPercentage = multiplicativeCalc(
    currStats.magicPenPercentage,
    mythicMagicPenPercentage
  );
  currStats.tenacity = multiplicativeCalc(currStats.tenacity, mythicTenacity);
  currStats.slowResistance = multiplicativeCalc(
    currStats.slowResistance,
    mythicSlowResistance
  );

  currStats = updateMultiplicativeStats(currStats);

  return currStats;
}
