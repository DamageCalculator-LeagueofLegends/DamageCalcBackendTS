export function round(input: number, roundByNumber: number) {
  const roundBy = Math.pow(10, roundByNumber);
  return Math.round((input + Number.EPSILON) * roundBy) / roundBy;
}
