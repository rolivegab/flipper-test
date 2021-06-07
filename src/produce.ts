import { config } from "./config";
import searchList from "./assets/search-list.json";
import { getAmqpService } from "./services/getAmqpService";

config();
const produceOneHundredJobs = async () => {
  const amqpChannel = await getAmqpService();
  searchList.forEach((i) => {
    process.stdout.write(`spawn job ${i}\n`);
    amqpChannel.sendToQueue(Buffer.from(i), {
      persistent: true,
    });
  });
  amqpChannel.close();
};

produceOneHundredJobs();
