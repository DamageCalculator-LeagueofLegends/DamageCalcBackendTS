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
  'isSweetSpot' = 'isSweetSpot', // Aatrox
  'numberOfAttribute' = 'numberOfAttribute', // Aatrox
  'tetherCompleted' = 'tetherCompleted', // Aatrox
  'numberOfUsages' = 'numberOfUsages', // Ahri
  'firstInstance' = 'firstInstance', // Ahri, Akali
  'secondInstance' = 'secondInstance', // Ahri, Akali
}

export function checkCondition(
  listOfConditions: Condition[],
  conditionToCheckWith: AllConditions
): checkedConditions {
  for (const index in listOfConditions)
    if (listOfConditions[index]!.type === conditionToCheckWith)
      return { hasCondition: true, index: parseInt(index) };
  return { hasCondition: false };
}

export interface checkedConditions {
  hasCondition: boolean;
  index?: number;
}

export function checkIfConditonExists(
  checkedCond: checkedConditions,
  conditions: Condition[],
  checkWith: boolean | number
): boolean {
  return (
    checkedCond.hasCondition === true &&
    conditions[checkedCond.index!]?.value === checkWith
  );
}
