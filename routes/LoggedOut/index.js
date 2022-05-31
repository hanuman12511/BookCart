import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ic_notification from 'assets/icons/ic_notification.png';
import ic_offer from 'assets/icons/ic_offer.png';
import ic_contactUs from 'assets/icons/ic_contactUs.png';
import ic_refer_drawer from 'assets/icons/ic_refer_drawer.png';
import ic_faq_drawer from 'assets/icons/ic_faq_drawer.png';
import ic_login_drawer from 'assets/icons/ic_login_drawer.png';
import refund from 'assets/images/refund.png';
import report from 'assets/images/report.png';
import terms from 'assets/images/terms-and-conditions.png';
import ic_home_black from 'assets/icons/ic_home_black.png';

// Home Screens
import LoginScreen from 'screens/LoginScreen/LoginScreen';
import SignUpScreen from 'screens/SignUpScreen/SignUpScreen';
import OTPScreen from 'screens/OTPScreen/OTPScreen';
import ContactUsScreen from 'screens/ContactUsScreen/ContactUsScreen';
import ReferScreen from 'screens/ReferScreen/ReferScreen';
import FAQScreen from 'screens/FAQScreen/FAQScreen';
import FAQQuestionsScreen from 'screens/FAQQuestionsScreen';
import FAQAnsScreen from 'screens/FAQAnsScreen/FAQAnsScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import ProductDetailScreen from 'screens/ProductDetailScreen/ProductDetailScreen';
import NotificationScreen from 'screens/NotificationScreen';
import OfferScreen from 'screens/OfferScreen/OfferScreen';

//Policies
import PrivacyPolicies from 'screens/PrivacyPolicies';
import TermsCondition from 'screens/TermsCondition';
import CancelRefund from 'screens/CancelRefund';

//Navigation
const SetLogoutDrawer = createDrawerNavigator();
const SetHome = createStackNavigator();
const SetFAQ = createStackNavigator();
const SetLogin = createStackNavigator();

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

const SetHomeNavigator = () => {
  return (
    <SetHome.Navigator initialRouteName="HomeScreen">
      <SetHome.Screen
        name="Home"
        component={HomeScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <SetHome.Screen
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
    </SetHome.Navigator>
  );
};

const SetFAQNavigator = () => {
  return (
    <SetFAQ.Navigator initialRouteName="FAQ">
      <SetFAQ.Screen
        name="FAQ"
        component={FAQScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <SetFAQ.Screen
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
      <SetFAQ.Screen
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
    </SetFAQ.Navigator>
  );
};

const SetLoginNavigator = () => {
  return (
    <SetLogin.Navigator initialRouteName="Login">
      <SetLogin.Screen
        name="Login"
        component={LoginScreen}
        // initialParams={{userData}}
        options={{
          headerBackTitle: null,
          headerShown: false,
        }}
      />
      <SetLogin.Screen
        name="OTP"
        component={OTPScreen}
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
          headerShown: false,
        }}
      />
      <SetLogin.Screen
        name="Sign Up"
        component={SignUpScreen}
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
          headerShown: false,
        }}
      />
    </SetLogin.Navigator>
  );
};

/**
 *************************************************
 ********   start project navigation...........***
 ********    start SetHomeNavigator            ***
 *************************************************
 */
const LoggedOut = () => {
  return (
    <SetLogoutDrawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#fff',
        width: 240,
      }}
      backBehavior="history"
      drawerContentOptions={{
        activeTintColor: 'green',

        // inactiveTintColor: 'white',
        // itemStyle: {alignItems: 'flex-end'},
      }}>
      <SetLogoutDrawer.Screen
        name="Home"
        component={SetHomeNavigator}
        options={{
          title: 'मुख्य पृष्ठ',
          drawerIcon: ({focused, size}) => (
            <Image
              source={ic_home_black}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />

      <SetLogoutDrawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'नोटिफिकेशन',
          drawerIcon: ({focused, size}) => (
            <Image
              source={ic_notification}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />

      <SetLogoutDrawer.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          title: 'ऑफर्स',
          drawerIcon: ({focused, size}) => (
            <Image
              source={ic_offer}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />

      <SetLogoutDrawer.Screen
        name="Refer your Friends"
        component={ReferScreen}
        options={{
          title: 'दोस्तों को भेजे',
          drawerIcon: ({focused, size}) => (
            <Image
              source={ic_refer_drawer}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />

      <SetLogoutDrawer.Screen
        name="FAQ"
        component={SetFAQNavigator}
        options={{
          title: 'सामान्य प्रश्न',
          drawerIcon: ({focused, size}) => (
            <Image
              source={ic_faq_drawer}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />

      <SetLogoutDrawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          title: 'सम्पर्क करे',
          drawerIcon: ({focused, size}) => (
            <Image
              source={ic_contactUs}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />

      <SetLogoutDrawer.Screen
        name="PrivacyPolicies"
        component={PrivacyPolicies}
        options={{
          title: 'गोपनीयता पालिसी',
          drawerIcon: ({focused, size}) => (
            <Image
              source={report}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />
      <SetLogoutDrawer.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{
          title: 'नियम एवं शर्तें ',
          drawerIcon: ({focused, size}) => (
            <Image
              source={terms}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />
      <SetLogoutDrawer.Screen
        name="CancelRefund"
        component={CancelRefund}
        options={{
          title: 'रद्दीकरण/धनवापसी नीति',
          drawerIcon: ({focused, size}) => (
            <Image
              source={refund}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />

      <SetLogoutDrawer.Screen
        name="Login"
        component={SetLoginNavigator}
        options={{
          title: 'लॉगिन करे',
          drawerIcon: ({focused, size}) => (
            <Image
              source={ic_login_drawer}
              resizeMode="cover"
              style={styles.drawerIcon}
            />
          ),
        }}
      />
    </SetLogoutDrawer.Navigator>
  );
};
export default LoggedOut;
