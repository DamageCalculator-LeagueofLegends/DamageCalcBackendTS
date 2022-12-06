import { AbilityStaticData } from './AbilityStaticData';

export interface StaticAbilities {
  P: AbilityStaticData[];
  Q: AbilityStaticData[];
  W: AbilityStaticData[];
  E: AbilityStaticData[];
  R: AbilityStaticData[];

  [key: string]: AbilityStaticData[];
}
