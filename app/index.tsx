import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const toDoData = [
    { id: 1, title: "Buy groceries", isDone: false },
    { id: 2, title: "Walk the dog", isDone: true },
    { id: 3, title: "Finish project", isDone: false },
    { id: 4, title: "Call mom", isDone: true },
    { id: 5, title: "Read a book", isDone: false },
    { id: 6, title: "Exercise", isDone: true },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Ionicons name="menu" size={24} color="#000" />
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
        />
      </View>
      <FlatList
        data={toDoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
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
    marginBottom: 20,
  },
});
