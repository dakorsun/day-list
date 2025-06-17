module.exports = {
  '*.{js,ts,html,scss}': ['pnpx eslint --fix'],
  '*.{js,ts,json,css,scss,md,yaml,yml}': ['pnpx prettier --write'],
  '*.{scss}': ['pnpx stylelint --fix'],
};
