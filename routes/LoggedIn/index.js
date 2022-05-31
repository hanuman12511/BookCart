import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Login Screens
// import LoginScreen from '../screens/LoginScreen';
// import OTPScreen from '../screens/OTPScreen';
import {DrawerContent} from 'routes/DrawerComponent';
// Icons
import ic_home_black from 'assets/icons/ic_home_black.png';
import ic_category_black from 'assets/icons/ic_category_black.png';
import ic_order from 'assets/icons/ic_order.png';
import ic_cart from 'assets/icons/ic_cart.png';
import ic_wallet from 'assets/icons/ic_wallet.png';
import ic_notification from 'assets/icons/ic_notification.png';
import ic_user from 'assets/icons/ic_user.png';
import ic_offer from 'assets/icons/ic_offer.png';
import ic_contactUs from 'assets/icons/ic_contactUs.png';
import ic_refer_drawer from 'assets/icons/ic_refer_drawer.png';
import ic_faq_drawer from 'assets/icons/ic_faq_drawer.png';
import ic_login_drawer from 'assets/icons/ic_login_drawer.png';
import refund from 'assets/images/refund.png';
import report from 'assets/images/report.png';
import terms from 'assets/images/terms-and-conditions.png';

// Home Screens
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import CartScreen from 'screens/CartScreen/CartScreen';
import SelectSlotScreen from 'screens/SelectSlotScreen/SelectSlotScreen';
// import CategoryScreen from 'screens/CategoryScreen';
import ProductDetailScreen from 'screens/ProductDetailScreen/ProductDetailScreen';
import MyAddressScreen from 'screens/MyAddressScreen';
import AddAddressScreen from 'screens/AddAddressScreen/AddAddressScreen';
import PaymentScreen from 'screens/PaymentScreen/PaymentScreen';
import MyOrderScreen from 'screens/MyOrderScreen';
import OrderDetailScreen from 'screens/OrderDetailScreen/OrderDetailScreen';
import WalletScreen from 'screens/WalletScreen/WalletScreen';
import RechargeWalletScreen from 'screens/RechargeWalletScreen';
import NotificationScreen from 'screens/NotificationScreen';
import OfferScreen from 'screens/OfferScreen/OfferScreen';
import MyProfileScreen from 'screens/MyProfileScreen/MyProfileScreen';
import EditProfileScreen from 'screens/EditProfileScreen';
import LoginScreen from 'screens/LoginScreen/LoginScreen';
import SignUpScreen from 'screens/SignUpScreen/SignUpScreen';
import OTPScreen from 'screens/OTPScreen/OTPScreen';
import ContactUsScreen from 'screens/ContactUsScreen/ContactUsScreen';
import ReferScreen from 'screens/ReferScreen/ReferScreen';
import FAQScreen from 'screens/FAQScreen/FAQScreen';
import FAQQuestionsScreen from 'screens/FAQQuestionsScreen';
import FAQAnsScreen from 'screens/FAQAnsScreen/FAQAnsScreen';
import {nsNavigate} from '../NavigationService';

//Policies
import PrivacyPolicies from 'screens/PrivacyPolicies';
import TermsCondition from 'screens/TermsCondition';
import CancelRefund from 'screens/CancelRefund';

// // Profile Screen
// import ProfileScreen from 'screens/ProfileScreen';
// import EditProfileScreen from 'screens/EditProfileScreen';

const Drawer = createDrawerNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const FAQNStack = createStackNavigator();
const CartStack = createStackNavigator();
const MyOrderStack = createStackNavigator();
const WalletStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const LoggedIn = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="Home"
      detachPreviousScreen={true}
      options={{
        detachPreviousScreen: true,
      }}>
      <LoginStack.Screen
        name="Home"
        component={HomeNavigator}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="FAQ"
        component={FAQNavigator}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="Cart"
        component={CartNavigator}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="My Order"
        component={MyOrderNavigator}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="Wallet"
        component={WalletNavigator}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="My Profile"
        component={ProfileNavigator}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="Select Slot"
        component={SelectSlotScreen}
        detachPreviousScreen={true}
        options={{
          title: 'समय चुने',
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
          // headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="My Address"
        component={MyAddressScreen}
        detachPreviousScreen={true}
        options={{
          title: 'मेरा पता',
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
          // headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="Add Address"
        component={AddAddressScreen}
        detachPreviousScreen={true}
        options={{
          title: 'पता जोड़ें',
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
        }}
      />
      <LoginStack.Screen
        name="Payment Options"
        component={PaymentScreen}
        detachPreviousScreen={true}
        options={{
          title: 'भुगतान के तरीके',
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
        }}
      />
    </LoginStack.Navigator>
  );
};
// Style Sheet
const styles = StyleSheet.create({
  drawerIcon: {
    height: hp(2.5),
    width: hp(2.5),
    marginRight: wp(-5),
    // aspectRatio: 1 / 1,
  },
  drawerContentContainer: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#0077a2',
    alignItems: 'center',
    padding: wp(2),
  },
  headerLogo: {
    height: wp(15),
    aspectRatio: 2 / 1,
  },

  drawerLabel: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#424242',
    marginLeft: wp(5),
  },
});

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" detachPreviousScreen={true}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
        }}
      />
      <HomeStack.Screen
        name="Product Detail"
        component={ProductDetailScreen}
        // initialParams={{userData}}
        options={{
          title: 'उत्पाद विवरण',
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const FAQNavigator = () => {
  return (
    <FAQNStack.Navigator initialRouteName="FAQ" detachPreviousScreen={true}>
      <FAQNStack.Screen
        name="FAQ"
        component={FAQScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <FAQNStack.Screen
        name="FAQ Questions"
        component={FAQQuestionsScreen}
        // initialParams={{userData}}
        options={{
          title: 'सामान्य प्रश्न',
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
        }}
      />
      <FAQNStack.Screen
        name="FAQ Answer"
        component={FAQAnsScreen}
        // initialParams={{userData}}
        options={{
          title: 'सामान्य उत्तर',
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
        }}
      />
    </FAQNStack.Navigator>
  );
};
const CartNavigator = () => {
  return (
    <CartStack.Navigator
      initialRouteName="Cart"
      detachPreviousScreen={true}
      options={{
        detachPreviousScreen: true,
      }}>
      <CartStack.Screen
        name="Cart"
        component={CartScreen}
        detachPreviousScreen={true}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
    </CartStack.Navigator>
  );
};
const MyOrderNavigator = () => {
  return (
    <MyOrderStack.Navigator
      initialRouteName="My Order"
      detachPreviousScreen={true}>
      <MyOrderStack.Screen
        name="My Order"
        component={MyOrderScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <MyOrderStack.Screen
        name="Order Detail"
        component={OrderDetailScreen}
        // initialParams={{userData}}
        options={{
          title: 'उत्पाद विवरण',
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
          // headerShown: false,
        }}
      />
    </MyOrderStack.Navigator>
  );
};
const WalletNavigator = () => {
  return (
    <WalletStack.Navigator
      initialRouteName="Wallet"
      detachPreviousScreen={true}>
      <WalletStack.Screen
        name="Wallet"
        component={WalletScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <WalletStack.Screen
        name="Recharge Wallet"
        component={RechargeWalletScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
          // headerShown: false,
        }}
      />
    </WalletStack.Navigator>
  );
};
const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="My Profile"
      detachPreviousScreen={true}>
      {/* <ProfileStack.Screen
        name="My Profile"
        component={MyProfileScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      /> */}
      <ProfileStack.Screen
        name="My Profile"
        component={EditProfileScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 4,
            borderBottomColor: '#e6f2ee',
          },
          headerTitleStyle: {
            fontSize: wp(4),
            marginLeft: wp(-5),
          },
          // headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};
export default LoggedIn;
