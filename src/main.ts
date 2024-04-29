import redis from "~/src/redis.ts";
import { bullmq } from "~/deps.ts";
import { IMakeTransactionResult, IPaymentJob } from "~/src/interface.ts";
import { QueueNameEnum } from "~/src/enum.ts";

const { Worker } = bullmq;

const mockMakeTransaction = (
  params: { beneficiaryAccountNo: string; amount: number },
): Promise<IMakeTransactionResult> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        status: "SUCCEED",
        beneficiaryAccountNo: params.beneficiaryAccountNo,
        amount: params.amount,
      });
    }, parseInt((Math.random() * 100).toFixed()));
  });
};

const mockStoreResult = (params: IMakeTransactionResult): Promise<void> => {
  return new Promise((res) => {
    setTimeout(() => {
      console.info(`Storing ${params}`);

      res();
    }, parseInt((Math.random() * 100).toFixed()));
  });
};

/** WORKER */
const paymentWorker = new Worker<IPaymentJob>(
  QueueNameEnum.PAYMENT_QUEUE,
  async (job: bullmq.Job) => {
    console.info(`Consuming job: ${job.id || job.name}`);
    console.log(job.data);

    const data = job.data as IPaymentJob;

    const result = await mockMakeTransaction({
      beneficiaryAccountNo: data.beneficiaryAccountNo,
      amount: data.amount,
    });

    await mockStoreResult(result);
  },
  { connection: redis },
);

paymentWorker.on("ready", () => {
  console.info(`Payment worker ready`);
});

paymentWorker.on("failed", (job, error: Error) => {
  console.error(
    `Failed processing job ${job?.id || job?.name} | Reason: ${error}`,
  );
});

paymentWorker.on("error", (error: Error) => {
  console.error(JSON.stringify(error));
});

/** WORKER END */
