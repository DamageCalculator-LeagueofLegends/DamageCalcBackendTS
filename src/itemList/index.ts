import { LiandrysAnguish } from './LiandrysAnguish';
import { LudensTempest } from './LudensTempest';

import axios from 'axios';

const liandrysURL =
  'http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items/6653.json';
const ludensURL =
  'http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items/6655.json';

async function getData(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('oops');
    console.log(error);
  }
}

async function getListOfItems() {
  const liandrysAnguish = new LiandrysAnguish(await getData(liandrysURL));
  const ludensTempest = new LudensTempest(await getData(ludensURL));

  return [liandrysAnguish, ludensTempest];
}

export const listOfItems = getListOfItems();
