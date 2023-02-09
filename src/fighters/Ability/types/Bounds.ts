export interface Bounds {
  lower: number;
  upper: number;
}

export interface BoundsList {
  Q: Bounds;
  W: Bounds;
  E: Bounds;
  R: Bounds;

  [key: string]: Bounds;
}
