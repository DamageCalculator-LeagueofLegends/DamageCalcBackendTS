import { AllConditions as AC } from '../../types/ability/ActionConditions';
import {
  checkCondition,
  checkIfConditonExists,
} from '../Ability/checkConditions';
import { Champion } from '../Champion/Champion';
import { Damage } from '../Damage/Damage';
import { DamageType } from '../../types/RawChampion/abilities/staticDataEnums';
import { RawChampion } from '../../types/RawChampion/RawChampion';

export class Ahri extends Champion {
  constructor(rawChampion: RawChampion) {
    super(rawChampion);
  }

  override qAction(): Damage[] {
    const q = this.champAbilities.Q;
    const { conditions: conditions } = q.dynamicData.actionConditions!;
    if (q.checkIfInsideBounds()) {
      const firstPassDamage = new Damage(
        DamageType.MAGIC_DAMAGE,
        q.getDamage().value
      );
      const secondPassDamage = new Damage(
        DamageType.TRUE_DAMAGE,
        q.getDamage().value
      );
      const hasFirstPass = checkCondition(conditions, AC.firstInstance);
      const hasSecondPass = checkCondition(conditions, AC.secondInstance);
      if (
        checkIfConditonExists(hasFirstPass, conditions, true) &&
        checkIfConditonExists(hasSecondPass, conditions, true)
      )
        return [firstPassDamage, secondPassDamage];
      else if (checkIfConditonExists(hasFirstPass, conditions, true))
        return [firstPassDamage];
      else if (checkIfConditonExists(hasSecondPass, conditions, true))
        return [secondPassDamage];
    }
    return [];
  }

  override wAction(): Damage[] {
    const w = this.champAbilities.W;
    const { conditions } = w.dynamicData.actionConditions!;
    if (w.checkIfInsideBounds()) {
      const firstHit = w.getDamage({ ability: 0, effect: 1, leveling: 0 });
      const subsequentHit = w.getDamage({ ability: 0, effect: 2, leveling: 0 });
      const amountHit = checkCondition(conditions, AC.numberOfUsages);
      if (checkIfConditonExists(amountHit, conditions, 1)) return [firstHit];
      else if (checkIfConditonExists(amountHit, conditions, 2))
        return [firstHit, subsequentHit];
      else if (checkIfConditonExists(amountHit, conditions, 3))
        return [firstHit, subsequentHit, subsequentHit];
    }
    return [];
  }

  override eAction(): Damage[] {
    const e = this.champAbilities.E;
    if (e.checkIfInsideBounds()) return [e.getDamage()];
    return [];
  }

  override rAction(): Damage[] {
    const r = this.champAbilities.R;
    const { conditions } = r.dynamicData.actionConditions!;
    const listOfRDamages: Damage[] = [];
    if (r.checkIfInsideBounds()) {
      const damage = r.getDamage();
      const amountOfR = checkCondition(conditions, AC.numberOfUsages);
      if (amountOfR.hasCondition == true)
        for (let i = 0; i < conditions[amountOfR.index!]?.value!; i++) {
          listOfRDamages.push(damage);
        }
    }
    return listOfRDamages;
  }
}
