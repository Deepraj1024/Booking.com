import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d4af37',
      }}
    >
      <Image
        style={{ width: 290, height: 60, resizeMode: 'cover' }}
        source={{
          uri: 'https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png',
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
