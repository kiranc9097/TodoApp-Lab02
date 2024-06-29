import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CheckBox } from "react-native-elements";

const TaskApp = () => {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTaskList([
        ...taskList,
        { id: Date.now().toString(), title: newTask, done: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>ToDo App</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="New task"
          value={newTask}
          onChangeText={setNewTask}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Add a new task"
          color="#4CAF50"
          onPress={handleAddTask}
          disabled={!newTask.trim()}
        />
      </View>

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <CheckBox
              checked={item.done}
              checkedColor="#4CAF50"
              onPress={() => toggleTaskCompletion(item.id)}
            />
            <Text style={[styles.taskText, item.done && styles.completedTask]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Icon name="delete" size={25} color="darkred" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
    marginTop: 50,
    color: "#4CAF50",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  buttonWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 25,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default TaskApp;