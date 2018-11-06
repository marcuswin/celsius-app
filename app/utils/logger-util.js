import { Constants } from "expo";

const { ENV } = Constants.manifest.extra;

export default {
  log,
  warn,
  info,
}

function log(content) {
  if (['STAGING', 'PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.log(content)
}

function info(content) {
  if (['STAGING', 'PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.info(content)
}

function warn(content) {
  if (['STAGING', 'PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.warn(content)
}
