import { Damage } from '../Damage/Damage';
import { MissingHealthCalculation } from '../../types/damage/MissingHealthCalculation';
import { AbilityStaticData } from '../../types/RawChampion/abilities/AbilityStaticData';
import { Modifier } from '../../types/RawChampion/abilities/Modifier';
import { AbilityAtributeIndicies } from '../../types/ability/AbilityAtributeIndicies';
import { AbilityDynamicData } from '../../types/ability/AbilityDynamicData';
import { getScaledValues } from './getScaledValues';
import { ScaledValue } from '../../types/ability/ScaledValue';

export class Ability {
  staticData: AbilityStaticData[];
  dynamicData: AbilityDynamicData;

  constructor() {
    this.dynamicData = {};
  }
  updateDynamicData(updatedDynamicData: AbilityDynamicData) {
    const {
      bounds,
      actionConditions,
      skillLevel,
      attributeIndicies,
      scalingValues,
    } = updatedDynamicData;
    this.dynamicData.bounds = bounds;
    this.dynamicData.actionConditions = actionConditions;
    this.dynamicData.skillLevel = skillLevel;
    this.dynamicData.attributeIndicies = attributeIndicies;
    this.dynamicData.scalingValues = scalingValues;
  }

  getDamage(
    attributeIndicies: AbilityAtributeIndicies = {
      ability: 0,
      effect: 0,
      leveling: 0,
    }
  ): Damage {
    const updatedDynamicData: AbilityDynamicData = {
      ...this.dynamicData,
      attributeIndicies: attributeIndicies,
    };
    const { ability } = attributeIndicies;
    const { damageType } = this.staticData[ability]!;
    this.updateDynamicData(updatedDynamicData);
    const damage = new Damage(damageType, this.calcDamage());

    return damage;
  }

  getDamageBasedOnEnemyMissingHealth(
    missingHealthData: MissingHealthCalculation,
    attributeIndicies: AbilityAtributeIndicies = {
      ability: 0,
      effect: 0,
      leveling: 0,
    }
  ) {
    const damage = this.getDamage(attributeIndicies);
    let increasedDamage =
      damage.value + damage.value * missingHealthData.damageAmplifier;
    damage.value = increasedDamage;
    return damage;
  }

  calcDamage(): number {
    const baseDamageValue = this.baseDamage();
    const scaledDamageValue = this.scaledDamage();
    const total = baseDamageValue + scaledDamageValue;
    return total;
  }

  baseDamage(): number {
    for (const modifier of this.getAbilityModifiers()) {
      if (modifier.units[0] === '') {
        return modifier.values[this.dynamicData.skillLevel!] ?? 0;
      }
    }

    return 0;
  }

  scaledDamage(): number {
    const listOfScaledValues: ScaledValue[] = getScaledValues(
      this.getAbilityModifiers(),
      this.dynamicData.skillLevel!
    );
    let damageValue = 0;
    for (const scaledValue of listOfScaledValues) {
      for (const [champUnit, champValue] of Object.entries(
        this.dynamicData.scalingValues!
      )) {
        if (scaledValue.scaledUnit === champUnit) {
          damageValue += (scaledValue.value / 100) * champValue;
        }
      }
    }
    return damageValue;
  }

  getAbilityModifiers(): Modifier[] {
    const { ability, effect, leveling } = this.dynamicData.attributeIndicies!;

    const currAbilty = this.staticData[ability];
    return currAbilty?.effects[effect]?.leveling[leveling]?.modifiers!;
  }

  setAttributeIndicies(indicies: AbilityAtributeIndicies) {
    this.dynamicData.attributeIndicies = indicies;
  }

  checkIfInsideBounds(): boolean {
    const { bounds, skillLevel } = this.dynamicData;
    return bounds!.lower <= skillLevel! && skillLevel! < bounds!.upper;
  }
}
