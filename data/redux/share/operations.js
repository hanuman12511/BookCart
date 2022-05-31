import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';
import {nsNavigate} from 'routes/NavigationService';
const handleTokenExpire = async () => {
  await clearData();
  nsNavigate('Login');
};

export const shareToUser = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/inviteFriend',
      params,
      true,
      false,
    );
    console.log('share to user', response);
    if (response) {
      dispatch(actions.shareToUser(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
