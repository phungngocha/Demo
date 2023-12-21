// HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSliders, faMagnifyingGlass, faComment } from '@fortawesome/free-solid-svg-icons';
import books from '../component/BookData';
import AsyncStorage from '@react-native-async-storage/async-storage';


function HomeScreen({route}) {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [adImageIndex, setAdImageIndex] = useState(0);
  const [cart, setCart] = useState([]);
  

  const adImages = [
    require('../screens/img/quangcao1.jpg'),
    require('../screens/img/cach-marketing-hieu-qua-cho-cua-hang-sach.jpg'),
    require('../screens/img/sach_y_hoc_tac_gia_viet.jpg'),
  ];

 

  
  

  const { width } = Dimensions.get('window');
  const itemMargin = 20;
  const numColumns = 2;

  const itemWidth = (width - itemMargin * (numColumns + 1)) / numColumns;
  const itemHeight = itemWidth * 2;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.bookItem, { width: itemWidth, height: itemHeight }]}
      onPress={() => {
        navigation.navigate('Detail', { book: item , cart: cart });
      }}
    >
      <Image source={item.image} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookCategory}>{item.category}</Text>
      <Text style={styles. price}>{item. price}</Text>
    </TouchableOpacity>
  );
  
  

  
  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="   Nhập từ khóa tìm kiếm..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <FontAwesomeIcon icon={faSliders} size={24} color="black" style={styles.icon} />
        </View>
        {/* <TouchableOpacity>
          <FontAwesomeIcon icon={faComment} size={24} color="black" style={styles.icon} />
        </TouchableOpacity> */}
      </View>
      
    
      <View style={styles.adContainer}>
        <Image source={adImages[adImageIndex]} style={styles.adImage} />
      </View>
     
      <FlatList
        data={books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        numColumns={numColumns}
       
      />



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#BBBBBB',
  },
  
  bookItem: {
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  bookImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bookCategory: {
    fontSize: 14,
    marginTop: 8,
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    marginBottom: 16,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    height: 30,
    fontSize: 14,
    marginLeft: 8,
  },
  flatList: {
    flex: 1,
    padding: 16,
    
  },
  adContainer: {
    alignItems: 'center',
    position: 'relative',
    marginVertical: 16,
  },
  adImage: {
    width: 400,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  icon: {
    marginLeft: 8,
  },
  commentIcon: {
    marginLeft: 8,
  },
});

export default HomeScreen;
