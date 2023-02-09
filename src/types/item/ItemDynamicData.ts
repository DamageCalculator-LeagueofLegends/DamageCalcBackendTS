import { ActionConditions } from '../ability/ActionConditions';
import { ScalingValuesForChampAbilities } from '../champion/ScalingValuesForChampAbilities';

export interface ItemDynamicData {
  scalingValues?: ScalingValuesForChampAbilities;
  actionConditions?: ActionConditions;
  enemyMaxHealth?: number;
}
