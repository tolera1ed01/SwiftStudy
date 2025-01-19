import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    position: "relative",
    bottom: 300,
    

    fontSize: 24,
    fontWeight: "500",
    fontFamily: "",
    padding: 10,
    borderBottomWidth: 2,
    width: "100%",
  },
  imageContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 400,
    left: 0,
    right: 0,
  },
});

export default styles;