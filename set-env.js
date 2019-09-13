// copies app.json from celsius-app-creds repo

const fs = require('fs');
const path = require('path');

const { CONFIG, DIRECTORY_PATH } = process.env;

const DEFAULT_CREDS_DIR = './celsius-app-creds'

const ALL_CONFIGS = {
  // DEV: 'DEV',
  STAGING: 'STAGING',
  PRODUCTION: 'PRODUCTION'
};

const filesToCopy = [
  'app.json',
  'google-services.json',
  'celsius.jks',
  'constants.js',
  'branch.json',
]

if (Object.keys(ALL_CONFIGS).indexOf(CONFIG) !== -1) {
  filesToCopy.forEach(copyFileFromCelsiusCreds)

  // eslint-disable-next-line no-console
  console.log(`Generated all env specific files for ${CONFIG} environment successfully`);
  return true;
}

// eslint-disable-next-line no-console
console.log(`Plese specify correct CONFIG variable, one of ${ Object.keys(ALL_CONFIGS).join(', ') }`);
return false;

function copyFileFromCelsiusCreds(pathToFile) {
  let src;
  const dest = path.resolve(__dirname, pathToFile);
  const directoryPath = DIRECTORY_PATH || DEFAULT_CREDS_DIR

  switch (CONFIG) {
    case ALL_CONFIGS.PRODUCTION:
      src = path.resolve(__dirname, `${directoryPath}/production/${pathToFile}`);
      break;

    case ALL_CONFIGS.DEV:
    case ALL_CONFIGS.STAGING:
    default:
      src = path.resolve(__dirname, `${directoryPath}/staging/${pathToFile}`);
  }

  if (!fs.existsSync(src)) {
    // eslint-disable-next-line no-console
    console.log(`${src} doesn't exist`);
    return false;
  }

  const data = fs.readFileSync(src, 'utf-8');
  fs.writeFileSync(dest, data);

  // eslint-disable-next-line no-console
  console.log(`${pathToFile} was copied to project`)
}