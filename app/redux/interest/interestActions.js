// import ACTIONS from '../../constants/ACTIONS';
// import API from '../../constants/API';
// import interestService from '../../services/interest-service';
// import { showMessage } from "../ui/uiActions";
// import { apiError, startApiCall } from "../api/apiActions";

export {
  // getInterestChartData,
}


// /**
//  * Gets graph data for interest
//  */
// function getInterestChartData(interval) {
//   return async dispatch => {
//     dispatch(startApiCall(API.GET_INTEREST_CHART_DATA));
//     try {
//       const res = await interestService.getInterestChartData(interval);
//       const chartData = res.data;
//       dispatch(getInterestChartDataSuccess(chartData));
//     } catch (err) {
//       dispatch(showMessage('error', err.msg));
//       dispatch(apiError(API.GET_INTEREST_CHART_DATA, err));
//     }
//   }
// }
//
//
// /**
//  * TODO add JSDoc
//  */
// function getInterestChartDataSuccess(chartData) {
//   return {
//     type: ACTIONS.GET_INTEREST_CHART_DATA_SUCCESS,
//     callName: API.GET_INTEREST_CHART_DATA,
//     chartData,
//   }
// }
