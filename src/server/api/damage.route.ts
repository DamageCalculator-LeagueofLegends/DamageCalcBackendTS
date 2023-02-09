import { Router, Request, Response, json } from 'express';
import { FrontendData } from '../../types/FrontendData/FrontendData';
import { Simulation } from '../Simulation/Simulation';

export const damageRouter = Router();
damageRouter.use(json());

damageRouter.post('api/damage', async (req: Request, res: Response) => {
  const input: FrontendData = req.body;
  res.send(await testSimulation(input));
});

export async function testSimulation(data: FrontendData) {
  const damageSimulation = new Simulation(data);

  await damageSimulation.addParticipants();
  const tempt = damageSimulation.executeBatlle();
  console.log(tempt);
  return tempt;
}
