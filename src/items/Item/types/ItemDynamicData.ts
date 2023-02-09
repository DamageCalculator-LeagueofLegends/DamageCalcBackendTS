import { ActionConditions } from '../../../fighters/Ability/types/ActionConditions';
import { ScalingValuesForChampAbilities } from '../../../fighters/Champion/types/ScalingValuesForChampAbilities';

export interface ItemDynamicData {
  scalingValues?: ScalingValuesForChampAbilities;
  actionConditions?: ActionConditions;
  enemyMaxHealth?: number;
}
