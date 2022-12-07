import { Modifier, Unit } from '../RawChampion/abilities/Modifier';

export interface ScaledValue {
  scaledUnit: keyof typeof Unit;
  value: number;
}

export function getScaledVales(
  modifiers: Modifier[],
  skillLevel: number
): ScaledValue[] {
  const listOfScaledValues: ScaledValue[] = [];
  for (const modifier of modifiers) {
    if (modifier.units[0] !== '') {
      listOfScaledValues.push({
        scaledUnit: modifier.units[0]!,
        value: modifier.values[skillLevel]!,
      });
    }
  }
  return listOfScaledValues;
}
