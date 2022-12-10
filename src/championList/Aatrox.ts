import {
  AllConditions,
  checkCondition,
  checkIfConditonExists,
} from '../Ability/dynamicAbilityData/ActionConditions';
import { Champion } from '../Champion/Champion';
import { Damage } from '../Damage/Damage';
import { DamageType } from '../RawChampion/abilities/staticDataEnums';
import { RawChampion } from '../RawChampion/RawChampion';

export class Aatrox extends Champion {
  hasPassive = true;
  constructor(rawChampion: RawChampion) {
    super(rawChampion);
  }
  override autoAttack(): Damage | Damage[] | null {
    const autoAttackDamage = new Damage(
      DamageType.PHYSICAL_DAMAGE,
      this.champTotalStats.attackDamage
    );
    if (!this.hasPassive) return autoAttackDamage;

    const passiveDamage = this.passiveAction() as Damage;
    this.hasPassive = false;

    return [autoAttackDamage, passiveDamage];
  }

  override passiveAction(): Damage | Damage[] | null {
    const damage = new Damage(DamageType.PHYSICAL_DAMAGE);
    const amplifier = 0.0459 + 0.0041 * this.champLevel;
    damage.value = this.champUtilInfo.enemyMaxHealth * amplifier;
    return damage;
  }

  override qAction(): Damage | Damage[] | null {
    const q = this.champAbilities.Q;
    const { conditions: conditions } = q.dynamicData.actionConditions;
    if (q.checkIfInsideBounds()) {
      const attributeCondition = checkCondition(
        conditions,
        AllConditions.numberOfAttribute
      );
      const sweetSportCondition = checkCondition(
        conditions,
        AllConditions.isSweetSpot
      );
      for (let i = 0; i < 3; i++) {
        if (checkIfConditonExists(attributeCondition, conditions, i))
          if (checkIfConditonExists(sweetSportCondition, conditions, true))
            return q.getDamage({ ability: 0, effect: i + 2, leveling: 1 });
        return q.getDamage({ ability: 0, effect: i + 2, leveling: 0 });
      }
    }
    return null;
  }

  override wAction(): Damage | Damage[] | null {
    const w = this.champAbilities.W;
    const { conditions: conditions } = w.dynamicData.actionConditions;
    if (w.checkIfInsideBounds()) {
      const tetherCondition = checkCondition(
        conditions,
        AllConditions.tetherCompleted
      );
      if (checkIfConditonExists(tetherCondition, conditions, true))
        return w.getDamage({ ability: 0, effect: 2, leveling: 0 });
      return w.getDamage();
    }
    return null;
  }

  override eAction(): Damage | Damage[] | null {
    return null;
  }

  override rAction(): Damage | Damage[] | null {
    const r = this.champAbilities.R;
    r.setAttributeIndicies({ ability: 0, effect: 2, leveling: 0 });
    if (r.checkIfInsideBounds()) {
      const adValue =
        r.getAbilityModifiers()[0]?.values[r.dynamicData.skillLevel]!;
      const bonusADFromR = this.champTotalStats.attackDamage * (adValue / 100);
      this.updateTotalBonusAndScalingValues(bonusADFromR, 'attackDamage');
    }
    return null;
  }
}
