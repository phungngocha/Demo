// PaymentScreen.js
import React , {useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet ,
   Image, TouchableOpacity, SafeAreaView, StatusBar,
    TextInput,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import books from '../component/BookData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

function PaymentScreen ({ route })  {

  const navigation = useNavigation();

  // const goBackToDetailScreen = () => {
  //   navigation.navigate('Detail'); // Điều hướng về màn hình chi tiết
  // };

  const { book } = route.params;
  const [ cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const [reviews, setReviews] = useState([
    // Mảng chứa các đánh giá và bình luận mẫu, bạn có thể thay thế nó bằng dữ liệu thực từ nguồn dữ liệu của bạn
    { id: 1, rating: 4, comment: 'Sách rất hay!', username: 'Người Dùng 1' },
    { id: 2, rating: 5, comment: 'Tuyệt vời, tôi thích nó!', username: 'Người Dùng 2' },
    // ...
  ]);


  useEffect(() => {
    updateCartIcon();
  }, [cart]);

  const updateCartIcon = () => {
    if (cart.length > 0) {
      // Sử dụng navigation để truy cập vào màn hình giỏ hàng và cập nhật badge
      navigation.setOptions({
        tabBarBadge: cart.length,
      });
    }
  };

    
    const updateQuantity = (value) => {
      // Cập nhật số lượng khi slider thay đổi giá trị
      setQuantity(value);
      // Cập nhật số lượng sách trong giỏ hàng
      const updatedCart = cart.map(item => (
        item.id === book.id ? { ...item, quantity: Math.max(Math.round(value), 1) } : item
      ));
      setCart(updatedCart);
    };

    const increaseQuantity = () => {
      const newQuantity = Math.min(quantity + 1, 10); // Giới hạn số lượng tối đa là 10 (hoặc giảm điều kiện nếu muốn)
      setQuantity(newQuantity);
      // Cập nhật số lượng sách trong giỏ hàng và tính toán lại tổng tiền
      const updatedCart = cart.map(item => (
        item.id === book.id ? { ...item, quantity: newQuantity } : item
      ));
      setCart(updatedCart);
    };

    const decreaseQuantity = () => {
      const newQuantity = Math.max(quantity - 1, 1); // Giữ số lượng không dưới 1
    setQuantity(newQuantity);
    // Cập nhật số lượng sách trong giỏ hàng và tính toán lại tổng tiền
    const updatedCart = cart.map(item => (
      item.id === book.id ? { ...item, quantity: newQuantity } : item
    ));
    setCart(updatedCart);
    };
  


    // // Hàm tính tổng tiền
    // const calculateTotal = () => {
    //   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    // };
   // Hàm tính tổng tiền ban đầu
   const calculateInitialTotal = () => {
  
    return book.price * quantity; // Số tiền ban đầu là giá của quyển sách nhân với số lượng
  };
  
   
  const confirmPayment = async () => {
    const updatedCart = [...cart, { ...book, quantity: quantity }];

    try {
      // Lưu giỏ hàng đã cập nhật vào AsyncStorage
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Lỗi khi lưu giỏ hàng vào AsyncStorage:', error);
    }

    setCart(updatedCart);

    // Chuyển đến màn hình giỏ hàng và truyền thông tin sách
    navigation.navigate('cart', {
      cartItems: updatedCart,
      bookDetails: { ...book, quantity: quantity },
      total: calculateInitialTotal(),
    });
  };
    
    const handleGoBack = () => {
      // Quay lại trang trước đó
      navigation.goBack();
    };

  
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>ĐƠN HÀNG</Text>
            <View style={styles.bookContainer}>
              <Image source={book.image} style={styles.bookImage} />
              <View style={styles.bookInfo}>
                <Text>Tên Sách: {book.title}</Text>
                <Text>Giá: {book.price}</Text>
                <Text>Tác giả: {book.author}</Text>
              </View>
            </View>
            <View style={styles.quantityContainer}>
              <Text>Số Lượng: {Math.round(quantity)}</Text>
            </View>
            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text>Tổng Tiền: {calculateInitialTotal()}</Text>
  
            {/* Đánh giá và bình luận */}
            <View style={styles.ratingContainer}>
              <Text>Đánh Giá:</Text>
              <TextInput
                style={styles.ratingInput}
                keyboardType="numeric"
                value={rating.toString()}
                onChangeText={(value) => setRating(value)}
              />
            </View>
  
            <View style={styles.commentsContainer}>
              <Text>Bình Luận:</Text>
              <TextInput
                style={styles.commentsInput}
                multiline
                numberOfLines={4}
                value={comments}
                onChangeText={(text) => setComments(text)}
              />
            </View>
  
           
            <Button title="Thêm Vào Giỏ Hàng" onPress={confirmPayment} />
           
            {/* Hiển thị đánh giá và bình luận của người khác */}
          <FlatList
           style={styles.reviewList}
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <Text style={styles.username}>
                <FontAwesomeIcon icon={faUser} size={16} color="black" />
                <Text> {item.username}</Text>
                </Text>
                <View style={styles.ratingCommentContainer}>
                <Text style={styles.rating}>
                <Text>Đánh giá:</Text>
                {Array.from({ length: item.rating }, (_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} size={16} color="gold" />
          ))}
                  </Text>
                <Text style={styles.comment}>Bình Luận: {item.comment}</Text>
              </View>
              </View>
            )}
          />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
        const styles = StyleSheet.create({
          safeArea: {
            flex: 1,
            paddingTop: StatusBar.currentHeight,
          },

          container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 20,
          },
          goBackButton: {
            position: 'absolute',
            top: 0,
            left: 15,
            backgroundColor: 'gray',
            padding: 3,
            borderRadius: 8,
            zIndex: 1, // Để nút quay lại nằm trên hình ảnh
          },
          
          bookContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            borderBottomWidth: 1, // Thêm đường viền dưới
            paddingBottom: 10, // Khoảng cách dưới
          },
          headerText: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 30,
            marginTop: -20,
          },
          bookImage: {
            width: 80,
            height: 120,
            resizeMode: 'cover',
            marginRight: 10,
          },
          bookInfo: {
            flex: 1,
          },
          addButton: {
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          },
          removeButton: {
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 5,
          },
          quantityContainer: {
            backgroundColor: 'lightblue',
           padding: 10,
           borderRadius: 5,
           marginBottom: 10,
          },
         
        
          quantityButton: {
            backgroundColor: 'lightblue',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          },
          buttonText: {
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
          },
           // Styles cho đánh giá và bình luận
  ratingContainer: {
    marginBottom: 10,
  },
  ratingInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    width: 200,
  },

  commentsContainer: {
    marginBottom: 10,
  },
  commentsInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    width: 200,
  },
   // Styles cho hiển thị đánh giá và bình luận của người khác
   reviewList: {
    width: '100%', // Sử dụng chiều rộng 100%
  },
   reviewItem: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
  
  username: {
    flexDirection: 'row', // Để sắp xếp người dùng và biểu tượng vào cùng một hàng
    alignItems: 'center', // Căn giữa theo chiều dọc
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    marginBottom: 5,
  },
  comment: {
   flex: 1,
  },
});

export default PaymentScreen;
