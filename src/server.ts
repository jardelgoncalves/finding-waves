import './util/module-alias';
import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import expressPinoLogger from 'express-pino-logger';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { OpenApiValidator } from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ForecastController } from './controllers/forecast';
import { BeachesController } from './controllers/beaches';
import * as database from './database';
import { UsersController } from './controllers/users';
import logger from './logger';
import apiSwagger from '@src/api-schema.json';

export class SetupServer extends Server {
  constructor(private port = 3001) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    await this.setupDoc();
    this.setupControllers();
    await this.setupDatabase();
  }

  private async setupDoc(): Promise<void> {
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiSwagger));
    await new OpenApiValidator({
      apiSpec: apiSwagger as OpenAPIV3.Document,
      validateRequests: true,
      validateResponses: true,
    }).install(this.app);
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(
      expressPinoLogger({
        logger,
      })
    );
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();

    this.addControllers([
      forecastController,
      beachesController,
      usersController,
    ]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.app.listen(process.env.PORT || this.port, () => {
      logger.info(
        'Server listening of port: ' + (process.env.PORT || this.port)
      );
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
