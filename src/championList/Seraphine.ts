import { Ability } from '../Ability/Ability';
import { Champion } from '../Champion/Champion';
import { Damage } from '../Damage/Damage';
import { MissingHealthCalculation } from '../Damage/MissingHealthCalculation';
import { DamageType } from '../RawChampion/abilities/staticDataEnums';
import { RawChampion } from '../RawChampion/RawChampion';

export class Seraphine extends Champion {
  noteStacks: number;
  echo: number;

  constructor(rawChampion: RawChampion) {
    super(rawChampion);
    this.champMissingHealthAmpInfo.damageAmplifier = 0.05;
    this.champMissingHealthAmpInfo.perPercentage = 0.075;
    this.champMissingHealthAmpInfo.cappedAt = 0.75;
    this.noteStacks = 0;
    this.echo = 0;
  }

  increaseNoteStacks() {
    this.noteStacks++;
  }

  override autoAttack(): Damage[]  {
    const autoAttackDamage = new Damage(
      DamageType.PHYSICAL_DAMAGE,
      this.champTotalStats.attackDamage
    );
    if (this.noteStacks !== 0) {
      const passiveDamage = this.passiveAction();
      return [autoAttackDamage, passiveDamage[0]!];
    }
    return [autoAttackDamage];
  }

  override passiveAction(): Damage[] {
    const scaledDamage = this.champTotalStats.abilityPower * 0.07;
    const damage = new Damage(DamageType.MAGIC_DAMAGE);

    if (this.noteStacks > 4) this.noteStacks = 4;

    if (this.champLevel < 6)
      damage.value = (4 + scaledDamage) * this.noteStacks;
    else if (this.champLevel < 11)
      damage.value = (8 + scaledDamage) * this.noteStacks;
    else if (this.champLevel < 16)
      damage.value = (14 + scaledDamage) * this.noteStacks;
    else if (this.champLevel < 19)
      damage.value = (24 + scaledDamage) * this.noteStacks;

    return [damage];
  }

  override qAction(): Damage[] {
    const q: Ability = this.champAbilities.Q;
    if (q.checkIfInsideBounds()) {
      this.increaseNoteStacks();
      const missingHealthData = new MissingHealthCalculation(
        this.champUtilInfo.enemyMaxHealth,
        this.champUtilInfo.enemyCurrentHealth,
        this.champMissingHealthAmpInfo
      );
      return [q.getDamageBasedOnEnemyMissingHealth(missingHealthData)];
    }
    return [];
  }

  override wAction(): Damage[] {
    return [];
  }

  override eAction(): Damage[] {
    const e: Ability = this.champAbilities.E;
    if (e.checkIfInsideBounds()) {
      return [e.getDamage()];
    }
    return [];
  }

  override rAction(): Damage[] {
    const r: Ability = this.champAbilities.R;
    if (r.checkIfInsideBounds()) {
      return [r.getDamage()];
    }
    return [];
  }
}
