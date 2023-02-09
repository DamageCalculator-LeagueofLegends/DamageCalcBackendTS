import { Modifier, Unit } from '../../types/RawChampion/abilities/Modifier';
import { ScaledValue } from './types/ScaledValue';

export function getScaledValues(
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
