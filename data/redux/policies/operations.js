import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';
import {nsNavigate} from 'routes/NavigationService';
const handleTokenExpire = async () => {
  await clearData();
  nsNavigate('Login');
};

export const privacyPolicy = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/privacyPolicy',
      params,
    );
    if (response) {
      dispatch(actions.privacyPolicy(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const termsCondition = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/termsAndConditions',
      params,
    );
    if (response) {
      dispatch(actions.termsCondition(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const cancelRefund = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/contactUs',
      params,
    );
    if (response) {
      dispatch(actions.cancelRefund(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
