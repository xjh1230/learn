const spawn = require("./spawn");

module.exports = async () => {
  const watch = require("watch");
  let process;
  let isRefresh = false;
  watch.watchTree("./src", async (f) => {
    if (!isRefresh) {
      isRefresh = true;
      process && process.kill();
      await require("./refresh")();
      setTimeout(() => {
        isRefresh = false;
      }, 5000);
      process = spawn("npm", ["run", "serve"]);
    }
  });
};
