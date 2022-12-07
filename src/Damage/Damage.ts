import { DamageType } from '../RawChampion/abilities/staticDataEnums';

export class Damage {
  type: keyof typeof DamageType | null;
  value: number = 0;
  constructor(type: keyof typeof DamageType | null, value = 0) {
    this.type = type;
    this.value = value;
  }
}
