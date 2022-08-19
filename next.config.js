const path = require('path');

const moduleExports = {
  distDir: '.build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/theme.scss";`,
  },
};

module.exports =moduleExports
