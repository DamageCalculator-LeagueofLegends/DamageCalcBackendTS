import { AllConditions as AC } from '../Ability/types/ActionConditions';
import {
  checkCondition,
  checkIfConditonExists,
} from '../Ability/checkConditions';
import { Champion } from '../Champion/Champion';
import { Damage } from '../Damage/Damage';
import { MissingHealthCalculation } from '../Damage/types/MissingHealthCalculation';
import { DamageType } from '../../types/RawChampion/abilities/staticDataEnums';
import { RawChampion } from '../../types/RawChampion/RawChampion';

export class Akali extends Champion {
  hasAssissinsMark = false;
  constructor(rawChampion: RawChampion) {
    super(rawChampion);
    this.champMissingHealthAmpInfo.damageAmplifier = 0.0286;
    this.champMissingHealthAmpInfo.perPercentage = 0.01;
    this.champMissingHealthAmpInfo.cappedAt = 0.7;
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
    const adAmp = this.champBonusStats!.attackDamage * 0.6;
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
    const { conditions } = e.dynamicData.actionConditions!;
    if (e.checkIfInsideBounds()) {
      const firstInstance = checkCondition(conditions, AC.firstInstance);
      const secondInstance = checkCondition(conditions, AC.secondInstance);
      // technically works for both instances not implemented yet
      this.hasAssissinsMark = true;
      if (checkIfConditonExists(secondInstance, conditions, true)) {
        return [e.getDamage({ ability: 0, effect: 2, leveling: 1 })];
      }
      return [e.getDamage()];
    }
    return [];
  }

  override rAction(): Damage[] {
    const r = this.champAbilities.R;
    const { conditions } = r.dynamicData.actionConditions!;
    const { enemyCurrentHealth, enemyMaxHealth } = this.champUtilInfo;
    if (r.checkIfInsideBounds()) {
      // technically works for both instances not implemented yet
      this.hasAssissinsMark = true;
      const missingHealth = new MissingHealthCalculation(
        enemyMaxHealth,
        enemyCurrentHealth,
        this.champMissingHealthAmpInfo
      );
      const firstInstance = checkCondition(conditions, AC.firstInstance);
      const secondInstance = checkCondition(conditions, AC.secondInstance);
      const firstRDamage = r.getDamage();
      if (
        checkIfConditonExists(firstInstance, conditions, true) &&
        checkIfConditonExists(secondInstance, conditions, true)
      ) {
        this.champUtilInfo.enemyCurrentHealth -= firstRDamage.value;
        if (this.champUtilInfo.enemyCurrentHealth < 0) {
          this.champUtilInfo.enemyCurrentHealth = 0;
        }
        missingHealth.enemyCurrentHealth =
          this.champUtilInfo.enemyCurrentHealth;
        const secondRDamage = r.getDamageBasedOnEnemyMissingHealth(
          missingHealth,
          { ability: 0, effect: 2, leveling: 0 }
        );
        return [firstRDamage, secondRDamage];
      } else if (checkIfConditonExists(firstInstance, conditions, true))
        return [firstRDamage];
      else {
        const secondRDamage = r.getDamageBasedOnEnemyMissingHealth(
          missingHealth,
          { ability: 0, effect: 2, leveling: 0 }
        );
        return [secondRDamage];
      }
    }
    return [];
  }
}
