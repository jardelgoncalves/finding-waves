import { SetupServer } from './server';
import config from 'config';
import logger from './logger';

(async () => {
  try {
    const server = new SetupServer(config.get('App.port'));
    await server.init();
    server.start();
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
  }
})();
