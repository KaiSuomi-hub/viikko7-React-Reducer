// TodoItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TodoItem({ task, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.text}>{task}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
  },
});
