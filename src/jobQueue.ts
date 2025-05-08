import { setTimeout } from "timers/promises";

type Job = {
  id: number;
  func: () => Promise<void>;
};

export class JobQueue {
  #nextId = 0;
  #jobs: Job[] = [];
  #isRunning = false;
  /**
   * Callback function to execute before a job was executed.
   */
  beforeJobExecuted?: (job: Job) => Promise<void> = undefined;
  /**
   * Callback function to execute after a job was executed.
   */
  afterJobExecuted?: (job: Job) => Promise<void> = undefined;

  /**
   * Add a job to the queue
   * @returns a Promise that will be resolved when the job is executed
   */
  add<R>(func: () => Promise<R>): Promise<R> {
    return new Promise(async (res, rej) => {
      async function callback() {
        try {
          const data = await func();
          res(data);
        } catch (e) {
          rej(e);
        }
      }
      this.#jobs.push({ func: callback, id: this.#incrementNextId() });
      await this.#run();
    });
  }

  async #run() {
    if (this.#isRunning) return;
    this.#isRunning = true;

    while (this.#jobs.length > 0) {
      const job = this.#jobs.shift();
      if (!job) continue;
      await job.func();
      if (this.afterJobExecuted) await this.afterJobExecuted(job);
    }

    this.#isRunning = false;
  }

  #incrementNextId() {
    return this.#nextId++;
  }
}

/**
 * The polite job queue will ensure that we let a polite delay bewteen all jobs
 */
export const politeJobQueue = new JobQueue();
politeJobQueue.afterJobExecuted = () => setTimeout(500);
