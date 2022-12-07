import { Effects } from './Effects';
import { Resource, Url } from '../RawChampion';
import {
  Affect,
  DamageType,
  Occurrence,
  OnHitEffects,
  Projectile,
  SpellEffects,
  Spellshieldable,
  Targeting,
} from './staticDataEnums';
import { Cooldown } from './Cooldown';
import { Cost } from './Cost';

export interface AbilityStaticData {
  name: string;
  icon: Url;
  effects: Effects[];
  cost?: Cost | null;
  cooldown?: Cooldown | null;
  targeting: keyof typeof Targeting;
  affects?: keyof typeof Affect | null;
  spellshieldable?: keyof typeof Spellshieldable | null;
  resource?: keyof typeof Resource | null;
  damageType: keyof typeof DamageType | null;
  spellEffects?: keyof typeof SpellEffects | null;
  projectile?: keyof typeof Projectile | null;
  onHitEffects?: keyof typeof OnHitEffects | null;
  occurrence?: keyof typeof Occurrence | null;
  notes: string;
  blurb: string;
  missileSpeed: null;
  rechargeRate?: number[] | null;
  collisionRadius?: string | null;
  tetherRadius?: string | null;
  onTargetCdStatic?: string | null;
  innerRadius?: string | null;
  speed?: string | null;
  width?: string | null;
  angle?: string | null;
  castTime?: string | null;
  effectRadius?: string | null;
  targetRange?: string | null;
}
