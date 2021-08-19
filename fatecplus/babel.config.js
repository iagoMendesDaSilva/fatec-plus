module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '~': './src',
          '~img': './src/assets/img',
          '~screens': './src/screens',
          '~services': './src/services',
          '~fonts': './src/assets/fonts',
          '~contexts': './src/contexts',
          '~statics': './src/assets/statics',
          '~navigators': './src/navigators',
          '~colors': './src/constants/colors',
          '~values': './src/constants/values',
          '~strings': './src/constants/strings',
          '~request': './src/services/request',
          '~components': './src/components',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js'
        ]
      }
    ]
  ]
};
