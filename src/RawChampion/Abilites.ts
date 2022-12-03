import { Url, Resource } from './RawChampion';

export interface Abilites {
    P: AbilityContent[];
    Q: AbilityContent[];
    W: AbilityContent[];
    E: AbilityContent[];
    R: AbilityContent[];
}

export interface AbilityContent {
    name: string;
    icon: Url;
    effects: Effects[];
    cost?: Cost | null;
    cooldown?: Cooldown | null;
    targeting: keyof typeof Targeting;
    affects?: keyof typeof Affect | null;
    spellshieldable?: keyof typeof Spellshieldable | null;
    resource?: keyof typeof Resource | null;
    damageType?: keyof typeof DamageType | null;
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


export interface Effects {
    description: string;
    leveling: Leveling[];
}

export interface Leveling {
    attribute: string;
    modifiers: Modifier[];
}


export interface Cost {
    modifiers: Modifier[];
}

export interface Cooldown {
    modifiers: Modifier[];
    affectedByCdr: boolean;
}

export interface Modifier {
    values: number[];
    units: (keyof typeof Unit)[];
}

export enum Unit {
    '',
    '% AD',
    '% AP',
    '% bonus AD',
    '%',
    '% per 100 AP',
    ' units',
    ' (based on level)',
    '1 + 0.3 per 100% bonus attack speed',
    '  ×',
    '1 + (0.5 + 0.175) per 100% critical strike chance',
    ' chunks of ice',
    ' Moonlight',
    ' soldiers',
    "% of Braum's maximum health",
    '% bonus armor',
    '% bonus magic resistance',
    "%  of target's maximum health",
    '% per 100 bonus AD',
    "% of target's current health",
    "% (+ 0.5% per Feast stack) of target's maximum health",
    "% (+ 1.5% per Feast stack) of target's maximum health",
    '% bonus health',
    '% missing health',
    '3% per 1% of health lost in the past 4 seconds',
    "% (+ 3% per 100 AP) of target's current health",
    "% (+ 3% per 100 AP) of target's missing health",
    "% (+ 1.5% per 100 AP) of target's maximum health",
    "% (+ 2.5% per 100 AP) of target's maximum health",
    "%  of target's missing health",
    "% (+ 0.25% per 100 AP) of target's maximum health",
}

export enum DamageType {
    'PHYSICAL_DAMAGE',
    'TRUE_DAMAGE',
    'MAGIC_DAMAGE',
    'MIXED_DAMAGE',
}

export enum Targeting {
    'Passive',
    'Direction',
    'Location',
    'Auto',
    'Direction / Auto',
    'Auto / Direction',
    'Direction / Auto / Location',
    'Direction / Location / Unit',
    'Auto / Location',
    'Location / Auto',
    'Location / Unit',
    'Unit / Location',
    'Unit / Direction',
    'Unit / Auto',
    'Auto / Unit',
    'Varied',
    'N/A',
    'Unit',
}

export enum Affect {
    'Self',
    'Enemies',
    'Allies',
    'Enemies / Self',
    'Enemies, Self',
    'Self / Enemies',
    'Self, Enemies',
    'Self, Allies',
    'Allies, Self',
    'Enemies / Tibbers',
    'Turret ruins',
    'Enemy, Structure',
    'Enemies, Structure',
    'Spiderlings, Self',
    'Terrain, Self',
    'Self, Allies, Enemies',
    'Varied',
    '',
}

export enum Spellshieldable {
    'True',
    'true',
    'False',
    'false',
    'special',
    'Special',
}

export enum SpellEffects {
    'proc',
    'spellaoe',
    'spell',
    'Area of effect',
    'Area of Effect',
    'Single target',
    'aoe',
    'Aoe',
    'AoE',
    'Shield',
    'basic',
    'Heal',
    'Special',
    'default',
    'aoedot',
    'False',
    'attack',
    'mixed',
    'Proc',
    'Basic',
    'AoeDoT',
    'single',
    'special',
}

export enum Projectile {
    'TRUE',
    'SPECIAL',
    'FALSE',
}

export enum OnHitEffects {
    'True',
    'False',
    'Special',
}

export enum Occurrence {
    'On-Hit',
    'True',
    'On-hit',
}
