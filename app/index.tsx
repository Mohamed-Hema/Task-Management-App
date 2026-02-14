import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Buy groceries", isDone: false },
    { id: 2, title: "Walk the dog", isDone: true },
    { id: 3, title: "Finish project report", isDone: false },
  ]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim().length === 0) return;

    const newTask: Task = {
      id: Date.now(),
      title: text.trim(),
      isDone: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setText("");
    Keyboard.dismiss();
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTasks((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={[styles.taskCard, item.isDone && styles.taskDone]}>
      <Pressable
        onPress={() => toggleTask(item.id)}
        style={styles.checkboxArea}
      >
        <Ionicons
          name={item.isDone ? "checkbox" : "square-outline"}
          size={24}
          color={item.isDone ? "#4caf50" : "#999"}
        />
      </Pressable>
      <Text
        style={[styles.taskText, item.isDone && styles.taskTextDone]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash-outline" size={20} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.avatar}
        />
      </View>

      {/* Add Tasks */}
      <View style={styles.addTaskRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a new task..."
          placeholderTextColor="#aaa"
          style={styles.input}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addBtn, !text.trim() && { opacity: 0.5 }]}
          onPress={addTask}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-done-circle-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTask}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  addTaskRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 15,
    color: "#333",
  },
  addBtn: {
    backgroundColor: "#4a90d9",
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskDone: {
    opacity: 0.6,
  },
  checkboxArea: {
    marginRight: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteBtn: {
    marginLeft: 8,
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#aaa",
  },
});
