import { AbilityDynamicData } from '../Ability/dynamicAbilityData/AbilityDynamicData';
import { AllConditions } from '../Ability/dynamicAbilityData/ActionConditions';
import { Champion } from '../Champion/Champion';
import { Aatrox } from './Aatrox';
import { Ahri } from './Ahri';
import { Akali } from './Akali';
import { Seraphine } from './Seraphine';

const axios = require('axios');

const aatroxURL =
  'http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions/Aatrox.json';
const ahriURL =
  'http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions/Ahri.json';
const akaliURL =
  'http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions/Akali.json';
const seraphineURL =
  'http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions/Seraphine.json';

async function getData(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('oops');
    console.log(error);
  }
}

async function getListOfChampions() {
  const aatrox = new Aatrox(await getData(aatroxURL));
  // for testing purposes:
  let dynamicDataQ: AbilityDynamicData = {
    actionConditions: {
      conditions: [
        { type: AllConditions.numberOfAttribute, value: 1 },
        { type: AllConditions.isSweetSpot, value: true },
      ],
    },
    skillLevel: 2,
  };
  let dynamicDataW: AbilityDynamicData = {
    actionConditions: {
      conditions: [{ type: AllConditions.tetherCompleted, value: true }],
    },
    skillLevel: 0,
  };
  let dynamicDataE: AbilityDynamicData = {
    skillLevel: 0,
  };
  let dynamicDataR: AbilityDynamicData = {
    skillLevel: 0,
  };

  aatrox.setDynamicAbilityDataQ(dynamicDataQ);
  aatrox.setDynamicAbilityDataW(dynamicDataW);
  aatrox.setDynamicAbilityDataE(dynamicDataE);
  aatrox.setDynamicAbilityDataR(dynamicDataR);

  //
  //
  const ahri = new Ahri(await getData(ahriURL));
  // for testing puposes:
  dynamicDataQ = {
    actionConditions: {
      conditions: [
        { type: AllConditions.firstInstance, value: true },
        { type: AllConditions.secondInstance, value: true },
      ],
    },
    skillLevel: 0,
  };
  dynamicDataW = {
    actionConditions: {
      conditions: [{ type: AllConditions.numberOfUsages, value: 2 }],
    },
    skillLevel: 0,
  };
  dynamicDataE = {
    skillLevel: 0,
  };
  dynamicDataR = {
    actionConditions: {
      conditions: [{ type: AllConditions.numberOfUsages, value: 4 }],
    },
    skillLevel: 0,
  };

  ahri.setDynamicAbilityDataQ(dynamicDataQ);
  ahri.setDynamicAbilityDataW(dynamicDataW);
  ahri.setDynamicAbilityDataE(dynamicDataE);
  ahri.setDynamicAbilityDataR(dynamicDataR);
  ahri.updateTotalBonusAndScalingValues(100, 'abilityPower');

  //
  //
  const akali = new Akali(await getData(akaliURL));
  // for testing purposes:
  akali.champUtilInfo = {
    ...akali.champUtilInfo,
    enemyMaxHealth: 1000,
    enemyCurrentHealth: 650,
  };
  dynamicDataQ = {
    skillLevel: 0,
  };
  dynamicDataW = {
    skillLevel: 0,
  };
  dynamicDataE = {
    actionConditions: {
      conditions: [
        { type: AllConditions.firstInstance, value: true },
        { type: AllConditions.secondInstance, value: true },
      ],
    },
    skillLevel: 0,
  };
  dynamicDataR = {
    actionConditions: {
      conditions: [
        { type: AllConditions.firstInstance, value: true },
        { type: AllConditions.secondInstance, value: true },
      ],
    },
    skillLevel: 0,
  };
  akali.setDynamicAbilityDataQ(dynamicDataQ);
  akali.setDynamicAbilityDataW(dynamicDataW);
  akali.setDynamicAbilityDataE(dynamicDataE);
  akali.setDynamicAbilityDataR(dynamicDataR);
  akali.updateTotalBonusAndScalingValues(100, 'abilityPower');

  //
  //
  const seraphine = new Seraphine(await getData(seraphineURL));
  // for testing purposes:
  seraphine.champUtilInfo = {
    ...seraphine.champUtilInfo,
    enemyMaxHealth: 1000,
    enemyCurrentHealth: 700,
  };
  dynamicDataQ = {
    skillLevel: 0,
  };
  dynamicDataW = {
    skillLevel: 0,
  };
  dynamicDataE = {
    skillLevel: 0,
  };
  dynamicDataR = {
    skillLevel: 0,
  };
  seraphine.setDynamicAbilityDataQ(dynamicDataQ);
  seraphine.setDynamicAbilityDataW(dynamicDataW);
  seraphine.setDynamicAbilityDataE(dynamicDataE);
  seraphine.setDynamicAbilityDataR(dynamicDataR);
  seraphine.updateTotalBonusAndScalingValues(100, 'abilityPower');

  return [aatrox, ahri, akali, seraphine];
}

export const listOfChampions = getListOfChampions();
