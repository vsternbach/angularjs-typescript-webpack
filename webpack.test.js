const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');
const sourcePath = path.resolve(__dirname, 'src');

const plugins = [
  new ForkTsCheckerWebpackPlugin({
    tslint: true,
    checkSyntacticErrors: true
  })
];

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'resolve-url-loader']
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'resolve-url-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ng-annotate-loader',
            options: {
              ngAnnotate: 'ng-annotate-patched',
              sourcemap: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: sourcePath + '/tsconfig.spec.json',
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  plugins,
};
