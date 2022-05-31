import React, {useEffect, useReducer, useMemo, useRef, createRef} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {enableScreens} from 'react-native-screens';
import get from 'loadsh/get';
//* Context Api's

import {
  TOKEN,
  SIGN_IN,
  SIGN_OUT,
  USER_DATA,
  ONLINE_STATUS,
  PROFILE_STATUS,
  RESTORE_TOKEN,
  USER_ROLE,
  COMPLETE_PROFILE,
  COMPLETE_PROFILE_STATUS,
  FIRST_TIME_USER,
} from 'context_api/constant';

import {AppContext} from 'context_api/context';

//* AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// Splash Screen
import Splash from 'screens/SplashScreen';
//navigation without the navigation props
import {topLevelNavigator} from './NavigationService';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Screens
import NotificationScreen from 'screens/NotificationScreen';
import OfferScreen from 'screens/OfferScreen/OfferScreen';
import ContactUsScreen from 'screens/ContactUsScreen/ContactUsScreen';
import ReferScreen from 'screens/ReferScreen/ReferScreen';
import PrivacyPolicies from 'screens/PrivacyPolicies';
import TermsCondition from 'screens/TermsCondition';
import CancelRefund from 'screens/CancelRefund';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();
import {DrawerContent} from 'routes/DrawerComponent';

function AuthStackScreen(userData, userIntro, completeProfileStatus) {
  // console.log(
  //   'userData,userIntro==>>',
  //   userData,
  //   userIntro,
  //   completeProfileStatus,
  // );
  if (userData === 'true') {
    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="LoggedIn" component={LoggedIn} />
        <Drawer.Screen name="Notification" component={NotificationScreen} />
        <Drawer.Screen name="Offer" component={OfferScreen} />
        <Drawer.Screen name="Refer your Friends" component={ReferScreen} />
        <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
        <Drawer.Screen name="PrivacyPolicies" component={PrivacyPolicies} />
        <Drawer.Screen name="TermsCondition" component={TermsCondition} />
        <Drawer.Screen name="CancelRefund" component={CancelRefund} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        mode="modal"
        detachInactiveScreens={true}>
        <RootStack.Screen name="LoggedOut" component={LoggedOut} />
      </RootStack.Navigator>
    );
  }
}

const NavContainer = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case RESTORE_TOKEN:
          //  console.log('restor');
          return {
            ...prevState,
            userToken: action.userData.token,
            userIntro: action.userData.intro,
            completeProfileStatus: action.userData.completeProfileStatus,
            isLoading: false,
          };

        case SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userIntro: action.userData.intro,
            userToken: action.userData.token,
            completeProfileStatus: action.userData.completeProfileStatus,
          };
        case SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            userToken: false,
            userIntro: action.intro,
            completeProfileStatus: false,
          };
        case COMPLETE_PROFILE:
          return {
            ...prevState,
            isSignout: true,
            userToken: false,
            userIntro: action.userData.intro,
            completeProfileStatus: action.userData.completeProfileStatus,
          };
      }
    },

    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userIntro: null,
      completeProfileStatus: null,
    },
  );
  // console.log('userData info ==0==', state);

  const authContext = useMemo(() => {
    return {
      signIn: async () => {
        let userInfo;
        try {
          userInfo = {
            token: await AsyncStorage.getItem(TOKEN),
            intro: await AsyncStorage.getItem(FIRST_TIME_USER),
            completeProfileStatus: await AsyncStorage.getItem(
              COMPLETE_PROFILE_STATUS,
            ),
          };
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: SIGN_IN, userData: userInfo});
      },

      signOut: async () => {
        let userInfo;
        try {
          userInfo = await AsyncStorage.getItem(FIRST_TIME_USER);
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: SIGN_OUT, intro: userInfo});
      },

      completeProfile: async () => {
        let userInfo;
        try {
          userInfo = {
            intro: await AsyncStorage.getItem(FIRST_TIME_USER),
            completeProfileStatus: await AsyncStorage.getItem(
              COMPLETE_PROFILE_STATUS,
            ),
          };
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: COMPLETE_PROFILE, userData: userInfo});
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      state.isLoading;
      bootstrapAsync();
    }, 3000);

    const bootstrapAsync = async () => {
      let userInfo;
      try {
        userInfo = {
          token: await AsyncStorage.getItem(TOKEN),
          intro: await AsyncStorage.getItem(FIRST_TIME_USER),
          completeProfileStatus: await AsyncStorage.getItem(
            COMPLETE_PROFILE_STATUS,
          ),
        };
        // console.log('userinfo(routes.js)', userInfo);
      } catch (e) {
        console.log('error in useEffect ', e);
      }
      dispatch({type: RESTORE_TOKEN, userData: userInfo});
    };
  });
  /**
   *
   *
   *
   *
   *
   *
   */

  if (state.isLoading) {
    return <Splash />;
  }
  /**
   *
   *
   *
   *
   *
   *
   *
   */

  var userData = state.userToken;

  //console.log('{routes.js} state info  hanauuu====>', state);
  return (
    <AppContext.Provider value={authContext}>
      <NavigationContainer ref={topLevelNavigator}>
        {AuthStackScreen(
          userData,
          state.userIntro,
          state.completeProfileStatus,
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
};
export default NavContainer;
