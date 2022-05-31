import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  RefreshControl,
  BackHandler,
  ScrollView,
} from 'react-native';
// import {ScrollView} from 'react-native-virtualized-view';
//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Libraries
import {SliderBox} from 'react-native-image-slider-box';
import SafeAreaView from 'react-native-safe-area-view';
// Permissions
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

//notification service
import notification from 'firebase_api';

// Styles
import basicStyles from 'styles/BasicStyles';

// Icons
import ic_search_black from 'assets/icons/ic_search_black.png';

//components
import Header from 'components/HeaderComponent';
import Footer from 'components/FooterComponent';
import HomeTile from 'components/HomeTileComponent';
//Redux
import {connect} from 'react-redux';
import {homeOperations, homeSelectors} from 'data/redux/home';
import {cartOperations, cartSelectors} from 'data/redux/cart';
// loadsh
import get from 'loadsh/get';

// api
import {makeRequest} from 'api/ApiInfo';
import {KEYS, getData} from 'api/UserPreference';
import ProcessingLoader from 'components/ProcessingLoader';
import clear from 'react-native-clear-cache-lcm';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: true,
      isListRefreshing: false,
      images: [],
      formatted_address: '',
      details: '',
      foodProducts: [],
      foodProducts2: [],
      searchText: '',
    };

    this.notif = new notification(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );

    this.checkLocationPermission = this.checkLocationPermission.bind(this);
    clear.runClearCache(() => {
      // console.log('data clear');
    });
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('focus', async () => {
      this.checkLocationPermission();
      this.homeData();
    });
    this.notif.checkPermission(this.handlePerm.bind(this));
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }
  // 'didFocus'
  UNSAFE_componentWillMount = async () => {};

  componentWillUnmount() {
    this._subscribe;
    this.backHandler.remove();
  }

  backAction = () => {
    Alert.alert('रुको!', 'क्या आप वाकई वापस जाना चाहते हैं?', [
      {
        text: 'वापस लेना',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'हां', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.checkLocationPermission();
      this.homeData();
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   **********************************************************
   ********   start project  Location Check Permission    ***
   **********************************************************
   */

  checkLocationPermission = async () => {
    try {
      const platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      });

      const result = await check(platformPermission);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          // this.isLocationPermissionBlocked = true;
          Alert.alert(
            'Location Services Not Available',
            'Press OK, then check and enable the Location Services in your Privacy Settings',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: this.handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
          break;
        case RESULTS.DENIED:
          // console.log(
          //   'The permission has not been requested / is denied but requestable',
          // );
          const requestResult = await request(platformPermission);
          switch (requestResult) {
            case RESULTS.GRANTED:
              this.fetchCurrentPosition();
          }
          break;
        case RESULTS.GRANTED:
          // console.log("The permission is granted");
          this.fetchCurrentPosition();
          break;
        case RESULTS.BLOCKED:
          // this.isLocationPermissionBlocked = true;
          // console.log('The permission is denied and not requestable anymore');
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide "Location" permission in App Setting',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: this.handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch (error) {
      console.log('Unable to open App Settings:', error);
    }
  };

  fetchCurrentPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      showLocationDialog: true,
      forceRequestLocation: true,
    };

    Geolocation.getCurrentPosition(
      this.geolocationSuccessCallback,
      this.geolocationErrorCallback,
      options,
    );
  };

  geolocationSuccessCallback = async position => {
    try {
      // starting loader
      this.setState({isProcessing: true});

      // preparing info
      const API_KEY = 'AIzaSyBb3j8Aiv60CadZ_wJS_5wg2KBO6081a_k';
      this.coords = position.coords;
      const {latitude, longitude} = this.coords;

      // calling api
      const response = await makeRequest(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
      );

      // processing response
      if (response) {
        const {status} = response;

        if (status === 'OK') {
          const {results} = response;
          // filtering addresses result(taking first address only)
          const filteredResult = results[7];
          const currentLocationAddress = filteredResult.formatted_address;
          this.setState({
            formatted_address: currentLocationAddress,
            isProcessing: false,
          });
        } else {
          this.setState({
            formatted_address: null,
            isProcessing: false,
          });
        }
      } else {
        this.setState({
          isProcessing: false,
          isLoading: false,
        });
        // console.log('Network Request Error...');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  geolocationErrorCallback = error => {
    if (
      error.code === 2 &&
      error.message === 'No location provider available.'
    ) {
      Alert.alert(
        '',
        "Make sure your device's Location/GPS is ON",
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      console.log(error.code, error.message);

      Alert.alert(
        'Error',
        "Something went wrong...\nMake sure your device's Location/GPS is ON",
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  };
  /**
   *****************************************************
   ********   start project  Search Handle...........***
   *****************************************************
   */

  handleSearch = searchText => {
    this.setState({searchText});

    const searchTextLength = searchText.length;
    const foodProducts = this.state.foodProducts2;
    // console.log(searchTextLength, searchText);

    if (searchTextLength === 0 || searchTextLength >= 5) {
      const filteredData = this.state.foodProducts.filter(item => {
        const searchPattern = searchText;

        // const searchPattern = searchText;

        const {name} = item;

        let data = name;
        let found = data.indexOf(searchPattern) > -1;
        // console.log('found', found, searchPattern);

        let {selected} = item;
        selected = false;

        if (!found) {
          const {name} = item;
          data = name;
          found = data.indexOf(searchText) > -1;
        }
        return found;
      });
      // console.log('food product', this.state.foodProducts);
      this.setState({foodProducts: filteredData});
    }
    if (searchTextLength === 0) {
      this.setState({foodProducts: foodProducts});
    }
  };

  /**
   ************************************************
   ********   start project  Home data get      ***
   ************************************************
   */

  homeData = async () => {
    try {
      const userInfo = await getData(KEYS.USER_INFO);
      console.log(
        '\n***********\n*\n*\nuserInfo key\n**********\n*\n*\n*\n*\n',
        userInfo,
        '\n**************************************\n',
      );
      if (userInfo !== null) {
        const {id} = userInfo;

        var params = {userId: id};
      } else {
        var params = null;
        console.log(
          '\n************* else part userInfo key**************\n',
          userInfo,
          '\n**************************************\n',
        );
      }
      /**
       *
       *
       *
       *
       */
      await this.props.getHome(params);
      const {success} = this.props.isGetHome;
      if (success) {
        const {sliders, product, details} = this.props.isGetHome;
        const {cartItemCount} = details;
        await this.props.cartUpdate(cartItemCount);
        this.setState({
          details,
          images: sliders,
          foodProducts: product,
          foodProducts2: product,
          isProcessing: false,
          isListRefreshing: false,
        });
      } else {
        this.setState({
          images: [],
          foodProducts: [],
          isProcessing: false,
          isListRefreshing: false,
        });
      }
    } catch (error) {
      console.log('error while load data', error);
    }
  };

  /**
   ***********************************************************************
   ********   start project  RenderHeader Components SliderBox         ***
   ***********************************************************************
   */

  renderHeaderComponent = () => {
    let image = [];
    let nImage = [];
    const {images} = this.state;

    console.log(
      '*************home page images slide*******\n',
      this.state,
      '\n*****************************************',
    );
    if (images !== undefined) {
      images.forEach(img => {
        image.push(Object.values(img));
      });
      image.forEach(ig => {
        ig.map(val => {
          nImage.push(val);
        });
      });
    }

    return (
      <>
        {images ? (
          <View style={styles.sliderContainer}>
            <SliderBox
              images={nImage}
              sliderBoxHeight={200}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              //   paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
              paginationBoxStyle={styles.boxStyles}
              dotStyle={styles.dotStyles}
              ImageComponentStyle={styles.imageStyles}
              imageLoadingColor="#2196F3"
            />
          </View>
        ) : (
          <View style={styles.sliderContainer}></View>
        )}
      </>
    );
  };

  /**
   **********************************************************
   ********   start project  Get Handle Category          ***
   **********************************************************
   */

  handleGetCategory = value => {
    const item = value;
    this.props.nav.navigate('Product Detail', {item});
  };

  /**
   **************************************************
   ********   start project  RenderItem           ***
   **************************************************
   */

  renderItem = ({item}) => {
    return (
      <>
        <HomeTile
          item={item}
          nav={this.props.navigation.navigate}
          fetchCartCount={this.fetchCartCount}
          handleCategory={this.handleGetCategory}
        />
      </>
    );
  };

  /**
   *************************************************************
   ********   start project  RenderList  Components          ***
   *************************************************************
   */

  renderListComponent = () => {
    return (
      <View style={[basicStyles.mainContainer, styles.flatContainer]}>
        <Text style={styles.heading}>केटेगरी</Text>
        <FlatList
          data={this.state.foodProducts}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          numColumns="3"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.itemSeparator}
          contentContainerStyle={styles.listContainer}
          refreshing={this.state.isListRefreshing}
          onRefresh={this.handleListRefresh.bind(this)}
        />
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;
  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    // console.log(notif.title, notif.message);
  }

  handlePerm(perms) {
    // console.log('Permissions', JSON.stringify(perms));
  }

  /**
   ******************************************************
   ********   start project  Render CLass Part        ***
   ******************************************************
   */

  render() {
    const {details} = this.state;
    const {userNotificationCountStatus, userNotificationCount} = details;

    return (
      <SafeAreaView style={[styles.container]}>
        <Header
          nav={this.props.navigation}
          showLocationPicker
          showNotificationIcon
          showCartIcon
          location={this.state.formatted_address}
          notificationCount={userNotificationCount}
        />
        <ScrollView
          contentContainerStyle={[
            basicStyles.mainContainer,
            styles.homeContainer,
          ]}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.isListRefreshing}
          //     onRefresh={this.handleListRefresh.bind(this)}
          //   />
          // }
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="खोज करे"
              placeholderTextColor="#ccc"
              style={styles.searchBar}
              onChangeText={value => this.handleSearch(value)}
              value={this.state.searchText}
            />
            <TouchableOpacity>
              <Image
                source={ic_search_black}
                resizeMode="cover"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>

          {this.renderHeaderComponent()}
          {this.renderListComponent()}
        </ScrollView>
        <Footer nav={this.props.navigation} />
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetHome: homeSelectors.isGetHome(state),
  isCartCount: cartSelectors.isCartCount(state),
});

const mapDispatchToProps = {
  getHome: homeOperations.getHome,
  cartUpdate: cartOperations.cartUpdate,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b8457',
  },
  homeContainer: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: wp(8),
    paddingTop: wp(3),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc4',
    paddingHorizontal: wp(3),
    borderRadius: 4,
    marginBottom: wp(3),
    marginHorizontal: wp(3),
  },
  searchBar: {
    height: hp(5.5),
    fontSize: wp(3.5),
    flex: 1,
    color: '#333',
  },
  searchIcon: {
    height: wp(5),
    aspectRatio: 1 / 1,
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
  flatContainer: {
    paddingHorizontal: wp(1.5),
    paddingVertical: wp(3),
  },
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: wp(4.5),
    fontWeight: '700',
    padding: wp(1.5),
  },
  sContainer: {
    width: wp(94),
    flexDirection: 'row',
  },
  slider: {
    width: '100%',
    aspectRatio: 1.93 / 1,
    borderRadius: wp(3),
  },
});
