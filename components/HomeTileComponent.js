import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import churi from 'assets/images/churi.webp';
import basicStyles from 'styles/BasicStyles';

class HomeTileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /*  handleSetCategory = () => {
    const {handleCategory, item} = this.props;

    handleCategory(item);
  }; */

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity
        style={styles.tileContainer}
        //onPress={this.handleSetCategory}
        onPress={() => this.props.nav('Product Detail', {item})}>
        <Image
          source={{uri: this.props.item.featuredImage}}
          resizeMode="cover"
          style={styles.productImage}
        />
        <View
          style={[
            basicStyles.directionColumn,
            basicStyles.alignCenter,
            basicStyles.justifyCenter,
          ]}>
          {/* <View style={styles.design} /> */}
          <Text style={styles.title}>{this.props.item.name}</Text>
          {this.props.item.brand ? (
            <Text style={styles.title}>({this.props.item.brandName})</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default HomeTileComponent;

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: '#0b845710',
    width: wp(29.33),
    margin: wp(1.5),
    paddingVertical: wp(4),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  productImage: {
    height: wp(16),
    aspectRatio: 1.44 / 1,
    marginBottom: wp(3),
  },
  design: {
    backgroundColor: '#0b8457',
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: wp(2),
  },
  title: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
});
