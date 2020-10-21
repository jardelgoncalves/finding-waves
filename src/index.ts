import { SetupServer } from './server';
import config from 'config';
import logger from './logger';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    `App exiting due to an unhandled promise: ${promise} and reasons: ${reason}`
  );
  throw reason;
});

process.on('uncaughtException', (error) => {
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

(async () => {
  try {
    const server = new SetupServer(config.get('App.port'));
    await server.init();
    server.start();

    const ExitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    ExitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          await server.close();
          logger.info('App exited with Success');
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();
