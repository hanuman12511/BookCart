// import React, {Component} from 'react';
// import {View, FlatList, StyleSheet} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import SafeAreaView from 'react-native-safe-area-view';

// // Components
// import Header from 'components/HeaderComponent';
// import Footer from 'components/FooterComponent';
// import AllCategoryList from 'components/AllCategoryList';

// // Images
// import churi from 'assets/images/churi.webp';
// import sarso_khal from 'assets/images/sarso_khal.webp';
// import pashu_aahar from 'assets/images/pashu_aahar.webp';
// import makka from 'assets/images/makka.webp';
// import binola_khal from 'assets/images/binola_khal.webp';
// import binola from 'assets/images/binola.webp';

// export default class AllCategory extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       foodProducts: [
//         {
//           itemImage: churi,
//           title: 'बिनोला खली',
//         },
//         {
//           itemImage: sarso_khal,
//           title: 'मोटा काकड़ा',
//         },
//         {
//           itemImage: pashu_aahar,
//           title: 'चार्डी काकड़ा',
//         },
//         {
//           itemImage: makka,
//           title: 'रेगुलर पशु आहार',
//         },
//         {
//           itemImage: binola_khal,
//           title: 'मंगलम पशु आहार',
//         },
//         {
//           itemImage: binola,
//           title: 'डलिंटर काकड़ा',
//         },
//         {
//           itemImage: binola,
//           title: 'मक्का दलिया',
//         },
//         {
//           itemImage: binola,
//           title: 'गेहू दलिया',
//         },
//         {
//           itemImage: binola,
//           title: 'गेहू चापड़',
//         },
//         {
//           itemImage: binola,
//           title: 'मूँग खंडा',
//         },
//         {
//           itemImage: binola,
//           title: 'काकड़ा तेल',
//         },
//         {
//           itemImage: binola,
//           title: 'सरसों खल',
//         },
//       ],
//     };
//   }

//   renderItem = ({item}) => (
//     <AllCategoryList item={item} nav={this.props.navigation} />
//   );

//   keyExtractor = (item, index) => index.toString();

//   itemSeparator = () => <View style={styles.separator} />;

//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Header
//           title="Category"
//           nav={this.props.navigation}
//           showNotificationIcon
//           showCartIcon
//         />

//         <View style={styles.allCategoryContainer}>
//           <FlatList
//             data={this.state.foodProducts}
//             renderItem={this.renderItem}
//             keyExtractor={this.keyExtractor}
//             showsVerticalScrollIndicator={false}
//             ItemSeparatorComponent={this.itemSeparator}
//             contentContainerStyle={styles.listContainer}
//           />
//         </View>
//         <Footer nav={this.props.navigation} />
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f1f1',
//   },
//   allCategoryContainer: {
//     flex: 1,
//   },
//   separator: {
//     height: wp(2),
//   },
//   listContainer: {
//     padding: wp(2),
//   },
// });
