import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images

import ic_right from 'assets/icons/ic_right.png';
import basicStyles from 'styles/BasicStyles';

class HomeTileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.tileContainer}>
        <Image
          source={this.props.item.itemImage}
          resizeMode="cover"
          style={styles.productImage}
        />
        <View
          style={[
            basicStyles.directionRow,
            basicStyles.alignCenter,
            // basicStyles.justifyCenter,
            basicStyles.flexOne,
          ]}>
          <View style={styles.design} />
          <Text style={styles.title}>{this.props.item.title}</Text>
        </View>
        <Image
          source={ic_right}
          resizeMode="cover"
          style={styles.productIcon}
        />
      </TouchableOpacity>
    );
  }
}

export default HomeTileComponent;

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: '#0b845710',
    // width: wp(94),
    // margin: wp(1.5),
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    borderRadius: wp(0),
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: wp(16),
    aspectRatio: 1.44 / 1,
    marginRight: wp(3),
  },
  productIcon: {
    width: wp(3),
    aspectRatio: 1 / 1,
    marginLeft: wp(2),
  },
  design: {
    backgroundColor: '#0b8457',
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: wp(2),
  },
  title: {
    fontSize: wp(4),
    fontWeight: '700',
  },
});
