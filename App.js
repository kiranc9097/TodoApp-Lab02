import React, { useState, useEffect } from "react";
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
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyIBZ7ohx0uihbAmd_5x_EK8iiY0rz99A",
  authDomain: "lab09-ac2b3.firebaseapp.com",
  projectId: "lab09-ac2b3",
  storageBucket: "lab09-ac2b3.appspot.com",
  messagingSenderId: "972046472602",
  appId: "1:972046472602:web:6013a8d6d9e731be291623"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const TaskApp = () => {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const unsubscribe = firebaseApp
      .firestore()
      .collection("Tasks")
      .onSnapshot((querySnapshot) => {
        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTaskList(tasks);
      });

    return () => unsubscribe();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      firebaseApp.firestore().collection("Tasks").add({
        title: newTask,
        done: false,
      });
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id, done) => {
    firebaseApp.firestore().collection("Tasks").doc(id).update({
      done: !done,
    });
  };

  const removeTask = (id) => {
    firebaseApp.firestore().collection("Tasks").doc(id).delete();
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Task Manager</Text>
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
              onPress={() => toggleTaskCompletion(item.id, item.done)}
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
