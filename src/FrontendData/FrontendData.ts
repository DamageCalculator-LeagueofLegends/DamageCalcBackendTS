import { ActionConditions } from '../Ability/dynamicAbilityData/ActionConditions';

export interface FrontendData {
  participants: (FrontendChampionDetails | FrontendDummyDetails)[];
}

export type  ActionAndConditions = {
  ability: keyof typeof AbilityNames;
  conditions: ActionConditions | null;
};

export enum AbilityNames {
  'AA' = 'AA',
  'Q' = 'Q',
  'W' = 'W',
  'E' = 'E',
  'R' = 'R',
}

export interface FrontendChampionDetails {
  type: 'CHAMPION';
  championID: number;
  championLevel: number;
  listOfItemIDs: number[];
  abilityLevel: AbilityLevel;
  listOfActions: ActionAndConditions[];
}

export interface FrontendDummyDetails {
  type: 'DUMMY';
  health: number;
  armor: number;
  magicResistance: number;
}
