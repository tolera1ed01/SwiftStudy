import React, { useState } from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { Switch } from "react-native-gesture-handler";
import { useNavigation, useTheme } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { Alert } from "react-native";
import { updateEmail, updateProfile } from "firebase/auth";

export default function SettingsScreen({ isDark, toggleTheme }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleChangeEmail = async (newEmail) => {
    const user = auth.currentUser;
    try {
      await updateEmail(user, newEmail)
      Alert.alert(
        "Email updated to: ", newEmail
      );
    } catch (error) {
      Alert.alert("Error: ", error.message);
    }
  };

  const handleChangeUsername = async (newUsername) => {
    const user = auth.currentUser;
    try {
      await updateProfile(user, {displayName: newUsername})
      Alert.alert(
        "Username updated to: ", user.displayName
      );
    } catch (error) {
      Alert.alert("Error: ", error.message);
    }
  };

  const deleteAccountHandler = () => {
    Alert.alert(
      "Delete your account", "This will permanently erase your account",
      [
        { text: "Cancel", style: "cancel"},
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteUser,
        },
      ]
    );
  };

  const deleteUser = async () => {
    const user = auth.currentUser;
    
    try {
      await user.delete()
      navigation.navigate("LoginScreen")
    } catch (error) {
      Alert.alert("Error deleting account", error.message)
    }
  };

  return (
    <SafeAreaView style={[styles.settingsContainer, { backgroundColor: colors.background }]}>
      <Text style={[styles.settingsHeaderText, { color: colors.text }]}>
        Settings
      </Text>
      <View style={styles.settingsSection}>
        <Text style={[styles.settingsSectionTitle, { color: colors.text }]}>Appearance</Text>
        <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <View>
            <Text style={[styles.settingsRowTitle, { color: colors.text }]}>Dark mode</Text>
            <Text style={[styles.settingsRowSubtitle, { color: colors.placeholderText || "#6a6a6a" },]}>
              Switch between light and dark theme
            </Text>
          </View>
          <Switch value={isDark} onValueChange={toggleTheme} thumbColor={colors.primary}/>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.settingsSectionTitle, { color: colors.text }]}>Account</Text>
        <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <View>
            <Text style={[styles.settingsRowTitle, { color: colors.text }]}>Delete account</Text>
            <Text style={[styles.settingsRowSubtitle, { color: colors.placeholderText || "#6a6a6a" },]}>
              Permanently delete your account
            </Text>
          </View>
          <TouchableOpacity onPress={deleteAccountHandler} style={styles.deleteButton}  activeOpacity={0.8}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={[styles.settingsRowTitle, { color: colors.text }]}>Change account email</Text>
            <Text style={[styles.settingsRowSubtitle,{ color: colors.placeholderText || "#6a6a6a" },]}>Change your email address</Text>
            <TextInput style={[styles.changeEmailInput,{ backgroundColor: colors.background, color: colors.text },]}
              placeholder="New email"
              placeholderTextColor={colors.placeholderText || "#6a6a6a"}
              keyboardType="email-address"
              autoCapitalize="none"
              value={newEmail}
              onChangeText={setNewEmail}
            />
          </View>

          <TouchableOpacity
            onPress={handleChangeEmail}
            style={styles.changeEmailButton}
            activeOpacity={0.8}
          >
            <Text style={styles.changeEmailButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={[styles.settingsRowTitle, { color: colors.text }]}>Change username</Text>
            <Text style={[styles.settingsRowSubtitle,{ color: colors.placeholderText || "#6a6a6a" },]}>Change your email address</Text>
            <TextInput style={[styles.changeEmailInput,{ backgroundColor: colors.background, color: colors.text },]}
              placeholder="New username"
              placeholderTextColor={colors.placeholderText || "#6a6a6a"}
              autoCapitalize="none"
              value={newUsername}
              onChangeText={setNewUsername}
            />
          </View>

          <TouchableOpacity
            onPress={handleChangeUsername}
            style={styles.changeEmailButton}
            activeOpacity={0.8}
          >
            <Text style={styles.changeEmailButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}