/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          types: './@types',
          assets: './assets',
        },
      },
    ],
    'react-native-reanimated/plugin', // needs to be last
  ],
};
