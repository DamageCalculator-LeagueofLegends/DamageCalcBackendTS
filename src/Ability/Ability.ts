import { AbilityStaticData } from '../RawChampion/abilities/AbilityStaticData';
import { AbilityDynamicData } from './dynamicAbilityData/AbilityDynamicData';

export class Ability {
  staticData: AbilityStaticData[];
  dynamicData: AbilityDynamicData;

  constructor() {}

  updateDynamicData() {}
}
