import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function List({item}) {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{uri: item.url_image_absolute}}></Image>
      <Text style={styles.text}>{item.food_name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: "center",
    padding: 8,
    borderBottomColor: "#757575",
    borderBottomWidth: 0.75,
  },
  image: {
    height: 32,
    width: 32,
  },
  text: {
    fontSize: 14,
    flex: 1,
    marginLeft: 8
  }
});
