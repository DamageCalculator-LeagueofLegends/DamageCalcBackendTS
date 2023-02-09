import express from 'express';
import cors from 'cors';
import { championRouter } from './champions.route';
import { itemRouter } from './items.route';
import { damageRouter } from './damage.route';

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


