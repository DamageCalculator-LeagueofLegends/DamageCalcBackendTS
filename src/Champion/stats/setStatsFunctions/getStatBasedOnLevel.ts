import { StatsInfo } from '../../../RawChampion/Stats';

export function getStatBasedOnLevel(stat: StatsInfo, level: number) {
  const base: number = stat.flat;
  const growth: number = stat.perLevel;
  const total = base + growth * (level - 1) * (0.7025 + 0.175 * (level - 1));
  return Math.round((total + Number.EPSILON) * 10000) / 10000;
}
