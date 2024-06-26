import { Module } from "@nestjs/common";
import { PrismConsumerModule } from "@dataengineering/prism-consumer-nestjs";

@Module({
  imports: [
    PrismConsumerModule.forRoot(
      // These values should come from your consumers configuration for the current deployment environment.
      // They should NOT be hardcoded values.
      {
        appname: "app-name", // Name of your application
        initialOffset: "earliest", // The initial offset of the Kafka Topic. Usually `earliest`.
      },
    ),
  ],
})
export class AppModule {}