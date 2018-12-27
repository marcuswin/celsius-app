// TODO(fj): make test sentry with a loop. move to methods

import { Constants } from 'expo';
import Sentry from 'sentry-expo';

const { ENV, SENTRY_DSN } = Constants.manifest.extra;

const mySentryNonTest = {
    init: () => {
        if (SENTRY_DSN) {
            Sentry.enableInExpoDevelopment = true;
            Sentry.config(SENTRY_DSN).install();
        }
    },
    captureException: (err) => Sentry.captureException(err),
    captureMessage: (mess, obj) => Sentry.captureMessage(mess, obj),
    setUserContext: (obj) => Sentry.setUserContext(obj)
}

const mySentryTest = {
    init: () => { },
    captureException: () => { },
    captureMessage: () => { },
    setUserContext: () => { }
}

const mySentry = ENV !== 'TEST' ? mySentryNonTest : mySentryTest;

export default mySentry;
