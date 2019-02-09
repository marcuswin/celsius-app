import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';
import { resetTests, containsText, resetNonKycUser, callToComplete, waitForExists } from "../helpers";
import API from "../../app/constants/API";


const { dispatch } = store;

export default {
	testFailed
}

export function testFailed(spec) {
  return async () => {
    await resetTests(spec);
    await spec.exists('SignupTwo.screen')
  }
}