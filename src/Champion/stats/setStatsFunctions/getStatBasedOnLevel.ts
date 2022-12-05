import { StatsInfo } from '../../../RawChampion/Stats';

export function getStatBasedOnLevel(Stat: StatsInfo, level: number) {
  let base: number = Stat.flat;
  let growth: number = Stat.perLevel;
  let total = base + growth * (level - 1) * (0.7025 + 0.175 * (level - 1));
  return Math.round((total + Number.EPSILON) * 10000) / 10000;
}
