import { AllConditions as AC } from '../types/ability/ActionConditions';
import { Damage } from '../fighters/Damage/Damage';
import { DamageType } from '../types/RawChampion/abilities/staticDataEnums';
import { RawItem } from '../types/RawItem/RawItem';
import {
  checkCondition,
  checkIfConditonExists,
} from '../fighters/Ability/checkConditions';
import { Item } from './Item';

export class LiandrysAnguish extends Item {
  constructor(rawItem: RawItem) {
    super(rawItem);
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
