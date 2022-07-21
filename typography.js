const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('./src/assets/tokens/designsystem-gn/tokens.json'));

// Font Family
const fontFamily = Object.keys(tokens.global.fontFamilies).reduce((acc, font) => {
  acc[font] = [tokens.global.fontFamilies[font].value, 'sans-serif'];
  return acc;
}, {});

// Line Height
const lineHeight = Object.keys(tokens.global.lineHeights).reduce((acc, lineH) => {
  acc[lineH] = (lineH / 16).toString() + 'rem';
  return acc;
}, {});

// Letter Spacing
const letterSpacing = Object.keys(tokens.global.letterSpacing).reduce((acc, letterS) => {
  acc[letterS] = tokens.global.letterSpacing[letterS].value.toString() + 'px';
  return acc;
}, {});

// Font Weight
const fontWeightToIgnore = ['font-italic', 'font-bold-italic'];
const fontWeight = Object.keys(tokens.global.fontWeights).reduce((acc, fontW) => {
  if (!fontWeightToIgnore.includes(fontW)) {
    acc[fontW] = tokens.global.fontWeights[fontW].value;
  }
  return acc;
}, {});

// Typography
const fontSize = {};
Object.keys(tokens.global.typos).forEach((typo) => {
  Object.keys(tokens.global.typos[typo]).forEach((token) => {
    Object.keys(tokens.global.typos[typo][token]).forEach((dsToken) => {

      // Font Size
      const fontS = (tokens.global.typos[typo][token][dsToken].value.fontSize.replace(/[{}]+/g, '')).split('.')[1];
      const fontW = (tokens.global.typos[typo][token][dsToken].value.fontWeight.replace(/[{}]+/g, '')).split('.')[1];
      const letterS = (tokens.global.typos[typo][token][dsToken].value.letterSpacing.replace(/[{}]+/g, '')).split('.')[1];

      // Typography
      const lineH = (tokens.global.typos[typo][token][dsToken].value.lineHeight.replace(/[{}]+/g, '')).split('.')[1];

      Object.assign(fontSize, {
        [token + '-' + dsToken]: [
          (Number(fontS) / 16).toString() + 'rem', {
            lineHeight: lineHeight[lineH],
            letterSpacing: letterSpacing[letterS],
            ...(!fontWeightToIgnore.includes(fontW)) && { fontWeight: fontWeight[fontW] },
          }
        ]
      })
    });
  })
});

module.exports = {
  fontFamily,
  lineHeight,
  fontWeight,
  fontSize,
  letterSpacing
}




