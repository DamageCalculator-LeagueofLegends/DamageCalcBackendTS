import { Router, Request, Response, json } from 'express';
import { listOfItems } from '../../items/itemList';

export const itemRouter = Router();
itemRouter.use(json());

itemRouter.get('/api/items', async (req: Request, res: Response) => {
  const items = await listOfItems;
  res.status(200).send({ listOfItems: items });
});
