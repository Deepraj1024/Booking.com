import React, { useLayoutEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  Modal,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import Header from '../components/Header';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeDateType, setActiveDateType] = useState(null);
  const [roomCount, setRoomCount] = useState(1);
  const [adultCount, setAdultCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  );

  const [modalVisible, setModalVisible] = useState(false);

  const selectedDates = {
    checkIn: checkInDate,
    checkOut: checkOutDate,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Booking.com',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#003588',
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 15 }}
        />
      ),
    });
  }, []);

  const searchPlaces = () => {
    const place = route?.params?.input;

    if (!place || !selectedDates.checkIn || !selectedDates.checkOut) {
      Alert.alert('Invalid Details', 'Please enter all the details');
      return;
    }

    navigation.navigate('Places', {
      rooms: roomCount,
      adults: adultCount,
      children: childrenCount,
      selectedDates: {
        checkIn: checkInDate.toDateString(),
        checkOut: checkOutDate.toDateString(),
      },
      place,
    });
  };

  const handleDateConfirm = selectedDate => {
    setIsDatePickerOpen(false);
    if (activeDateType === 'checkin') {
      setCheckInDate(selectedDate);
      if (selectedDate >= checkOutDate) {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        setCheckOutDate(nextDay);
      }
    } else if (activeDateType === 'checkout') {
      setCheckOutDate(selectedDate);
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Header />
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <Pressable
            style={styles.inputBox}
            onPress={() => navigation.navigate('Search')}
          >
            <Feather name="search" size={24} color="black" />
            <TextInput
              placeholder={
                route?.params ? route.params.input : 'Enter your Destination'
              }
              style={{ flex: 1, fontSize: 16 }}
              editable={false}
            />
          </Pressable>

          {/* Check-in Date */}
          <Pressable
            style={styles.inputBox}
            onPress={() => {
              setActiveDateType('checkin');
              setIsDatePickerOpen(true);
            }}
          >
            <Feather name="calendar" size={24} color="black" />
            <Text style={styles.dateText}>
              Check-in: {checkInDate.toDateString()}
            </Text>
          </Pressable>

          {/* Check-out Date */}
          <Pressable
            style={styles.inputBox}
            onPress={() => {
              setActiveDateType('checkout');
              setIsDatePickerOpen(true);
            }}
          >
            <Feather name="calendar" size={24} color="black" />
            <Text style={styles.dateText}>
              Check-out: {checkOutDate.toDateString()}
            </Text>
          </Pressable>

          <DatePicker
            modal
            open={isDatePickerOpen}
            date={activeDateType === 'checkout' ? checkOutDate : checkInDate}
            mode="date"
            minimumDate={
              activeDateType === 'checkout' ? checkInDate : new Date()
            }
            onConfirm={handleDateConfirm}
            onCancel={() => setIsDatePickerOpen(false)}
          />

          {/* Guests / Rooms */}
          <Pressable
            style={styles.inputBox}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={{ fontSize: 16, color: 'red' }}>
              {`${roomCount} room - ${adultCount} adults - ${childrenCount} children`}
            </Text>
          </Pressable>

          {/* Search Button */}
          <Pressable onPress={searchPlaces} style={styles.searchButton}>
            <Text style={styles.searchText}>Search</Text>
          </Pressable>

          {/* Promotions */}
          <Text style={styles.sectionTitle}>Travel more spend less</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <PromoCard
              backgroundColor="#003580"
              title="Genius"
              description="You are at Genius Level One in our loyalty program"
              color="white"
            />
            <PromoCard
              backgroundColor="#e0e0e0"
              title="15% Discounts"
              description="Complete 5 stays to unlock level 2"
            />
            <PromoCard
              backgroundColor="#e0e0e0"
              title="10% Discount"
              description="Enjoy discounts at participating properties worldwide"
            />
          </ScrollView>

          {/* Booking.com Logo */}
          <View style={styles.logoContainer}>
            <Image
              style={{ width: 200, height: 50, resizeMode: 'cover' }}
              source={{
                uri: 'https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png',
              }}
            />
          </View>
        </ScrollView>
      </View>

      {/* Modal for Room/Guest Selection */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Room & Guests</Text>

            {[
              { label: 'Rooms', value: roomCount, setter: setRoomCount },
              { label: 'Adults', value: adultCount, setter: setAdultCount },
              {
                label: 'Children',
                value: childrenCount,
                setter: setChildrenCount,
              },
            ].map(({ label, value, setter }) => (
              <View style={styles.modalRow} key={label}>
                <Text style={styles.modalLabel}>{label}</Text>
                <View style={styles.counterBox}>
                  <Pressable
                    style={styles.counterButton}
                    onPress={() => setter(Math.max(0, value - 1))}
                  >
                    <Text style={styles.counterText}>-</Text>
                  </Pressable>
                  <Text style={styles.counterValue}>{value}</Text>
                  <Pressable
                    style={styles.counterButton}
                    onPress={() => setter(value + 1)}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </Pressable>
                </View>
              </View>
            ))}

            <Pressable
              style={styles.saveButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const PromoCard = ({
  title,
  description,
  backgroundColor,
  color = 'black',
}) => (
  <Pressable
    style={{
      width: 200,
      height: 150,
      marginTop: 10,
      backgroundColor,
      borderRadius: 16,
      padding: 20,
      marginRight: 20,
      borderWidth: backgroundColor === '#e0e0e0' ? 2 : 0,
    }}
  >
    <Text
      style={{ color, fontSize: 18, fontWeight: 'bold', marginVertical: 8 }}
    >
      {title}
    </Text>
    <Text
      style={{ color, fontSize: 14, fontWeight: 'bold', marginVertical: 8 }}
    >
      {description}
    </Text>
  </Pressable>
);

export default HomeScreen;

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: '#FFC72C',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
  },
  searchButton: {
    paddingHorizontal: 10,
    borderColor: '#ffc72c',
    borderWidth: 2,
    paddingVertical: 15,
    backgroundColor: '#2a52be',
    borderRadius: 8,
  },
  searchText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  sectionTitle: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '500',
    marginTop: 15,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#003588',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  counterText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterValue: {
    marginHorizontal: 15,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#003588',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
