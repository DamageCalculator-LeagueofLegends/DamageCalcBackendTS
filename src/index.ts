import { app } from './server/api/app';
import { config } from 'dotenv';

config()

const runServer = () => {
  const PORT = process.env.PORT || 5050;

  app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
  });
};

runServer();
