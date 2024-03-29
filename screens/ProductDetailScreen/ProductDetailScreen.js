//import liraries
import React, {Component, PureComponent} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

import SafeAreaView from 'react-native-safe-area-view';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Libraries
import {SliderBox} from 'react-native-image-slider-box';

// Styles
import basicStyles from 'styles/BasicStyles';

// Icons
import ic_cart from 'assets/icons/ic_cart_white.png';

//loadsh
import get from 'loadsh/get';

//components
import ProductTile from 'components/ProductTile';
import {KEYS, getData} from 'api/UserPreference';
// redux
import {connect} from 'react-redux';
import {cartOperations, cartSelectors} from 'data/redux/cart';

// create a component
class ProductDetailScreen extends PureComponent {
  constructor(props) {
    super(props);
    const prDta = get(props.route, 'params.item');
    console.log(props);
    this.state = {
      ...prDta,
      price: '',
      count: 1,
      increPrice: '',
      pId: '',
      slIndex: 0,
    };
  }

  renderItem = ({item}) => (
    <ProductTile
      item={item}
      nav={this.props.navigation}
      fetchCartCount={this.fetchCartCount}
    />
  );

  renderItem2 = ({item, index}) => {
    if (index === this.state.slIndex) {
      this.setState({
        price: item.price,
        increPrice: item.price,
        pId: item.id,
      });
    }

    const selSty = index === this.state.slIndex ? styles.unitSty : styles.unit;
    return (
      <TouchableOpacity onPress={() => this.handlePriceData(item, index)}>
        <Text style={selSty}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  handlePriceData = (item, index) => {
    this.setState({
      price: item.price,
      increPrice: item.price,
      pId: item.id,
      slIndex: index,
    });
  };
  handleDecrement = () => {
    const {count} = this.state;
    if (count <= 1) {
      this.setState({count: 1});
    } else {
      let unit = count - 1;
      this.setState({count: unit});
    }
  };
  handleIncrement = () => {
    const {count} = this.state;
    let unit = 1;
    unit = unit + count;
    this.setState({count: unit});
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleCart = async () => {
    const userInfo = await getData(KEYS.USER_INFO);
    if (userInfo !== null) {
      const params = {
        productId: this.state.id,
        quantity: this.state.count,
        addonId: this.state.pId,
      };
      await this.props.addToCart(params).then(async () => {
        const {success, message} = this.props.isItemAddSuccess;
        if (success) {
          const {cartItemCount} = this.props.isItemAddSuccess;
          await this.props.cartUpdate(cartItemCount);
          this.props.navigation.navigate('Cart');
          Alert.alert('', message);
        } else {
          Alert.alert('', message);
        }
      });
    } else {
      Alert.alert(
        '',
        'आप ऐप में लॉगइन नहीं हैं, कृपया लॉगइन करें',
        [
          {text: 'NO', style: 'cancel'},
          {text: 'LOGIN', onPress: this.handleLogin},
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  handleLogin = async () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container]}>
          <ScrollView>
            <View style={[basicStyles.mainContainer, styles.homeContainer]}>
              <View style={styles.productContainer}>
                <View style={styles.sliderContainer}>
                  <SliderBox
                    images={this.state.productImage}
                    sliderBoxHeight={200}
                    // onCurrentImagePressed={index =>
                    //   console.warn(`image ${index} pressed`)
                    // }
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    //   paginationBoxVerticalPadding={20}
                    autoplay
                    circleLoop
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                    underlayColor="transparent"
                    paginationBoxStyle={styles.boxStyles}
                    dotStyle={styles.dotStyles}
                    ImageComponentStyle={styles.imageStyles}
                    imageLoadingColor="#2196F3"
                  />
                </View>

                <View
                  style={[
                    basicStyles.directionRow,
                    basicStyles.alignCenter,
                    basicStyles.justifyCenter,
                    basicStyles.marginTop,
                  ]}>
                  <View style={styles.design} />
                  <Text style={styles.title}>{this.state.name}</Text>
                </View>
                {this.state.brandName !== '--' ? (
                  <View
                    style={[
                      basicStyles.directionRow,
                      basicStyles.justifyCenter,
                    ]}>
                    <Text style={styles.title}>({this.state.brandName})</Text>
                  </View>
                ) : null}

                <View
                  style={[basicStyles.directionRow, basicStyles.justifyCenter]}>
                  <Text style={styles.price}>
                    ₹ {this.state.increPrice * this.state.count}
                  </Text>
                  {/* <Text style={styles.oldPrice}>₹ 1379</Text> */}
                </View>

                {/* <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Select Variant"
                  placeholderTextColor="#333"
                  style={styles.searchBar}
                />
                <TouchableOpacity>
                  <Image
                    source={ic_down}
                    resizeMode="cover"
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
              </View> */}

                <View style={styles.quanContainer}>
                  <Text>मात्रा</Text>
                  <View style={styles.units}>
                    <TouchableOpacity onPress={this.handleDecrement}>
                      <Text style={styles.unitSign}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.unitQuantity}>{this.state.count}</Text>
                    <TouchableOpacity onPress={this.handleIncrement}>
                      <Text style={styles.unitSign}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.aboutProduct}>
                <Text style={styles.aboutProductHeading}>इकाई</Text>
                <FlatList
                  data={this.state.productAddons}
                  renderItem={this.renderItem2}
                  keyExtractor={this.keyExtractor}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={this.itemSeparator}
                  extraData={this.state.slIndex}
                  // contentContainerStyle={styles.listContainer}
                  //   refreshing={this.state.isListRefreshing}
                  //   onRefresh={this.handleListRefresh}
                />
              </View>

              <View style={styles.aboutProduct}>
                <Text style={styles.aboutProductHeading}>
                  उत्पाद के बारे में
                </Text>
                <Text style={styles.aboutProductPara}>
                  {this.state.description}
                </Text>
              </View>

              {/* <View style={[]}>
              <Text style={styles.heading}>Similar Products</Text>

              <FlatList
                data={this.state.foodProducts}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                //   numColumns="3"
                horizontal
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.itemSeparator}
                contentContainerStyle={styles.listContainer}
                //   refreshing={this.state.isListRefreshing}
                //   onRefresh={this.handleListRefresh}
              />
            </View> */}
            </View>
          </ScrollView>
          <View style={styles.addCart}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={this.handleCart}>
              <Text style={styles.cartText}>कार्ट में जोड़ें</Text>
              {/* <View style={styles.addCartIcon}> */}
              <Image
                source={ic_cart}
                resizeMode="cover"
                style={styles.cartIcon}
              />
              {/* </View> */}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isItemAddSuccess: cartSelectors.isItemAddSuccess(state),
  isCartCount: cartSelectors.isCartCount(state),
});

const mapDispatchToProps = {
  addToCart: cartOperations.addToCart,
  cartUpdate: cartOperations.cartUpdate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ee',
  },
  unit: {
    borderWidth: 1,
    borderColor: '#ccc8',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    marginRight: wp(2),
  },
  unitSty: {
    // borderColor: '#ccc8',
    backgroundColor: '#0b8457',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    marginRight: wp(2),
  },
  homeContainer: {
    backgroundColor: '#e6f2ee',
  },
  quanContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    paddingTop: wp(3),
  },
  aboutProduct: {
    backgroundColor: '#fff',
    padding: wp(3),
    margin: wp(3),
    marginBottom: wp(0),
    borderRadius: wp(4),
  },
  aboutProductHeading: {
    fontSize: wp(4),
    fontWeight: '700',
    marginBottom: wp(2),
  },
  aboutProductPara: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#777',
  },
  productContainer: {
    backgroundColor: '#fff',
    padding: wp(6),
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
    // alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    height: wp(30),
    aspectRatio: 1.44 / 1,
    alignSelf: 'center',
  },
  design: {
    backgroundColor: '#0b8457',
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: wp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: '700',
  },
  price: {
    fontSize: wp(4),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: wp(3),
  },
  oldPrice: {
    fontSize: wp(4),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: wp(3),
    color: '#999',
    marginLeft: wp(3),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc4',
    paddingHorizontal: wp(3),
    borderRadius: 4,
    marginBottom: wp(3),
    marginHorizontal: wp(3),
    marginTop: wp(3),
    width: wp(40),
    alignSelf: 'center',
  },
  searchBar: {
    height: hp(5.5),
    fontSize: wp(3.5),
    flex: 1,
    color: '#333',
  },
  searchIcon: {
    height: wp(4),
    aspectRatio: 1 / 1,
  },
  addCart: {
    backgroundColor: '#fff',
    padding: wp(4),
  },
  cartButton: {
    backgroundColor: '#0b8457',
    flexDirection: 'row',
    padding: wp(3.5),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    borderRadius: hp(8),
  },
  cartText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  addCartIcon: {
    backgroundColor: '#e6f2ee',
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    width: wp(6),
    aspectRatio: 1 / 1,
  },
  heading: {
    fontSize: wp(4.5),
    fontWeight: '700',
    paddingHorizontal: wp(3),
    marginTop: wp(3),
  },
  listContainer: {
    padding: wp(1.5),
  },
  headerContainer: {
    height: hp(7),
    // justifyContent: 'center',
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc8',
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
  sliderContainer: {
    alignItems: 'center',
    height: 200,
  },
  boxStyles: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // paddingVertical: 10,
  },
  dotStyles: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
  },
  imageStyles: {
    borderRadius: 15,
    width: '94%',
    // marginTop: 5,
    alignSelf: 'center',
  },
  units: {
    flexDirection: 'row',
  },
  unitSign: {
    height: wp(5),
    width: wp(5),
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    lineHeight: wp(5.2),
    fontSize: wp(3),
  },
  unitQuantity: {
    height: wp(5),
    width: wp(8),
    textAlign: 'center',
    lineHeight: wp(5.2),
    fontSize: wp(3),
  },
});
