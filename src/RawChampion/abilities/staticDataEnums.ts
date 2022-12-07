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
  'Enemies / Self, Allies',
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
