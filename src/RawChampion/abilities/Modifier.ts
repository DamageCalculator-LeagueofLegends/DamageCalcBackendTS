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
  '   per 4% critical strike chance',
}
