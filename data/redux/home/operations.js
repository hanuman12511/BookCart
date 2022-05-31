import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';
import {nsNavigate} from 'routes/NavigationService';
const handleTokenExpire = async () => {
  await clearData();
  nsNavigate('Login');
};

export const getHome = params => async dispatch => {
  try {
    const response = await makeRequest(BASE_URL + 'api/mobile/home', params);
    if (response) {
      dispatch(actions.getHome(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};

export const getNotification = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Customer/official',
      params,
      true,
      false,
    );

    if (response) {
      const {success} = response;
      if (success) {
        const {output} = response;
        dispatch(actions.getNotification(output));
      } else {
        const {isAuthTokenExpired} = response;
        if (isAuthTokenExpired === true) {
          Alert.alert(
            'GouriBrand',
            'Your Session Has Been Expired \n Login Again to Continue!',
            [
              {
                text: 'OK',
              },
            ],
            {
              cancelable: false,
            },
          );
          handleTokenExpire();
          return;
        }

        dispatch(actions.error(response));
      }
    }
  } catch (e) {
    dispatch(actions.error(e));
  }
};
