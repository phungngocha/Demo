import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Kiểm tra các điều kiện đăng ký (chẳng hạn kiểm tra tính hợp lệ của tên đăng nhập và mật khẩu)
    if (username && password && password === confirmPassword) {
    
    } else {
      // Xử lý lỗi đăng ký
      alert('Thông tin  không hợp lệ.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đăng ký tài khoản</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên đăng nhập:</Text>
          <TextInput
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu:</Text>
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Xác nhận mật khẩu:</Text>
          <TextInput
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            style={styles.input}
          />
        </View>
      </View>
      <Button title="Đăng ký" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
  },
  formContainer: {
    width: '80%', // Kích thước container có thể điều chỉnh tùy thuộc vào yêu cầu của bạn
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
  },
  input: {
    borderWidth: 0.3,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default RegisterScreen;
