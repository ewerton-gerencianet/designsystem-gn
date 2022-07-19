const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('./src/assets/tokens/designsystem-gn/data/tokens.json'));

const pureColors = Object.keys(tokens.global.colors).reduce((acc, color) => {
  const groupColors = {};

  Object.keys(tokens.global.colors[color]).forEach((value) => {
    groupColors[value.replace('★', '')] = tokens.global.colors[color][value].value;
  });

  if(color === 'transparent') {
    acc[color] = 'transparent';
  } else if(color === 'white' || color === 'black') {
    acc[color] = tokens.global.colors[color].value;
  } else {
    acc[color] = groupColors;
  }
  return acc;
}, {});

module.exports = pureColors


