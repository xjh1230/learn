const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/web",
  devServer: {
    port: 8080,
  },
  configureWebpack: (config) => {
    // config.resolve.alias.comps = path.join(__dirname, "src/compontans");
    config.resolve.alias.comps = resolve("src/components");
  },
  chainWebpack: (config) => {
    config.module.rule("svg").exclude.add(resolve("./src/icons"));
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("./src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
};
