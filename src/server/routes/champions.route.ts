import { Router, json, Request, Response } from 'express';
import { Champion } from '../../fighters/Champion/Champion';
import { listOfChampions } from '../../fighters/championList';

import { mock2 } from '../../utilities/mockData';

export let champWhitelist: string[] = [];
export function addToChampWhitelist(obj: any): any {
  for (let key in obj) {
    if (
      key !== 'rawChampData' &&
      key !== 'notes' &&
      key !== 'description' &&
      key !== 'blurb' &&
      key !== 'champItems' &&
      key !== 'hasPassive' &&
      key !== 'hasAssissinsMark' &&
      key !== 'echo' &&
      key !== 'noteStacks'
    ) {
      champWhitelist.push(key);
      if (typeof obj[key] === 'object') addToChampWhitelist(obj[key]);
    }
  }
}

export function emptyWhiteList() {
  champWhitelist = [];
}

export const championRouter = Router();
championRouter.use(json());

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

championRouter.get('/api/champs', async (req: Request, res: Response) => {
  const champions = getListOfJsonChampions(await listOfChampions);

  res.status(200).send({ listOfChampions: champions });
});
