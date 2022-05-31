import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppContext} from 'context_api/context';
//* AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';
import {KEYS, getData, clearData} from 'api/UserPreference';
export function DrawerContent(props) {
  const [userInfo, setInfo] = useState('');
  const paperTheme = useTheme();
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const userInfo = await getData(KEYS.USER_INFO);
      console.log(userInfo);
      // ...
    }
    fetchData();
  }, [userInfo]);

  const {signOut} = useContext(AppContext);

  const handleLogout = async () => {
    await clearData();
    console.log(props);
    await signOut();
    await AsyncStorage.clear();
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_home_black}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="मुख्य पृष्ठ"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_order}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="माई आर्डर"
              onPress={() => {
                props.navigation.navigate('My Order');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_cart}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="कार्ट"
              onPress={() => {
                props.navigation.navigate('Cart');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_wallet}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="वॉलेट"
              onPress={() => {
                props.navigation.navigate('Wallet');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_notification}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="नोटिफिकेशन"
              onPress={() => {
                props.navigation.navigate('Notification');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_user}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="माई प्रोफाइल"
              onPress={() => {
                props.navigation.navigate('My Profile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_offer}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="ऑफर्स"
              onPress={() => {
                props.navigation.navigate('Offer');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_offer}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="दोस्तों को भेजे"
              onPress={() => {
                props.navigation.navigate('Refer your Friends');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_offer}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="सामान्य प्रश्न"
              onPress={() => {
                props.navigation.navigate('FAQ');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={ic_contactUs}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="सम्पर्क करे"
              onPress={() => {
                props.navigation.navigate('Contact Us');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={report}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="गोपनीयता पालिसी"
              onPress={() => {
                props.navigation.navigate('PrivacyPolicies');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={terms}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="नियम एवं शर्तें "
              onPress={() => {
                props.navigation.navigate('TermsCondition');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={refund}
                  resizeMode="cover"
                  style={styles.drawerIcon}
                />
              )}
              label="रद्दीकरण/धनवापसी नीति"
              onPress={() => {
                props.navigation.navigate('CancelRefund');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="लॉगआउट करे"
          onPress={() => {
            handleLogout();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
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
