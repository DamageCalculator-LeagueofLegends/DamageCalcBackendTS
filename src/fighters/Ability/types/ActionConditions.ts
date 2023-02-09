export interface ActionConditions {
  conditions: Condition[];
}

export type Condition =
  | {
      type: keyof typeof AllConditions;
      value: number;
    }
  | {
      type: keyof typeof AllConditions;
      value: boolean;
    };

export enum AllConditions {
  // Champions
  'isSweetSpot' = 'isSweetSpot', // Aatrox
  'numberOfAttribute' = 'numberOfAttribute', // Aatrox
  'tetherCompleted' = 'tetherCompleted', // Aatrox
  'numberOfUsages' = 'numberOfUsages', // Ahri
  'firstInstance' = 'firstInstance', // Ahri, Akali
  'secondInstance' = 'secondInstance', // Ahri, Akali

  // Items
  'secondsApplied' = 'secondsApplied',
}

export interface checkedConditions {
  hasCondition: boolean;
  index?: number;
}
