import {StackActions} from '@react-navigation/native';
// RootNavigation.js

import * as React from 'react';

export const topLevelNavigator = React.createRef();

// navigate action
export const nsNavigate = (routeName, params = undefined) => {
  topLevelNavigator.current?.navigate(routeName, params);
};

// stack actions
export const nsPush = (...args) => {
  if (topLevelNavigator) {
    topLevelNavigator.current?.dispatch(StackActions.push(...args));
  }
};

export const nsPop = () => {
  if (topLevelNavigator) {
    const popAction = StackActions.pop(1);
    topLevelNavigator.dispatch(popAction);
  }
};
