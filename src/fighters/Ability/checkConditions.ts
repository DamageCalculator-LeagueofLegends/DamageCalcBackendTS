import {
  AllConditions,
  Condition,
  checkedConditions,
} from './types/ActionConditions';

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

export function checkCondition(
  listOfConditions: Condition[],
  conditionToCheckWith: AllConditions
): checkedConditions {
  for (const index in listOfConditions)
    if (listOfConditions[index]!.type === conditionToCheckWith)
      return { hasCondition: true, index: parseInt(index) };
  return { hasCondition: false };
}
