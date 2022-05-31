import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SubCategory = props => {
  const handleDetail = () => {
    props.nav.navigate('Product Detail');
  };
  return (
    <TouchableHighlight
      style={styles.subCategoryTile}
      onPress={handleDetail}
      underlayColor="#ffffff80">
      <View style={styles.subCategoryTileContainer}>
        <Image
          source={props.item.itemImage}
          resizeMode="cover"
          style={styles.productImage}
        />

        <Text style={styles.title}>{props.item.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default SubCategory;

const styles = StyleSheet.create({
  subCategoryTile: {
    width: '33.33%',
  },
  subCategoryTileContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: wp(2),
    alignItems: 'center',
    marginHorizontal: wp(1),
  },
  productImage: {
    height: hp(6),
    aspectRatio: 1.44 / 1,
  },
  title: {
    fontSize: wp(3.2),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp(0.5),
  },
  offer: {
    fontSize: wp(2.5),
    textAlign: 'center',
    color: '#2bb256',
  },
});
