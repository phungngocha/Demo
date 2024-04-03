import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === 'ha' && password === '123') {
      navigation.navigate('Home');
    } else {
      alert('nhập hoặc mật khẩu không đúng.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={require('../screens/img/backgroud2.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome</Text>

        {/* Container cho Tên đăng nhập */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên đăng nhập:</Text>
          <TextInput
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
        </View>

        {/* Container cho Mật khẩu */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Mật khẩu"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color="gray"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Đăng nhập" onPress={handleLogin} style={styles.button} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Đăng ký" onPress={handleRegister} style={styles.button} />
        </View>
      </View>
    </ImageBackground>
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
  inputContainer: {
    width: '80%',
    marginBottom: 20,
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  button: {
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderBottomWidth: 0.3, // Thêm đường viền dưới
    paddingBottom: 10,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
});

export default LoginScreen;
