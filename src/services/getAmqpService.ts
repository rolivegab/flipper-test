import amqp from "amqplib";

export const getAmqpService = async (queueName: string = "searchQueue") => {
  const amqpConnection = await amqp.connect(process.env.RABBITMQ_URL);
  const amqpChannel = await amqpConnection.createChannel();
  await amqpChannel.prefetch(1);
  await amqpChannel.assertQueue(queueName, {
    durable: true,
  });
  return {
    sendToQueue: (content: Buffer, options?: amqp.Options.Publish) =>
      amqpChannel.sendToQueue(queueName, content, options),
    consume: async (
      onMessage: (msg: string) => Promise<void>,
      options?: amqp.Options.Consume
    ) =>
      amqpChannel.consume(
        queueName,
        async (msg) => {
          if (msg) {
            await onMessage(msg.content.toString());
            amqpChannel.ack(msg);
          }
        },
        options
      ),
    close: async () => {
      await amqpChannel.close();
      await amqpConnection.close();
    },
  };
};
