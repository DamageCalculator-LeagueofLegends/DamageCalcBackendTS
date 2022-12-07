import { ScalingValuesForChampAbilities } from '../../Champion/ScalingValuesForChampAbilities';
import { AbilityAtributeIndicies } from './AbilityAtributeIndicies';
import { ActionConditions } from './ActionConditions';
import { Bounds } from './Bounds';

export interface AbilityDynamicData {
  bounds?: Bounds;
  actionConditions: ActionConditions;
  skillLevel: number;
  attributeIndicies: AbilityAtributeIndicies;
  scalingValues: ScalingValuesForChampAbilities;
}
