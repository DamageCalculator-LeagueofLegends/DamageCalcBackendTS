import { ActionConditions } from './ActionConditions';
import { Bounds } from './Bounds';

export interface AbilityDynamicData {
  bounds?: Bounds;
  actionConditions: ActionConditions;
  skillLevel: number;
}
