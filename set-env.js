// copies app.json from celsius-creds repo

const fs = require('fs');
const path = require('path');

const { CONFIG } = process.env;
const ALL_CONFIGS = {
  DEV: 'DEV',
  STAGING: 'STAGING',
  PREPROD: 'PREPROD',
  PRODUCTION: 'PRODUCTION'
};

if (Object.keys(ALL_CONFIGS).indexOf(CONFIG) !== -1) {
  let src;
  const dest = path.resolve(__dirname, 'app.json');

  switch (CONFIG) {
    case ALL_CONFIGS.STAGING:
      src = path.resolve(__dirname, `../celsius-creds/staging/celsius-app/app.json`);
      break;
    case ALL_CONFIGS.PREPROD:
      src = path.resolve(__dirname, `../celsius-creds/pre-prod/celsius-app/app.json`);
      break;
    case ALL_CONFIGS.PRODUCTION:
      src = path.resolve(__dirname, `../celsius-creds/production/celsius-app/app.json`);
      break;
    case ALL_CONFIGS.DEV:
    default:
      src = path.resolve(__dirname, `../celsius-creds/dev/celsius-app/app.json`);
  }

  if (!fs.existsSync(src)) {
    console.log(`${src} doesn't exist`);
    return false;
  }

  const data = fs.readFileSync(src, 'utf-8');
  fs.writeFileSync(dest, data);
  console.log(`Created app.json for ${CONFIG} environment successfully`);
  return true;
} else {
  console.log(`Plese specify correct CONFIG variable, one of ${ Object.keys(ALL_CONFIGS).join(', ') }`);
  return false;
}
