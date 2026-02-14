import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  LayoutAnimation,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

const lightTheme = {
  background: "#f5f5f5",
  card: "#fff",
  text: "#222",
  textSecondary: "#333",
  placeholder: "#aaa",
  border: "#e0e0e0",
};

const darkTheme = {
  background: "#1a1a2e",
  card: "#16213e",
  text: "#eee",
  textSecondary: "#ccc",
  placeholder: "#666",
  border: "#2a2a4a",
};

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Buy groceries", isDone: false },
    { id: 2, title: "Walk the dog", isDone: true },
    { id: 3, title: "Finish project report", isDone: false },
  ]);
  const [text, setText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDarkMode((prev) => !prev);
  };

  const addTask = () => {
    if (text.trim().length === 0) return;

    const newTask: Task = {
      id: Date.now(),
      title: text.trim(),
      isDone: false,
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) => [newTask, ...prev]);
    setText("");
    Keyboard.dismiss();
  };

  const toggleTask = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    const handleDelete = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    if (Platform.OS === "web") {
      if (confirm("Are you sure you want to delete this task?")) {
        handleDelete();
      }
    } else {
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: handleDelete },
      ]);
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View
      style={[
        styles.taskCard,
        { backgroundColor: theme.card },
        item.isDone && styles.taskDone,
      ]}
    >
      <Pressable
        onPress={() => toggleTask(item.id)}
        style={styles.checkboxArea}
      >
        <Ionicons
          name={item.isDone ? "checkbox" : "square-outline"}
          size={24}
          color={item.isDone ? "#4caf50" : theme.placeholder}
        />
      </Pressable>
      <Text
        style={[
          styles.taskText,
          { color: theme.textSecondary },
          item.isDone && styles.taskTextDone,
        ]}
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Tasks</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={22}
              color={theme.text}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Add Tasks */}
      <View style={styles.addTaskRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a new task..."
          placeholderTextColor={theme.placeholder}
          style={[styles.input, { backgroundColor: theme.card, color: theme.textSecondary }]}
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
          <Ionicons name="checkmark-done-circle-outline" size={64} color={theme.placeholder} />
          <Text style={[styles.emptyText, { color: theme.placeholder }]}>
            No tasks yet. Add one above!
          </Text>
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

      {/* Footer */}
      <TouchableOpacity
        onPress={() => Linking.openURL("https://mohamed-mostafa-portfolio.netlify.app/")}
        style={styles.footer}
      >
        <Text style={[styles.footerText, { color: '#004280ff' }]}>
          Developed by Mohamed Ibrahim 🧑‍💻 @2026
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  themeBtn: {
    padding: 6,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 15,
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
  },
  footer: {
    alignItems: "center",
    paddingVertical: 14,
  },
  footerText: {
    fontSize: 13,
  },
});
