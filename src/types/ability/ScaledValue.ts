import { Unit } from '../RawChampion/abilities/Modifier';

export interface ScaledValue {
  scaledUnit: keyof typeof Unit;
  value: number;
}
