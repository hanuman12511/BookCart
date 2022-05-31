import React, {Component} from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KEYS, getData} from 'api/UserPreference';
// Icons
import ic_home_white from 'assets/icons/ic_home_white.png';
import ic_wallet_white from 'assets/icons/ic_wallet_white.png';
import ic_offer_white from 'assets/icons/ic_order_white.png';

class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleHome = async () => {
    const userInfo = await getData(KEYS.USER_INFO);
    if (userInfo !== null) {
      this.props.nav.navigate('Home');
    } else {
      this.props.nav.navigate('Home');
    }
  };
  handleCategory = async () => {
    const userInfo = await getData(KEYS.USER_INFO);
    if (userInfo !== null) {
      this.props.nav.navigate('Wallet');
    } else {
      Alert.alert('', 'आप ऐप में लॉगइन नहीं हैं, कृपया लॉगइन करें');
    }
  };
  handleMyOrder = async () => {
    const userInfo = await getData(KEYS.USER_INFO);
    if (userInfo !== null) {
      this.props.nav.navigate('My Order');
    } else {
      Alert.alert('', 'आप ऐप में लॉगइन नहीं हैं, कृपया लॉगइन करें');
    }
  };

  render() {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton} onPress={this.handleHome}>
          <Image
            source={ic_home_white}
            resizeMode="cover"
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={this.handleCategory}>
          <Image
            source={ic_wallet_white}
            resizeMode="cover"
            style={styles.footerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={this.handleMyOrder}>
          <Image
            source={ic_offer_white}
            resizeMode="cover"
            style={styles.footerIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FooterComponent;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#0b8457',
    height: hp(7),
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerIcon: {
    height: wp(6),
    aspectRatio: 1 / 1,
  },
});
