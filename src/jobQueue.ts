import { setTimeout } from "timers/promises";
import { PromiseQueue } from "promise-queue-return";

/**
 * The polite job queue will ensure that we let a polite delay bewteen all jobs
 */
export const politeJobQueue = new PromiseQueue();
politeJobQueue.onJobExecuted = () => setTimeout(500);
