import { ActionConditions } from '../Ability/dynamicAbilityData/ActionConditions';
import { ScalingValuesForChampAbilities } from '../Champion/ScalingValuesForChampAbilities';

export interface ItemDynamicData {
  scalingValues?: ScalingValuesForChampAbilities;
  actionConditions?: ActionConditions;
  enemyMaxHealth?: number;
}
