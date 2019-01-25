import * as uuid from "uuid";
import * as ZB from "zeebe-node";
import { ZBWorkerTaskHandler } from "zeebe-node/dist/lib/interfaces";
import { TaskType } from "./constants";

async function start() {
    const zbc = new ZB.ZBClient("localhost");
    const createWorker = (taskType: string, handler: ZBWorkerTaskHandler) =>
        zbc.createWorker(uuid.v4(), taskType, handler, { timeout: 5000 });
    const reliableWorker = createWorker(TaskType.TASK_1, (job, complete, worker) => {
        complete({ ...job.payload, key1: "modified", key2: "added" });
    });

    let n = 0;
    let faults = 0;
    createWorker(TaskType.TASK_2, (job, complete, worker) => {
        const { payload } = job;
        n++;
        let fault = false;
        if (payload.key1 !== "modified") {
            worker.log(`Iteration ${n} - key1 not modified`);
            fault = true;
        }
        if (payload.key2 !== "added") {
            worker.log(`Iteration ${n} - key2 not added`);
            fault = true;
        }
        if (fault) {
            faults++;
            worker.log(`Fault Count: ${faults}/${n}`);
            // Uncomment the line below and start with `npm run debug` to inspect the payload passed to
            // completeJob method in Task 1
            // process.exit();
        }
        complete(payload);
        if (n % 100 === 0) {
            worker.log(`${n} runs completed`);
        }
    });
}

start();
