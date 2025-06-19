import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const UserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'User Details',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const finalStep = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!firstName || !lastName || !email || !phoneNo) {
      return Alert.alert('Invalid Details', 'Please fill out all fields');
    }

    if (!emailRegex.test(email)) {
      return Alert.alert('Invalid Email', 'Please enter a valid email address');
    }

    if (!phoneRegex.test(phoneNo)) {
      return Alert.alert('Invalid Phone Number', 'Phone number must be 10 digits');
    }

    navigation.navigate('Confirm', {
      oldPrice: route.params.oldPrice,
      newPrice: route.params.newPrice,
      name: route.params.name,
      children: route.params.children,
      adults: route.params.adults,
      rating: route.params.rating,
      startDate: route.params.startDate,
      endDate: route.params.endDate,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f7f7f7' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="Enter first name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Enter last name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter phone number"
          keyboardType="numeric"
          maxLength={10}
          value={phoneNo}
          onChangeText={setPhoneNo}
          style={styles.input}
        />
      </ScrollView>

      <Pressable style={styles.footer}>
        <View>
          <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>
              Rs {route.params.oldPrice * route.params.adults}
            </Text>
            <Text style={styles.newPrice}>
              Rs {route.params.newPrice * route.params.adults}
            </Text>
          </View>
          <Text style={styles.savingText}>
            You saved {route.params.oldPrice - route.params.newPrice} rupees
          </Text>
        </View>
        <Pressable onPress={finalStep} style={styles.button}>
          <Text style={styles.buttonText}>Final Step</Text>
        </Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
  footer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  oldPrice: {
    color: 'red',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 18,
    fontWeight: '600',
  },
  savingText: {
    fontSize: 14,
    color: '#007f5f',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007FFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
