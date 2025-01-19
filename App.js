import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import styles from "./stylesheet";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen></LoginScreen>
      <StatusBar style="auto" />
    </View>
  );
}

