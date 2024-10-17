import TodoItem from './components/todoItem';
import AddNew from './components/addNew';
import AsyncStorage from '@react-native-async-storage/async-storage';
// App.js
import React, { useReducer, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
 
// Define the initial state as an empty array
const initialState = [];

// Define the reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    case 'ADD_TODO':
      return [...state, { id: Math.random().toString(), task: action.payload }];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function App() {
  // Use useReducer instead of useState
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  // Function to load todos from AsyncStorage
  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos) {
        dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
      }
    } catch (e) {
      console.log('Failed to load todos.');
    }
  };

  // Function to save todos to AsyncStorage
  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.log('Failed to save todos.');
    }
  };

  // Function to dispatch an action to add a new to-do and save it
  const addTodo = (newTask) => {
    if (newTask) {
      const updatedTodos = [...todos, { id: Math.random().toString(), task: newTask }];
      dispatch({ type: 'ADD_TODO', payload: newTask });
      saveTodos(updatedTodos);  // Save the updated list
    }
  };

  // Function to dispatch an action to remove a to-do and save the updated list
  const removeTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    dispatch({ type: 'REMOVE_TODO', payload: id });
    saveTodos(updatedTodos);  // Save the updated list
  };

  // Load todos from AsyncStorage when the app starts
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <AddNew addTodo={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem task={item.task} onPress={() => removeTodo(item.id)} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
});
