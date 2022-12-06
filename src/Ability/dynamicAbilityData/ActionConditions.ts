export interface ActionConditions {
  firstCondition: Condition[];
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
  'isSweetSpot', // Aatrox
  'numberOfAttribute', // Aatrox
  'numberOfUsages', // Ahri
  'firstInstance', // Ahri, Akali
  'secondInstance', // Ahri, Akali
}
