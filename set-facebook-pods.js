const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, `EXFacebook.podspec`);
const dest = path.resolve(__dirname, `node_modules/expo-facebook/ios/EXFacebook.podspec`);
if (!fs.existsSync(src)) {
    // eslint-disable-next-line no-console
    console.log(`${src} doesn't exist`);
    return false;
  }
const data = fs.readFileSync(src, 'utf-8');
fs.writeFileSync(dest, data);