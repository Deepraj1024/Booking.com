import { View, Text, FlatList, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SearchResults = ({ data, input, setInput }) => {
  const navigation = useNavigation();
  const filteredData = data.filter(item =>
    item.place.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <View>
      {filteredData.length === 0 ? (
        <Text style={{ padding: 10 }}>No results found.</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Pressable
                onPress={() => {
                  setInput(item.place);
                  navigation.navigate('Home', {
                    input: item.place,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
              >
                <View>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={{ uri: item.placeImage }}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500' }}>
                    {item.place}
                  </Text>
                  <Text style={{ marginVertical: 4 }}>
                    {item.shortDescription}
                  </Text>
                  <Text style={{ color: 'gray', fontSize: 15 }}>
                    {item.properties.length} Properties
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SearchResults;
