import {
  AllConditions,
  checkCondition,
} from '../Ability/dynamicAbilityData/ActionConditions';
import { Champion } from '../Champion/Champion';
import { Damage } from '../Damage/Damage';
import { DamageType } from '../RawChampion/abilities/staticDataEnums';
import { RawChampion } from '../RawChampion/RawChampion';

export class Ahri extends Champion {
  constructor(rawChampion: RawChampion) {
    super(rawChampion);
  }

  override qAction(): Damage | Damage[] | null {
    const q = this.champAbilities.Q;
    const { conditions: conditions } = q.dynamicData.actionConditions;
    if (q.checkIfInsideBounds()) {
      const firstPassDamage = new Damage(
        DamageType.MAGIC_DAMAGE,
        q.getDamage().value
      );
      const secondPassDamage = new Damage(
        DamageType.TRUE_DAMAGE,
        q.getDamage().value
      );
      const hasFirstPass = checkCondition(
        conditions,
        AllConditions.firstInstance
      );
      const hasSecondPass = checkCondition(
        conditions,
        AllConditions.secondInstance
      );
      if (
        hasFirstPass.hasCondition === true &&
        conditions[hasFirstPass.index!]?.value === true &&
        hasSecondPass.hasCondition === true &&
        conditions[hasSecondPass.index!]?.value === true
      )
        return [firstPassDamage, secondPassDamage];
      else if (
        hasFirstPass.hasCondition === true &&
        conditions[hasFirstPass.index!]?.value === true
      )
        return firstPassDamage;
      else if (
        hasSecondPass.hasCondition === true &&
        conditions[hasSecondPass.index!]?.value === true
      )
        return secondPassDamage;
    }
    return null;
  }

  override wAction(): Damage | Damage[] | null {
    return null;
  }

  override eAction(): Damage | Damage[] | null {
    return null;
  }

  override rAction(): Damage | Damage[] | null {
    return null;
  }
}
