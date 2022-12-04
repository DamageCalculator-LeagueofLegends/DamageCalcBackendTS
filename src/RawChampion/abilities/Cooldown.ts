import { Modifier } from './Modifier';

export interface Cooldown {
  modifiers: Modifier[];
  affectedByCdr: boolean;
}
