import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  // input text
  const [inputText, setInputText] = useState('');
  
  // lista completa de tarefas
  const [tasks, setTasks] = useState<Task[]>([]);

  // adicionar uma nova tarefa
  const handleAddTask = () => {
    if (inputText.trim() === '') return; 

    const newTask: Task = {
      id: Date.now().toString(),
      title: inputText,
      completed: false,
    };

    // empilhar tarefa
    setTasks(prevTasks => [newTask, ...prevTasks]); 
    
    // limpar textbox
    setInputText('');
  };

  // marcar/desmarcar tarefa
  const handleToggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity 
      style={styles.taskCard} 
      onPress={() => handleToggleTask(item.id)}
      activeOpacity={0.7}
    >
      {/* quadrado de check */}
      <View style={[styles.checkbox, item.completed && styles.checkboxFilled]} />
      
      {/* Texto tachado */}
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma nova tarefa..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* LISTA DE TAREFAS */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFF',
    elevation: 2, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#007bffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 4,
    marginRight: 15,
  },
  checkboxFilled: {
    backgroundColor: '#007BFF',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
