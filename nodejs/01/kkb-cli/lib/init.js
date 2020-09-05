const gitRepo = "su37josephxia/vue-template";
const url = "http://127.0.0.1:8081";
const { promisify } = require("util");
const figlet = promisify(require("figlet")); //打印
const clear = require("clear"); //清屏
const chalk = require("chalk"); //彩色打印

const { clone } = require("./download"); //下载
const log = (content) => console.log(chalk.green(content));

const spawn = require("./spawn");

// const spawn = async (...args) => {
//   const { spawn } = require("child_process");
//   const options = args[args.length - 1];
//   if (process.platform === "win32") {
//     //设置shell为true  隐式调用cmd
//     options.shell = true;
//   } else {
//   }
//   return new Promise((reslove) => {
//     const proc = spawn(...args);
//     proc.stdout.pipe(process.stdout);
//     proc.stdout.pipe(process.stuerr);
//     proc.on("close", () => {
//       reslove();
//     });
//   });
// };
module.exports = async (name) => {
  clear();
  const data = await figlet("XJH Welcome");
  log(data);
  log(`🚀创建项目：${name}`);
  // await clone(`github:${gitRepo}`, name);
  log("安装依赖");
  // await spawn("npm", ["install"], { cwd: `./${name}` });
  log(`
  🆗 安装完成：
    To get start
    ==========================
        cd ${name}
        npm run serve
    ==========================
    `);
  const open = require("open");

  open(url);
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};
