import { PrismConsumer, AvroRecord } from "@dataengineering/prism-consumer-nestjs";
import { Injectable } from "@nestjs/common";

function logCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return`${hours}-${minutes}-${seconds}`;
}

@Injectable()
export class KafkaConsumer implements PrismConsumer {
  public topics = ["prism.clickstream.DirectSendWebEvent"];

  // Returns `true` if the record should be filtered (skipped)
  // Returns `false` if the record should NOT be filtered (processed in the eachRecord method)
  // If you have no skip criteria, always `return false` so that all records are processed
  public filter(record: AvroRecord): boolean {
    // if (mySkipCriteria(record)) {
    //   return true;
    // }
    return false;
  }

  // The `eachRecord` method is used to process each record that is received from Kafka.
  // Use this method to send to any other service, or other processing that is required.
  // Errors are logged and don't affect processing, however PrismConsumerBlockingError is a special error, indicating that consumer should halt processing and shut down without the Consumer Group committing the offset.
  async eachRecord(record: AvroRecord): Promise<void> {
    // this.logger.debug("Received record with payload", record.payload);
    // response = this.sendEventToMyApi(record.payload);
    // if (response.isMyApiDown()) {
    //   throw new PrismConsumerBlockingError("My API is down - halt/restart processing");
    // }
    // if (response.isBadRecord()) {
    //   throw new MyError("Invalid data supplied and can not be processed, skipping record...", record.payload);
    // }
    // return;
    console.log("record", record)
    const t1 = record.timestamp
    console.log("event-start-time", t1)

    const tc = new Date()
    console.log("event-recived-time", tc.getTime() )

    console.log("transit-time", tc.getTime() - t1 )
    
    console.log("`")
    console.log("`")
    console.log(`~~~~~~~~~~~~~~~ Space Between Each Events ~~~~~~~~~~~~~~~~(${logCurrentTime()})`)
    console.log("`")
    console.log("`")
    return;
  }
}