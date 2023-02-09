import express from 'express';
import cors from 'cors';
import { championRouter } from '../routes/champions.route';
import { itemRouter } from '../routes/items.route';
import { damageRouter } from '../routes/damage.route';

export const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.use(championRouter);

app.use(itemRouter);

app.use(damageRouter);
