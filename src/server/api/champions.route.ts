import { Router, json, Request, Response } from 'express';
import { addToChampWhitelist, champWhitelist, emptyWhiteList } from '../..';
import { Champion } from '../../fighters/Champion/Champion';
import { listOfChampions } from '../../fighters/championList';

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
  if (req.params.type === 'champs') res.send({ listOfChampions: champions });
});
