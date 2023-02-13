import { AllConditions } from '../types/ability/ActionConditions';
import { FrontendData } from '../types/FrontendData/FrontendData';

// Akali
export const mock1: FrontendData = {
  participants: [
    {
      type: 'CHAMPION',
      championID: 84,
      championLevel: 6,
      listOfItemIDs: [6653, 6655],
      listOfActions: [
        {
          ability: 'AA',
          conditions: null,
        },
        {
          ability: 'Q',
          conditions: null,
        },
        {
          ability: 'AA',
          conditions: null,
        },
        {
          ability: 'E',
          conditions: {
            conditions: [
              { type: AllConditions.firstInstance, value: true },
              { type: AllConditions.secondInstance, value: true },
            ],
          },
        },
        {
          ability: 'E',
          conditions: {
            conditions: [
              { type: AllConditions.firstInstance, value: true },
              { type: AllConditions.secondInstance, value: false },
            ],
          },
        },
        {
          ability: 'R',
          conditions: {
            conditions: [
              { type: AllConditions.firstInstance, value: true },
              { type: AllConditions.secondInstance, value: true },
            ],
          },
        },
        {
          ability: 'R',
          conditions: {
            conditions: [
              { type: AllConditions.firstInstance, value: false },
              { type: AllConditions.secondInstance, value: true },
            ],
          },
        },
      ],
      abilityLevel: {
        Q: 0,
        W: 0,
        E: 0,
        R: 0,
      },
    },
    {
      type: 'DUMMY',
      health: 1000,
      armor: 50,
      magicResistance: 50,
    },
  ],
};

//Seraphine
export const mock2: FrontendData = {
  "participants": [
    {
      "type": "CHAMPION",
      "championID": 147,
      "championLevel": 1,
      "listOfItemIDs": [6653, 6655],
      "listOfActions": [
        {
          "ability": "AA",
          "conditions": null,
        },
        {
          "ability": "Q",
          "conditions": null,
        },
        {
          "ability": "AA",
          "conditions": null,
        },
        {
          "ability": "E",
          "conditions": null,
        },
        {
          "ability": "E",
          "conditions": null,
        },
        {
          "ability": "R",
          "conditions": null,
        },
      ],
      "abilityLevel": {
        "Q": 0,
        "W": 0,
        "E": 0,
        "R": 0,
      },
    },
    {
      "type": "DUMMY",
      "health": 1000,
      "armor": 0,
      "magicResistance": 0,
    },
  ],
};

// Aatrox
export const mock3: FrontendData = {
  participants: [
    {
      type: 'CHAMPION',
      championID: 266,
      championLevel: 1,
      listOfItemIDs: [6653, 6655],
      listOfActions: [
        {
          ability: 'AA',
          conditions: null,
        },
        {
          ability: 'Q',
          conditions: {
            conditions: [
              { type: AllConditions.numberOfAttribute, value: 1 },
              { type: AllConditions.isSweetSpot, value: true },
            ],
          },
        },
        {
          ability: 'Q',
          conditions: {
            conditions: [
              { type: AllConditions.numberOfAttribute, value: 2 },
              { type: AllConditions.isSweetSpot, value: false },
            ],
          },
        },
        {
          ability: 'Q',
          conditions: {
            conditions: [
              { type: AllConditions.numberOfAttribute, value: 0 },
              { type: AllConditions.isSweetSpot, value: false },
            ],
          },
        },
        {
          ability: 'AA',
          conditions: null,
        },
        {
          ability: 'W',
          conditions: {
            conditions: [{ type: AllConditions.tetherCompleted, value: true }],
          },
        },
        {
          ability: 'W',
          conditions: {
            conditions: [{ type: AllConditions.tetherCompleted, value: false }],
          },
        },
        {
          ability: 'R',
          conditions: null,
        },
      ],
      abilityLevel: {
        Q: 0,
        W: 0,
        E: 0,
        R: 0,
      },
    },
    {
      type: 'DUMMY',
      health: 1000,
      armor: 0,
      magicResistance: 0,
    },
  ],
};

//Ahri
export const mock4: FrontendData = {
  "participants": [
    {
      "type": "CHAMPION",
      "championID": 103,
      "championLevel": 1,
      "listOfItemIDs": [6653, 6655],
      "listOfActions": [
        {
          "ability": "AA",
          "conditions": null,
        },
        {
          "ability": 'Q',
          "conditions": {
            "conditions": [
              { "type": AllConditions.firstInstance, value: true },
              { "type": AllConditions.secondInstance, value: true },
            ],
          },
        },
        {
          ability: 'Q',
          conditions: {
            conditions: [
              { type: AllConditions.firstInstance, value: false },
              { type: AllConditions.secondInstance, value: true },
            ],
          },
        },
        {
          ability: 'Q',
          conditions: {
            conditions: [
              { type: AllConditions.firstInstance, value: true },
              { type: AllConditions.secondInstance, value: false },
            ],
          },
        },
        {
          ability: 'W',
          conditions: {
            conditions: [{ type: AllConditions.numberOfUsages, value: 1 }],
          },
        },
        {
          ability: 'W',
          conditions: {
            conditions: [{ type: AllConditions.numberOfUsages, value: 2 }],
          },
        },
        {
          ability: 'W',
          conditions: {
            conditions: [{ type: AllConditions.numberOfUsages, value: 3 }],
          },
        },
        {
          ability: 'E',
          conditions: null,
        },
        {
          ability: 'R',
          conditions: {
            conditions: [{ type: AllConditions.numberOfUsages, value: 1 }],
          },
        },
        {
          ability: 'R',
          conditions: {
            conditions: [{ type: AllConditions.numberOfUsages, value: 2 }],
          },
        },
        {
          ability: 'R',
          conditions: {
            conditions: [{ type: AllConditions.numberOfUsages, value: 3 }],
          },
        },
      ],
      abilityLevel: {
        Q: 0,
        W: 0,
        E: 0,
        R: 0,
      },
    },
    {
      type: 'DUMMY',
      health: 1000,
      armor: 0,
      magicResistance: 50,
    },
  ],
};
