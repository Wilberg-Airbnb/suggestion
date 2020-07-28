
var path = require('path');
const BrotliGzip = require('brotli-gzip-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

var SRC_DIR = path.join(__dirname,'/client/src');
var DIST_DIR = path.join(__dirname,'/public/dist');

module.exports ={
  plugins: [new CompressionPlugin()],
  entry: `./client/src/index.jsx`,
  output:{
    filename:'bundle.js',
    path:DIST_DIR,
  },
  module:{
    rules:[
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include:SRC_DIR,
        loader: 'babel-loader',
        options:{
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins:[
    new BrotliGzip({
      asset: '[file].br[query]',
      algorithm: 'brotli',
      test: /\.(js|cdd|html|svg)$/,
      threshold: 10240,
      minRatio:0.8,
      quality: 11,
    }),
    new BrotliGzip({
      asset: '[file].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|cdd|html|svg)$/,
      threshold: 10240,
      minRatio:0.8,
      quality: 11,
    })
  ]
};
