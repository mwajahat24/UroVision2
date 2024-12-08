import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "./Theme"; // Ensure this matches your app's theme structure

const Settings = () => {
  const [isNotificationsEnabled, setNotificationsEnabled] =
    React.useState(false);
  const [isAboutModalVisible, setAboutModalVisible] = useState(false);

  const toggleNotifications = () =>
    setNotificationsEnabled((prevState) => !prevState);

  const toggleAboutModal = () => setAboutModalVisible(!isAboutModalVisible);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Notifications Toggle */}
      <View style={styles.settingsItem}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.colors.primary}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>Notifications</Text>
          <Text style={styles.itemSubtitle}>
            {isNotificationsEnabled ? "Enabled" : "Disabled"}
          </Text>
        </View>
        <Switch
          trackColor={{ false: "#ccc", true: theme.colors.primary }}
          thumbColor={isNotificationsEnabled ? "#fff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      {/* Change Password */}
      <TouchableOpacity style={styles.settingsItem}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={theme.colors.primary}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>Change Password</Text>
          <Text style={styles.itemSubtitle}>Secure your account</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity style={styles.settingsItem} onPress={toggleAboutModal}>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={theme.colors.primary}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>About</Text>
          <Text style={styles.itemSubtitle}>Learn more about the app</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
      </TouchableOpacity>

      {/* About Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAboutModalVisible}
        onRequestClose={toggleAboutModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>About This App</Text>
            <Text style={styles.modalText}>
              UroVision is a comprehensive app designed to help users monitor
              their kidney health. Track symptoms, connect with doctors, and
              manage your medical history all in one place.
            </Text>
            <Pressable style={styles.closeButton} onPress={toggleAboutModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000", // Black color for the header
    marginBottom: 20,
    textAlign: "center",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
