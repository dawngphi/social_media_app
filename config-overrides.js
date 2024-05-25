const {override,useBabelRc} = require("customize-cra");
module.exports = override(
  useBabelRc()  // this line to override the webpack config
);
