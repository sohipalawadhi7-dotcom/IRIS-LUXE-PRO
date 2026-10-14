const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/assets/js/app.js'),
      path.resolve(__dirname, 'src/assets/styles/app.scss'),
    ],
  },
  output: {
    // Compiled files are served by Salla from /public:
    // {{ 'app.css' | asset }} and {{ 'app.js' | asset }} in layouts/master.twig
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // app.scss contains legacy @font-face url('fonts/Tajawal-*') that are not shipped
            // (the site uses Google Fonts); skip them so the build does not fail.
            options: { url: { filter: (u) => !/^fonts\//.test(u) } },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|woff2?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/[name][ext]' },
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],
  resolve: { extensions: ['.js', '.scss', '.css'] },
  stats: 'minimal',
};
