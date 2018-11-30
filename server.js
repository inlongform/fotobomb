const cluster = require("cluster");
const os = require("os");

if (process.env.NODE_ENV === "production") {
  if (cluster.isMaster) {
    const numWorkers = os.cpus().length;

    for (let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }

    cluster.on("online", function(worker) {
      console.log("Worker " + worker.process.pid + " is online");
    });

    cluster.on("exit", function(worker, code, signal) {
      console.log(
        "Worker " +
          worker.process.pid +
          " died with code: " +
          code +
          ", and signal: " +
          signal
      );
      console.log("Starting a new worker");
      cluster.fork();
    });
  } else {
    require("./app");
  }
} else {
  require("./app");
}
