import {
  AllConditions as AC,
  checkCondition,
  checkIfConditonExists,
} from '../Ability/dynamicAbilityData/ActionConditions';
import { Damage } from '../Damage/Damage';
import { Item } from '../Item/Item';
import { ItemDynamicData } from '../Item/ItemDynamicData';
import { DamageType } from '../RawChampion/abilities/staticDataEnums';
import { RawItem } from '../RawItem/RawItem';

export class LiandrysAnguish extends Item {
  constructor(rawItem: RawItem, dynamicData: ItemDynamicData) {
    super(rawItem, dynamicData);
    this.isMythic = true;
    this.isUnique = true;
  }

  override passiveDmg(): Damage[] {
    let value = 0;
    const { conditions } = this.dynamicData.actionConditions!;
    const { scalingValues, enemyMaxHealth } = this.dynamicData!;
    const secondsApplied = checkCondition(conditions, AC.secondsApplied);
    for (let i = 1; i < 5; i++) {
      if (checkIfConditonExists(secondsApplied, conditions, i)) {
        value =
          50 + scalingValues?.['% AP']! * 0.06 + (enemyMaxHealth! * 0.04) / 4;
      }
    }
    const numberOfSeconds = conditions[secondsApplied.index!]?.value! as number;
    value = value * numberOfSeconds;
    return [new Damage(DamageType.MAGIC_DAMAGE, value)];
  }
}
