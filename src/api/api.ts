import { addToChampWhitelist, champWhitelist, emptyWhiteList } from '..';
import { Champion } from '../Champion/Champion';
import { listOfChampions } from '../championList';
import { AbilityNames, FrontendData } from '../FrontendData/FrontendData';
import { Item } from '../Item/Item';
import { listOfItems } from '../itemList';
import { Simulation } from '../Simulation/Simulation';
import { mock1, mock2, mock3, mock4 } from '../Utility/mockData';

export function getListOfJsonChampions(champions: Champion[]) {
  const jsonChampions: string[] = [];
  for (const champion of champions) {
    addToChampWhitelist(champion);
    let temp = JSON.stringify(champion, champWhitelist);
    temp.replace(/\//g, '');
    let output = JSON.parse(temp);
    jsonChampions.push(output);
    emptyWhiteList();
  }
  return jsonChampions;
}

export function getListOfJsonItems(items: Item[]) {
  const jsonItems: string[] = [];
  for (const item of items) {
    jsonItems.push(JSON.stringify(item));
  }
  return jsonItems;
}

export async function runServer() {
  const express = require('express');
  const cors = require("cors")
  const app = express();
  const port = 5050;

  app.use(express.json());
  app.use(
    cors({
        origin: "*"
    })
  )

  app.get('/getInitData/:type', async (req: any, res: any) => {
    const champions = getListOfJsonChampions(await listOfChampions);
    // const items = getListOfJsonItems(await listOfItems)
    const items = await listOfItems;
    if (req.params.type === 'champs') res.send({ listOfChampions: champions });
    else if (req.params.type === 'items') res.send({ listOfItems: items });
  });

  app.post('/sendData', async (req: any, res: any) => {
    const input: FrontendData = req.body;
    res.send(await testSimulation(input));
  });

  app.listen(port, () => {
    console.log(`listen on port ${port}`);
  });
}

export async function testSimulation(data: FrontendData) {
  const damageSimulation = new Simulation(data);

  await damageSimulation.addParticipants();
  const tempt = damageSimulation.executeBatlle()
  console.log(tempt)
  return tempt;
}

export interface OverallDamageData {
  totalDamge: number;
  trueDamage: number;
  physicalDamage: number;
  magicDamage: number;
  abilityDamage: AbilityDamage[];
}

export interface AbilityDamage {
  type: keyof typeof AbilityNames;
  value: number;
}
