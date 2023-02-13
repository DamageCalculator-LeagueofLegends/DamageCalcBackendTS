import { Router, Request, Response, json } from 'express';
import { FrontendData, OverallDamageData } from '../../types/FrontendData/FrontendData';
import { Simulation } from '../../execution/Simulation';

export const damageRouter = Router();
damageRouter.use(json());

damageRouter.post('/api/damage', async (req: Request, res: Response) => {
  const input: FrontendData = req.body;

  const damageData = await testSimulation(input)

  res.status(200).send(damageData);
});

export async function testSimulation(data: FrontendData): Promise<OverallDamageData> {
  const damageSimulation = new Simulation(data);

  await damageSimulation.addParticipants();
  const tempt = damageSimulation.executeBatlle();
  console.log(tempt);
  return tempt;
}
