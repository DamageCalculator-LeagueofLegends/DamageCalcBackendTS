import {
  AllConditions as AC,
  checkCondition,
  checkIfConditonExists,
} from '../Ability/dynamicAbilityData/ActionConditions';
import { Champion } from '../Champion/Champion';
import { Damage } from '../Damage/Damage';
import { DamageType } from '../RawChampion/abilities/staticDataEnums';
import { RawChampion } from '../RawChampion/RawChampion';

export class Akali extends Champion {
  hasAssissinsMark = false;
  constructor(rawChampion: RawChampion) {
    super(rawChampion);
  }

  override autoAttack(): Damage[] {
    const autoAttack = new Damage(
      DamageType.PHYSICAL_DAMAGE,
      this.champTotalStats.attackDamage
    );
    const passiveDamage = this.passiveAction()[0];
    if (this.hasAssissinsMark) {
      this.hasAssissinsMark = false;
      return [autoAttack, passiveDamage!];
    }
    return [autoAttack];
  }

  override passiveAction(): Damage[] {
    const adAmp = this.champBonusStats.attackDamage * 0.6;
    const apAmp = this.champTotalStats.abilityPower * 0.55;
    let baseDamage = 32;

    if (this.champLevel <= 7) baseDamage += 3 * this.champLevel;
    else if (this.champLevel <= 13) {
      baseDamage += 3 * 7;
      baseDamage += 9 * (this.champLevel - 7);
    } else {
      baseDamage += 3 * 7;
      baseDamage += 9 * 6;
      baseDamage += 15 * (this.champLevel - 13);
    }
    const totalDamage = baseDamage + adAmp + apAmp;
    const damage = new Damage(DamageType.MAGIC_DAMAGE, totalDamage);
    return [damage];
  }

  override qAction(): Damage[] {
    const q = this.champAbilities.Q;
    if (q.checkIfInsideBounds()) {
      this.hasAssissinsMark = true;
      return [q.getDamage()];
    }
    return [];
  }

  override wAction(): Damage[] {
    return [];
  }

  override eAction(): Damage[] {
    const e = this.champAbilities.E;
    const { conditions } = e.dynamicData.actionConditions;
    if (e.checkIfInsideBounds()) {
      const firstInstance = checkCondition(conditions, AC.firstInstance);
      const secondInstance = checkCondition(conditions, AC.secondInstance);
      //technically works for both instances not implemented yet
      this.hasAssissinsMark = true;
      if (checkIfConditonExists(secondInstance, conditions, true)) {
        return [e.getDamage({ ability: 0, effect: 2, leveling: 1 })];
      }
      return [e.getDamage()];
    }
    return [];
  }

  override rAction(): Damage[] {
    return [];
  }
}
