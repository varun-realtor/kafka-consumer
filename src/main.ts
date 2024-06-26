import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {PrismConsumerRunner} from "@dataengineering/prism-consumer-nestjs"
import { KafkaConsumer } from './kafka.consumer';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();


const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  // ShutdownHooks must be enabled for the consumer to exit gracefully.
  app.enableShutdownHooks();

  // Get an instance of the `PrismConsumerRunner`
  const consumerRunner = app.get(PrismConsumerRunner);

  // Start the consumer, using the `KafkaConsumer` created in the `Create a Consumer` step
  await consumerRunner.start(app, new KafkaConsumer());
};

bootstrap();