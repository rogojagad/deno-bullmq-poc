import { IPaymentJob } from "~/src/interface.ts";
import { bullmq } from "~/deps.ts";
import redis from "~/src/redis.ts";
import { JobNameEnum, QueueNameEnum } from "~/src/enum.ts";

const { Queue } = bullmq;
// const numberOfJob = parseInt((Math.random() * 100).toFixed());
const numberOfJob = 3;

console.info(`Number of job: ${numberOfJob}`);

const paymentJobs: IPaymentJob[] = (new Array(numberOfJob)).fill(0).map(
  (_, idx) => {
    return {
      beneficiaryAccountNo: `beneficiary-${idx}`,
      sourceAccountNo: `source-${idx}`,
      amount: idx * 1000,
    };
  },
);

const paymentQueue = new Queue(QueueNameEnum.PAYMENT_QUEUE, {
  connection: redis,
});

for (const [idx, job] of paymentJobs.entries()) {
  const jobId = `payment-${idx}`;

  console.info(`Adding job with ID ${jobId}`);
  console.log(job);

  await paymentQueue.add(JobNameEnum.PAYMENT_JOB, job, {
    jobId,
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
  });

  console.info(`Added job with ID ${jobId}`);
}
