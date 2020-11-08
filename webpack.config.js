const path = require(`path`);

module.exports = {
  entry: [
   `./js/util.js`,
   `./js/load.js`,
   `./js/card.js`,
   `./js/advert.js`,
   `./js/pin.js`,
   `./js/map.js`,
   `./js/form.js`,
   `./js/filter.js`,
   `./js/move.js`,
   `./js/handlers.js`,
   `./js/error.js`,
   `./js/success.js`,
   `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
