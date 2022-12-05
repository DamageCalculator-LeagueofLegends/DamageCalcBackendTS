import { Item } from '../../../../Item/Item';
import { UtilInfo } from '../../../UtilInfo';
import { TotalStats } from '../../TotalStats';
import { multiplicativeCalc } from '../helperFunctions';

export function totalStatsFromItems(
  item: Item,
  currStats: TotalStats,
  utilInfo: UtilInfo
): TotalStats {
  const {
    criticalStrikeChance,
    lethality,
    magicPenetration,
    abilityPower,
    abilityHaste,
    healAndShieldPower,
    lifeSteal,
    omnivamp,
    physicalVamp,
    armorPenetration,
    tenacity,
    slowResitance,
    healthRegen,
    manaRegen,
  } = item.itemStats;
  let tempHealthRegen: number = 0;
  let tempManaRegen: number = 0;
  if (healthRegen.flat > 0)
    tempHealthRegen = utilInfo.baseHealthRegen * healthRegen.flat;

  if (manaRegen.flat > 0)
    tempManaRegen = utilInfo.baseManaRegen * manaRegen.flat;
  return {
    ...currStats,
    criticalChance: criticalStrikeChance.percent,
    lethalityFlat: lethality.flat,
    magicPenFlat: magicPenetration.flat,
    abilityPower: abilityPower.flat,
    abilityHaste: abilityHaste.flat,
    healAndShieldPower: healAndShieldPower.percent,
    lifeSteal: lifeSteal.percent,
    omnivamp: omnivamp.percent,
    physicalVamp: physicalVamp?.percent ?? 0,

    armorPenPercentage: multiplicativeCalc(
      currStats.armorPenPercentage,
      armorPenetration.percent
    ),
    magicPenPercentage: multiplicativeCalc(
      currStats.magicPenPercentage,
      magicPenetration.percent
    ),
    tenacity: multiplicativeCalc(currStats.tenacity, tenacity.flat),
    slowResistance: multiplicativeCalc(
      currStats.slowResistance,
      slowResitance?.percent ?? 0
    ),
    healthRegen: tempHealthRegen,
    manaRegen: tempManaRegen,
  };
}
