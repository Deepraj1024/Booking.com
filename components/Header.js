import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={{ backgroundColor: '#003588', height: 65 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        {[
          { label: 'Stays', icon: 'bed-outline' },
          { label: 'Flights', icon: 'airplane-outline' },
          { label: 'Car Rental', icon: 'car-outline' },
          { label: 'Taxi', icon: 'car-sport-outline' },
        ].map((item, index) => (
          <Pressable
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: item.label === 'Stays' ? 'white' : 'transparent',
              borderWidth: 1,
              borderRadius: 20,
              padding: 8,
              marginRight: 12,
            }}
          >
            <Ionicons name={item.icon} size={24} color="white" />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: 'bold',
                color: 'white',
                fontSize: 16,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
