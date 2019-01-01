module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['component', {
      "libraryName": "mint-ui",
      "style": true
    }],
    '@babel/plugin-transform-strict-mode',
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  ignore: [
    './src/lib/mui/js/mui.min.js'
  ]
}
