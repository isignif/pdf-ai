import { describe, test, mock } from "node:test";
import assert from "node:assert/strict";
import { JobQueue } from "./jobQueue.ts";

function flushPromises() {
  return new Promise((res) => setTimeout(res, 0));
}

describe(JobQueue.name, () => {
  test("should handle sequential functions", async () => {
    let counter = 0;
    async function func() {
      counter++;
      return counter;
    }

    const queue = new JobQueue();

    assert.strictEqual(await queue.add(func), 1);
    assert.strictEqual(await queue.add(func), 2);
    assert.strictEqual(await queue.add(func), 3);
  });

  test.skip("should handle nested queue functions", async () => {
    const queue = new JobQueue();

    async function func() {
      const res = await queue.add(async () => "res");
      return res;
    }

    assert.strictEqual(await queue.add(func), "res");
  });

  test("should execute hook", async () => {
    let counter = 0;
    async function func() {
      counter++;
      return counter;
    }

    const queue = new JobQueue();
    const afterJobExecuted = mock.fn();
    queue.afterJobExecuted = async () => {
      afterJobExecuted();
    };

    assert.strictEqual(await queue.add(func), 1);
    await flushPromises();
    assert.strictEqual(afterJobExecuted.mock.callCount(), 1);
  });
});
