import { Url } from '../RawChampion/RawChampion';
import { Active } from './Active';
import { ItemStats } from './ItemStats';
import { Passive } from './Passive';
import { Shop } from './Shop';

export interface RawItem {
  name: string;
  id: number;
  tier: number;
  rank: [];
  buildsFrom: number[];
  buildsInto: number[];
  specialRecipe: number;
  noEffects: boolean;
  removed: boolean;
  requiredChampion: string;
  requiredAlly: string;
  icon: Url;
  simpleDescription: string;
  nicknames: string[];
  passives: Passive[];
  active: Active[];
  stats: ItemStats;
  shop: Shop;
  iconOverlay: boolean;
}
