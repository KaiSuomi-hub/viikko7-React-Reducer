// AddNew.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddNew({ addTodo }) {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    addTodo(text);
    setText(''); // Clear input after adding
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a new to-do"
        onChangeText={setText}
        value={text}
      />
      <Button title="Save" onPress={handleAddTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});
