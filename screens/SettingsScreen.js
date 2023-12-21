// SettingsScreen.js
import React, {useState}  from 'react';
import { View, Switch, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function SettingsScreen() {

  const navigation = useNavigation();
  const [isVietnamese, setIsVietnamese] = useState(true); // Trạng thái của công tắc ngôn ngữ

  // Hàm xử lý khi công tắc ngôn ngữ thay đổi
  const toggleLanguage = () => {
    setIsVietnamese(!isVietnamese);
  };
    const handleLogout = () => {
      // Điều hướng về màn hình đăng nhập khi nhấn nút "Đăng Xuất"
      navigation.navigate('Login'); // 'Login' là tên màn hình đăng nhập trong Stack Navigation của bạn
   

  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài Đặt</Text>
      <View style={styles.settingItem}>
        <Text>Ngôn Ngữ: {isVietnamese ? 'Tiếng Việt' : 'Tiếng Anh'}</Text>
        <Switch value={isVietnamese} onValueChange={toggleLanguage} />
      </View>
      {/* Chức năng Hotline */}
      <TouchableOpacity style={styles.settingItem}>
      <Text style={styles.settingLabel}>Hotline:</Text>
        <Text style={styles.settingValue}>0123 456 789</Text>
      </TouchableOpacity>
      {/* Chức năng Lịch sử mua hàng */}
      <TouchableOpacity style={styles.settingItem}>
      <Text style={styles.settingLabel}>Lịch Sử Mua Hàng</Text>
      </TouchableOpacity>
      {/* Chức năng Chính sách bảo mật */}
     <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.navigate('chinhsach')}
      >
      <Text style={styles.settingLabel}>Chính Sách Bảo Mật</Text>
      </TouchableOpacity>

      {/* Chức năng Chính sách đổi trả */}
      <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.navigate('chinhsachdoitra')}
      >
      <Text style={styles.settingLabel}>Chính Sách Đổi Trả</Text>
      </TouchableOpacity>
      {/* Chức năng Câu hỏi thường gặp */}
      <TouchableOpacity style={styles.settingItem}>
      <Text style={styles.settingLabel}>Câu Hỏi Thường Gặp</Text>
      </TouchableOpacity>
      {/* Chức năng Thông tin ứng dụng */}
      <TouchableOpacity style={styles.settingItem}>
      <Text style={styles.settingLabel}>Thông Tin Ứng Dụng</Text>
      </TouchableOpacity>
      {/* Chức năng Đăng xuất */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingValue: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
