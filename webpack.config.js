// const EncodingPlugin = require('webpack-encoding-plugin');
const path = require('path');

module.exports = {
  //配置项
  entry: "./src/main.js",
  output: {
    filename: "chexcel.js",
    path: path.resolve(__dirname, 'dist')
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000
  // }
  module: {
    rules: [
      {
        test: /\.js$/, 
        use: { // 使用到的loader
          loader: 'babel-loader', 
          options: { 
            presets: [],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      }
    ]
  }
};
