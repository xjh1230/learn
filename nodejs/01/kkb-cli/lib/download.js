const { promisify } = require("util");
module.exports.clone = async function clone(repo, desc) {
  const download = promisify(require("download-git-repo"));
  const ora = require("ora");
  const process = ora(`下载 ${repo} 代码中...`);
  process.start();
  try {
    await download(repo, desc);
  } catch (err) {
    console.log(err);
    process.fail();
  }
  process.succeed();
};
