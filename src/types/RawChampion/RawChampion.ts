import { StaticAbilities } from './abilities/StaticAbilities';
import { AttributeRatings } from './AttributeRatings';
import { Price } from './Price';
import { Skin } from './Skin/Skin';
import { Stats } from './Stats';

export type Url = string;

export interface RawChampion {
  id: number;
  key: string;
  name: string;
  title: string;
  fullName: string;
  icon: Url;
  resource: keyof typeof Resource;
  attackType: keyof typeof AttackType;
  adaptiveType: keyof typeof AdaptiveType;
  stats: Stats;
  roles: (keyof typeof Roles)[];
  attributeRatings: AttributeRatings;
  abilities: StaticAbilities;
  releaseDate: string;
  releasePatch: string;
  patchLastChanged: string;
  price: Price;
  lore: string;
  faction: keyof typeof Faction;
  skins: Skin[];
}

export enum AttackType {
  'MELEE',
  'RANGED',
}

export enum Resource {
  'BLOOD_WELL',
  'MANA',
  'ENERGY',
  'NONE',
  'BLOODTHIRST',
  'MANA_PER_SECOND',
  'OTHER',
  'HEALTH',
  'CURRENT_HEALTH',
  'SHIELD',
  'RAGE',
  'FURY',
  'FEROCITY',
  'HEAT',
  'GRIT',
  'SOUL_UNBOUND',
}

export enum AdaptiveType {
  'PHYSICAL_DAMAGE',
  'MAGIC_DAMAGE',
}

export enum Roles {
  'FIGHTER',
  'JUGGERNAUT',
  'TANK',
  'ASSASSIN',
  'BURST',
  'MAGE',
  'ENCHANTER',
  'SUPPORT',
  'MARKSMAN',
  'VANGUARD',
  'BATTLEMAGE',
}

export enum Faction {
  'unaffiliated',
  'ionia',
  'piltover',
  'shurima',
  'freljord',
  'mount-targon',
  'noxus',
  'void',
  'bandle-city',
  'zaun',
  'shadow-isles',
  'demacia',
  'bilgewater',
  'ixtal',
}
