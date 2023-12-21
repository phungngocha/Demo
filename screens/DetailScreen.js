import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import books from '../component/BookData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
function DetailScreen({ route }) {
  const { book } = route.params;
  const navigation = useNavigation();

  const handleBuyNow = () => {
    // Chuyển hướng đến trang thanh toán và truyền thông tin sách
    navigation.navigate('Payment', { book });
  };
  
  const handleGoBack = () => {
    // Quay lại trang trước đó
    navigation.goBack();
  };
  const addToCart = () => {
    navigation.navigate('Payment', { book, cart });
  };
  const confirmAddToCart = () => {
    // Thực hiện xác nhận và thêm sách vào giỏ hàng
  
    // Sau khi thêm sách vào giỏ hàng, chuyển hướng về HomeScreen
    navigation.navigate('Home', {
      addedToCart: true,
      bookDetails: {
        title: book.title,
        author: book.author,
        price: book.price,
        quantity: quantity,
      },
      cart: updatedCart, // Đảm bảo truyền giỏ hàng vào đây
    });
  };
  

  return (
    <ScrollView style={styles.container}>
        {/* Nút quay lại */}
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
      </TouchableOpacity>
        <Image source={book.image} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.bookCode}>{book.code}</Text>
      <Text style={styles.bookAuthor}>Tác giả: {book.author}</Text>
      <Text style={styles.bookCategory}>Thể loại: {book.category}</Text>
      <Text style={styles.bookYear}>Năm xuất bản: {book.year}</Text>
      <Text style={styles.bookPrice}>Giá:{book.price}</Text>
      <Text style={styles.bookDescription}>Tóm tắt:{book.description}</Text>
     {/* Hiển thị thông tin sách */}
     <Button title="Mua Ngay" onPress={handleBuyNow} />
     
    </ScrollView>
  );

  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  goBackButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 8,
    zIndex: 1, // Để nút quay lại nằm trên hình ảnh
  },
  bookImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  bookInfo: {
    fontSize: 18,
    marginTop: 8,
  },
  bookDescription: {
    fontSize: 18,
    marginTop: 8,
  },
  bookPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'green', // Màu sắc giá bán
  },
  bookAuthor:{
    fontSize: 20,
    marginTop: 8,
  },
  bookYear:{
    fontSize: 20,
    marginTop: 8,
  },
  bookCategory : {
    fontSize: 20,
    marginTop: 8,
  },
});

export default DetailScreen;
