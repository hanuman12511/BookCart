import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_menu from 'assets/icons/ic_menu.png';
import ic_notification from 'assets/icons/ic_notification.png';
import ic_cart from 'assets/icons/ic_cart.png';
import ic_location from 'assets/icons/ic_location.png';

// Styles
import basicStyles from 'styles/BasicStyles';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDrawer = () => {
    this.props.nav.openDrawer();
  };
  handleCart = () => {
    this.props.nav.navigate('Cart');
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={this.handleDrawer}>
          <Image source={ic_menu} resizeMode="cover" style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={basicStyles.flexOne}>
          <Text style={styles.headerTitle}>Gaouri Brand Club</Text>
          <TouchableOpacity style={styles.locationContainer}>
            <Image
              source={ic_location}
              resizeMode="cover"
              style={styles.mapIcon}
            />
            <Text style={styles.location}>Jaipur Rajasthan</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleCart}>
          <Image
            source={ic_cart}
            resizeMode="cover"
            style={[styles.menuIcon, basicStyles.marginRight]}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={ic_notification}
            resizeMode="cover"
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default HeaderComponent;

// define your styles
const styles = StyleSheet.create({
  headerContainer: {
    height: hp(7),
    // justifyContent: 'center',
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc8',
  },
  menuIcon: {
    height: wp(6),
    aspectRatio: 1 / 1,
  },
  headerTitle: {
    fontSize: wp(4),
    fontWeight: '700',
    marginLeft: wp(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(4),
    marginTop: wp(1),
  },
  mapIcon: {
    width: wp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  location: {
    fontSize: wp(3),
    flex: 1,
  },
});
