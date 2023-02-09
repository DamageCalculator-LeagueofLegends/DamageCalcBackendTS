import { Ability } from '../../fighters/Ability/Ability';

export interface ChampionAbilities {
  Q: Ability;
  W: Ability;
  E: Ability;
  R: Ability;

  [key: string]: Ability;
}
