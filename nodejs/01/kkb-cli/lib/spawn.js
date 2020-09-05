const { spawn } = require("child_process");
module.exports = async (...args) => {
  const options = args[args.length - 1];
  if (process.platform === "win32") {
    //设置shell为true  隐式调用cmd
    options.shell = true;
  } else {
  }
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    return proc;
  });
};
