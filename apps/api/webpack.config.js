const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../dist/api'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      // Correct the path to assets
      // assets: [join(__dirname, 'src/assets')], // Ensure this path is correct
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
