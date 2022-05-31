import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
import Header from 'components/HeaderComponent';
import NotificationListComponent from 'components/NotificationListComponent';
import CustomLoader from 'components/CustomLoader';
//api
import {connect} from 'react-redux';
import {appOperations, appSelectors} from 'data/redux/app';
// loadsh
import get from 'loadsh/get';
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isListRefreshing: false,
      notifications: '',
      message: '',
    };
  }

  componentDidMount() {
    const navRedirect = get(this.props, 'navigation.addListener');
    this._subscribe = navRedirect('focus', async () => {
      this.handleNotifications();
    });
  }
  componentWillUnmount() {
    this._subscribe;
  }

  handleNotifications = async () => {
    const params = null;
    await this.props.getNotification(params).then(async () => {
      const {success, message} = this.props.isNotificationGet;

      if (success) {
        const {notifications} = this.props.isNotificationGet;

        this.setState({
          notifications,
          isListRefreshing: false,
          isLoading: false,
        });
        await this.props.resetCount(params);
      } else {
        this.setState({notifications: '', message});
      }
    });
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.handleNotifications();
    } catch (error) {
      console.log(error.message);
    }
  };
  renderItem = ({item}) => <NotificationListComponent item={item} />;

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    if (this.state.isLoading) {
      <CustomLoader />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <Header
          nav={this.props.navigation}
          title="नोटिफिकेशन"
          //   showLocationPicker
          showNotificationIcon
          showCartIcon
        />
        {this.state.notifications !== '' ? (
          <FlatList
            data={this.state.notifications}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            refreshing={this.state.isListRefreshing}
            onRefresh={this.handleListRefresh}
          />
        ) : (
          <View style={styles.errMsg}>
            <Text style={styles.errTxt}>{this.state.message}</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isNotificationGet: appSelectors.isNotificationGet(state),
  isNotificationReset: appSelectors.isNotificationReset(state),
});
const mapDispatchToProps = {
  getNotification: appOperations.getNotification,
  resetCount: appOperations.resetCount,
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff1',
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: wp(4),
    textAlign: 'center',
  },
  errMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errTxt: {
    fontWeight: '700',
  },
});
