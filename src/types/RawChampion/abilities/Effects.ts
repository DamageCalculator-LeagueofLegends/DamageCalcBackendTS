import { Modifier } from './Modifier';

export interface Effects {
  description: string;
  leveling: Leveling[];
}

export interface Leveling {
  attribute: string;
  modifiers: Modifier[];
}
