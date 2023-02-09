import { ScalingValuesForChampAbilities } from '../../Champion/types/ScalingValuesForChampAbilities';
import { AbilityAtributeIndicies } from './AbilityAtributeIndicies';
import { ActionConditions } from './ActionConditions';
import { Bounds } from './Bounds';

export interface AbilityDynamicData {
  bounds?: Bounds;
  actionConditions?: ActionConditions | null;
  skillLevel?: number | null;
  attributeIndicies?: AbilityAtributeIndicies | null;
  scalingValues?: ScalingValuesForChampAbilities | null;
}
