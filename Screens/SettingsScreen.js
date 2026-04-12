import React from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { Switch } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

export default function SettingsScreen({ isDark, toggleTheme }) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.settingsContainer, { backgroundColor: colors.background }]}>
      <Text style={[styles.settingsHeaderText, { color: colors.text }]}>
        Settings
      </Text>
      <View style={styles.settingsSection}>
        <Text style={[styles.settingsSectionTitle, { color: colors.text }]}>
          Appearance
        </Text>
        <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <View>
            <Text style={[styles.settingsRowTitle, { color: colors.text }]}>
              Dark mode
            </Text>
            <Text
              style={[styles.settingsRowSubtitle, { color: colors.placeholderText || "#6a6a6a" },]}>
              Switch between light and dark theme
            </Text>
          </View>

          <Switch value={isDark} onValueChange={toggleTheme} thumbColor={colors.primary}/>
        </View>
      </View>

      {/* your delete account section etc. */}
    </SafeAreaView>
  );
}