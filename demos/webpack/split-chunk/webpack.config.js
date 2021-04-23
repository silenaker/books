const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const plugins = [new BundleAnalyzerPlugin()];

module.exports = {
  entry: "./src/index",
  output: {
    path: __dirname + "/dist"
  },
  mode: "none",
  optimization: {
    splitChunks: {
        // cacheGroups: {
        //     default: {
        //         minSize: 0
        //     },
        //     vendors: false
        // }
    }
  },
  plugins
};
