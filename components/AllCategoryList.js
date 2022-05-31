import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_down from 'assets/icons/ic_down.png';

// Images
import churi from 'assets/images/churi.webp';
import sarso_khal from 'assets/images/sarso_khal.webp';
import pashu_aahar from 'assets/images/pashu_aahar.webp';
import makka from 'assets/images/makka.webp';
import binola_khal from 'assets/images/binola_khal.webp';
import binola from 'assets/images/binola.webp';

// Components
import SubCategoryComponent from 'components/SubCategoryComponent';

// Styles
import basicStyles from 'styles/BasicStyles';

export default class AllCategoryList extends PureComponent {
  constructor(props) {
    super(props);

    const {item} = this.props;
    const {subCategories} = item;

    this.state = {
      subCategories,
      showSubCategories: false,
      subProducts: [
        {
          itemImage: churi,
          title: 'बिनोला खली',
        },
        {
          itemImage: sarso_khal,
          title: 'मोटा काकड़ा',
        },
        {
          itemImage: pashu_aahar,
          title: 'चार्डी काकड़ा',
        },
        {
          itemImage: makka,
          title: 'रेगुलर पशु आहार',
        },
        {
          itemImage: binola_khal,
          title: 'मंगलम पशु आहार',
        },
        {
          itemImage: binola,
          title: 'डलिंटर काकड़ा',
        },
        {
          itemImage: binola,
          title: 'मक्का दलिया',
        },
        {
          itemImage: binola,
          title: 'गेहू दलिया',
        },
        {
          itemImage: binola,
          title: 'गेहू चापड़',
        },
        {
          itemImage: binola,
          title: 'मूँग खंडा',
        },
        {
          itemImage: binola,
          title: 'काकड़ा तेल',
        },
        {
          itemImage: binola,
          title: 'सरसों खल',
        },
      ],
    };
  }

  handleShowSubCategory = () => {
    this.setState(prevState => ({
      showSubCategories: !prevState.showSubCategories,
    }));
  };

  renderItem = ({item}) => (
    <SubCategoryComponent item={item} nav={this.props.nav} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {subCategories, showSubCategories} = this.state;
    const {item} = this.props;

    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          underlayColor="#ffffff80"
          onPress={this.handleShowSubCategory}>
          <View style={styles.listContainer}>
            <Image
              source={this.props.item.itemImage}
              resizeMode="cover"
              style={styles.listImage}
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
              source={ic_down}
              resizeMode="cover"
              style={styles.listDownIcon}
            />
          </View>
        </TouchableHighlight>

        {showSubCategories && (
          <View style={styles.subCategoryContainer}>
            <FlatList
              data={this.state.subProducts}
              numColumns="3"
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.itemSeparator}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
  },
  listContainer: {
    flexDirection: 'row',
    padding: wp(3),
    alignItems: 'center',
  },
  offerTag: {
    backgroundColor: '#15b400',
    height: wp(8),
    width: wp(8),
    borderRadius: wp(4),
    position: 'absolute',
    top: wp(3),
    left: wp(17),
    zIndex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerTagText: {
    fontSize: wp(2.5),
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  listImage: {
    width: wp(14),
    aspectRatio: 1.44 / 1,
    marginRight: wp(3),
  },
  description: {
    flex: 1,
    marginRight: wp(3),
  },
  listTitle: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  listDescription: {
    fontSize: wp(3),
  },
  listDownIcon: {
    width: wp(4),
    aspectRatio: 1 / 1,
  },
  subCategoryContainer: {
    paddingVertical: wp(2),
    paddingHorizontal: wp(1),
    backgroundColor: '#f2f1f1',
    margin: wp(2),
  },
  separator: {
    height: wp(2),
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
