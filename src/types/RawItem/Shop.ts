export interface Shop {
  prices: Price;
  purchasable: boolean;
  tags: (keyof typeof Tags)[];
}

export enum Tags {
  'MAGE',
  'MAGIC_PEN',
  'MOVEMENT',
  'SUPPORT',
  'TANK',
  'FIGHTER',
  'MARKSMAN',
  'ASSASSIN',
}

export interface Price {
  total: number;
  combined: number;
  sell: number;
}
