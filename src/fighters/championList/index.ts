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
  const ahri = new Ahri(await getData(ahriURL));
  const akali = new Akali(await getData(akaliURL));
  const seraphine = new Seraphine(await getData(seraphineURL));

  return [aatrox, ahri, akali, seraphine];
}

export const listOfChampions = getListOfChampions();
