import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Styles
import basicStyles from 'styles/BasicStyles';

// Icons
import ic_left from 'assets/icons/ic_left.png';
import ic_menu from 'assets/icons/ic_menu.png';
import ic_notification from 'assets/icons/ic_notification.png';
import ic_cart from 'assets/icons/ic_cart.png';
import ic_location from 'assets/icons/ic_location.png';

// get Data
import {KEYS, getData} from 'api/UserPreference';
// redux
import {connect} from 'react-redux';
import {cartOperations, cartSelectors} from 'data/redux/cart';

const HeaderComponent = props => {
  const [usrInfo, setUsrInfo] = useState([]);
  const {
    navAction,
    showLocationPicker,
    location,
    showNotificationIcon,
    showCartIcon,
    notificationCount,
  } = props;
  console.log(props.nav);
  useEffect(() => {
    info();
    return () => {};
  }, []);
  const info = async () => {
    const info = await getData(KEYS.USER_INFO);
    setUsrInfo(info);
  };
  const toggleDrawer = () => {
    props.nav.openDrawer();
  };

  // header icon configuration
  let navIcon = ic_menu;
  let handleNavAction = toggleDrawer;

  if (navAction === 'back') {
    navIcon = ic_left;
  }

  const handleNotification = () => {
    props.nav.navigate('Notification');
  };

  const handleCart = async () => {
    await props.nav.reset({
      index: 0,
      routes: [{name: 'Cart'}],
    });
    await props.nav.navigate('Cart');
    // props.nav.replace('Cart');
  };

  const showNotificationBadge = notificationCount > 0;
  const isNotificationCountTwoDigit = notificationCount < 100;
  const showCartBadge = props.isCartCount > 0;
  const isCartCountTwoDigit = props.isCartCount < 100;
  const cart_Count = props.isCartCount;

  return showLocationPicker ? (
    <View style={styles.headerContainer}>
      <View style={styles.menuPart}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={navAction === 'back' ? props.nav.goBack() : handleNavAction}>
          <Image source={navIcon} resizeMode="cover" style={styles.menuIcon} />
        </TouchableHighlight>
        <View style={basicStyles.flexOne}>
          {/* <Text style={styles.headerTitle}>{props.title}</Text> */}
          <TouchableOpacity style={styles.locationContainer}>
            <Image
              source={ic_location}
              resizeMode="cover"
              style={styles.mapIcon}
            />
            <Text style={styles.location}>{location}</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.headerTitle}>{props.title}</Text> */}

        {/* <Image source={logo_white} resizeMode="cover" style={styles.logoStyle} /> */}

        {showNotificationIcon && (
          <TouchableOpacity
            style={styles.notificationIconContainer}
            onPress={handleNotification}>
            <Image
              source={ic_notification}
              resizeMode="cover"
              style={styles.notificationIcon}
            />

            {showNotificationBadge && (
              <View style={styles.notificationBadgeContainer}>
                {isNotificationCountTwoDigit ? (
                  <Text style={styles.notificationBadge}>
                    {notificationCount}
                  </Text>
                ) : (
                  <Text style={styles.notificationBadge}>99+</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        )}

        {showCartIcon && usrInfo !== null ? (
          <TouchableOpacity
            style={styles.notificationIconContainer}
            onPress={handleCart}>
            <Image
              source={ic_cart}
              resizeMode="cover"
              style={styles.notificationIcon}
            />

            {showCartBadge && (
              <View style={styles.notificationBadgeContainer}>
                {isCartCountTwoDigit ? (
                  <Text style={styles.notificationBadge}>{cart_Count}</Text>
                ) : (
                  <Text style={styles.notificationBadge}>99+</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  ) : (
    <View style={styles.headerContainer}>
      <View style={styles.menuPart}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={handleNavAction}>
          <Image source={navIcon} resizeMode="cover" style={styles.menuIcon} />
        </TouchableHighlight>
        <View style={basicStyles.flexOne}>
          <Text style={styles.headerTitle}>{props.title}</Text>
          {/* <TouchableOpacity style={styles.locationContainer}>
            <Image
              source={ic_location}
              resizeMode="cover"
              style={styles.mapIcon}
            />
            <Text style={styles.location}>Jaipur Rajasthan</Text>
          </TouchableOpacity> */}
        </View>
        {/* <Text style={styles.headerTitle}>{props.title}</Text> */}

        {/* <Image source={logo_white} resizeMode="cover" style={styles.logoStyle} /> */}

        {showNotificationIcon && (
          <TouchableOpacity
            style={styles.notificationIconContainer}
            onPress={handleNotification}>
            <Image
              source={ic_notification}
              resizeMode="cover"
              style={styles.notificationIcon}
            />

            {showNotificationBadge && (
              <View style={styles.notificationBadgeContainer}>
                {isNotificationCountTwoDigit ? (
                  <Text style={styles.notificationBadge}>
                    {notificationCount}
                  </Text>
                ) : (
                  <Text style={styles.notificationBadge}>99+</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        )}

        {showCartIcon && usrInfo !== null ? (
          <TouchableOpacity
            style={styles.notificationIconContainer}
            onPress={handleCart}>
            <Image
              source={ic_cart}
              resizeMode="cover"
              style={styles.notificationIcon}
            />

            {showCartBadge && (
              <View style={styles.notificationBadgeContainer}>
                {isCartCountTwoDigit ? (
                  <Text style={styles.notificationBadge}>{cart_Count}</Text>
                ) : (
                  <Text style={styles.notificationBadge}>99+</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  isCartCount: cartSelectors.isCartCount(state),
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

const styles = StyleSheet.create({
  headerContainer: {
    height: hp(7),
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    borderBottomColor: '#f2f1f1',
    borderBottomWidth: 4,
  },
  menuPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    height: hp(3),
    aspectRatio: 1 / 1,
    marginHorizontal: wp(2),
  },
  logoStyle: {
    aspectRatio: 2 / 1,
    width: hp(12),
    alignSelf: 'center',
  },

  notificationIconContainer: {
    paddingLeft: wp(4),
    paddingRight: wp(2),
  },

  notificationIcon: {
    height: hp(3),
    aspectRatio: 1 / 1,
  },
  notificationBadgeContainer: {
    width: wp(4),
    aspectRatio: 1 / 1,
    backgroundColor: 'red',
    borderRadius: wp(1.7),
    justifyContent: 'center',
    alignItems: 'center',
    top: wp(0),
    position: 'absolute',
    right: wp(0),
  },
  notificationBadge: {
    color: '#fff',
    fontSize: wp(2.2),
    textAlign: 'center',
  },
  // headerTitle: {
  //   fontSize: wp(3.5),
  //   fontWeight: '700',
  //   marginLeft: wp(2),
  // },
  headerTitle: {
    fontSize: wp(4),
    fontWeight: '700',
    marginLeft: wp(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(4),
  },
  mapIcon: {
    width: wp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  location: {
    fontSize: wp(3.8),
    flex: 1,
  },
});
