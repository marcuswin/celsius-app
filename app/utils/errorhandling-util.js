import loggerUtil from "./logger-util";

/* eslint-disable */
const defaultErrorHandler = ErrorUtils.getGlobalHandler()
const myErrorHandler = (e, isFatal) => {
    loggerUtil.err(e, isFatal);
    defaultErrorHandler(e, isFatal);
}
ErrorUtils.setGlobalHandler(myErrorHandler);
/* eslint-enable */

export default (err) => loggerUtil.err(err);