import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

// ✅ Make sure the path is correct based on your file structure
import { auth, db } from '../firebase';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const register = () => {
    if (!email || !password || !phone) {
      Alert.alert('Invalid Details', 'Please enter all the credentials');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        const uid = user.uid;

        return setDoc(doc(db, 'users', uid), {
          email: user.email,
          phone: phone,
        });
      })
      .then(() => {
        Alert.alert('Success', 'Account created successfully!');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Registration Error:', error.message);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Create an Account</Text>
        </View>

        <View style={styles.inputSection}>
          <InputField
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            secure
          />
          <InputField
            label="Phone"
            value={phone}
            onChange={setPhone}
            placeholder="Enter your phone number"
          />
        </View>

        <Pressable style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

        <Pressable style={styles.footer} onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  secure = false,
}) => (
  <View style={{ marginTop: 15 }}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="black"
      secureTextEntry={secure}
      style={styles.input}
    />
  </View>
);

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    color: '#003580',
    fontSize: 17,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '500',
  },
  inputSection: {
    marginTop: 50,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  input: {
    fontSize: 18,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  button: {
    width: 200,
    backgroundColor: '#003580',
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 17,
  },
});
