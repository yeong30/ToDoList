const webpack = require("webpack");
const path = require("path");
const os = require("os");
// 분석용
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// css 최소화  CSS를 최적화하고 축소
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// CSS 최적화
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// JavaScript를 최소화/최소화
const TerserPlugin = require("terser-webpack-plugin");

// html에 번들 자동으로 추가
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: { index: path.resolve(__dirname, "src", "index.js") },
  output: {
    path: path.resolve(__dirname, "build"),
    // publicPath: "./",
    filename: "bundle.js",
    pathinfo: false,
    clean: true,
  },

  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({ template: "/public/index.html" }),
    new webpack.EnvironmentPlugin({
      //환경변수 설정
      NODE_ENV: "production",
    }),
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
  ],

  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        //병렬질드
        parallel: os.cpus().length - 1,
      }),
      // 병렬로 빌드, 주석 추출
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
