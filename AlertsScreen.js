import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import theme from "./Theme";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { db, auth } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

import medicationIcon from "./assets/medicinepill.png";
import hydrationIcon from "./assets/glassofwater.png";
import appointmentIcon from "./assets/calendar.png";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("general", {
    name: "General Notifications",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    sound: "alarm",
  });
}

function AlertsScreen({ navigation }) {
  const [alerts, setAlerts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [savedTime, setSavedTime] = useState("");
  const [newAlert, setNewAlert] = useState({
    type: "",
    title: "",
    subtitle: "",
    time: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const userId = auth.currentUser.uid;
      const alertsRef = collection(db, "users", userId, "alerts");
      const q = query(alertsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setAlerts([]);
      } else {
        const fetchedAlerts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlerts(fetchedAlerts);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
      Alert.alert("Error", "Failed to fetch alerts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();

    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const alertId = notification.request.content.data.alertId;

        if (alertId) {
          const userId = auth.currentUser.uid;
          const alertDocRef = doc(db, "users", userId, "alerts", alertId);

          await updateDoc(alertDocRef, { isRead: true });

          setAlerts((prevAlerts) =>
            prevAlerts.map((alert) =>
              alert.id === alertId ? { ...alert, isRead: true } : alert
            )
          );
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "medication":
        return medicationIcon;
      case "hydration":
        return hydrationIcon;
      case "appointment":
        return appointmentIcon;
      default:
        return appointmentIcon;
    }
  };

  const scheduleNotification = async (
    title,
    subtitle,
    time,
    channelId,
    alertId
  ) => {
    try {
      const triggerTime = new Date(time); // Use the exact time passed
      console.log("Scheduling notification:");
      console.log("Notification set for:", triggerTime.toLocaleString());
      console.log("Current time:", new Date().toLocaleString());

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body: subtitle,
          data: { alertId },
          android: {
            channelId,
          },
        },
        trigger: { date: triggerTime }, // Use the exact trigger time
      });

      console.log(
        "Notification scheduled successfully for:",
        triggerTime.toLocaleString()
      );
    } catch (error) {
      console.error("Failed to schedule notification:", error);
      Alert.alert("Error", "Failed to schedule notification.");
    }
  };

  const handleAddAlert = async () => {
    if (!newAlert.title || !newAlert.subtitle || !newAlert.type) {
      Alert.alert("Please select a type and fill in all fields");
      return;
    }

    setIsAdding(true);
    try {
      const userId = auth.currentUser.uid;
      const alertsRef = collection(db, "users", userId, "alerts");
      setSavedTime(newAlert.time);
      const newAlertData = {
        title: newAlert.title,
        message: newAlert.subtitle,
        createdAt: new Date(), // This tracks when the alert was created
        alertTime: newAlert.time, // This explicitly saves the scheduled time
        isRead: false,
        type: newAlert.type,
      };

      const docRef = await addDoc(alertsRef, newAlertData);

      const channelId =
        newAlert.type === "daily_affirmation" ? "daily_affirmation" : "general";

      scheduleNotification(
        newAlert.title,
        newAlert.subtitle,
        newAlert.time,
        channelId,
        docRef.id
      );

      setModalVisible(false);
      setNewAlert({ type: "", title: "", subtitle: "", time: newAlert.time });
      fetchAlerts();
    } catch (error) {
      console.error("Error adding alert:", error);
      Alert.alert("Error", "Failed to add alert.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || newAlert.time;
    setShowDatePicker(false);
    setNewAlert({ ...newAlert, time: currentDate });
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || newAlert.time;
    setShowTimePicker(false);
    setNewAlert({ ...newAlert, time: currentTime });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading Alerts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>ALERTS</Text>
        {alerts.map((alert) => (
          <View style={styles.alertContainer} key={alert.id}>
            <View style={styles.iconContainer}>
              <Image source={getIcon(alert.type)} style={styles.alertIcon} />
            </View>
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTextTitle}>{alert.title}</Text>
              <Text style={styles.alertTextSubtitle}>{alert.message}</Text>
              <Text style={styles.alertTextSubtitle}>
                {alert.alertTime
                  ? alert.alertTime.toDate().toLocaleString()
                  : "No alert time"}
              </Text>
            </View>
            <Ionicons
              name="ellipse"
              size={15}
              color={alert.isRead ? "#90EE90" : "#FF4500"}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Alert</Text>

          <View style={styles.typeSelection}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                newAlert.type === "medication" && styles.selectedTypeButton,
              ]}
              onPress={() => setNewAlert({ ...newAlert, type: "medication" })}
            >
              <Image source={medicationIcon} style={styles.typeIcon} />
              <Text>Medication</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                newAlert.type === "hydration" && styles.selectedTypeButton,
              ]}
              onPress={() => setNewAlert({ ...newAlert, type: "hydration" })}
            >
              <Image source={hydrationIcon} style={styles.typeIcon} />
              <Text>Hydration</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                newAlert.type === "appointment" && styles.selectedTypeButton,
              ]}
              onPress={() => setNewAlert({ ...newAlert, type: "appointment" })}
            >
              <Image source={appointmentIcon} style={styles.typeIcon} />
              <Text>Appointment</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newAlert.title}
              onChangeText={(text) => setNewAlert({ ...newAlert, title: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Subtitle"
              value={newAlert.subtitle}
              onChangeText={(text) =>
                setNewAlert({ ...newAlert, subtitle: text })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                value={newAlert.time}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Button title="Pick Time" onPress={() => setShowTimePicker(true)} />
            {showTimePicker && (
              <DateTimePicker
                value={newAlert.time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View style={styles.modalActions}>
            <Button title="Add Alert" onPress={handleAddAlert} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {isAdding && (
        <Modal transparent visible={isAdding} animationType="fade">
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Adding Alert...</Text>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  alertContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  alertIcon: {
    width: 22,
    height: 22,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  alertTextSubtitle: {
    fontSize: 14,
    color: "grey",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  typeSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  typeButton: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedTypeButton: {
    backgroundColor: "#d3d3d3",
  },
  typeIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalActions: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.primary,
  },
});

export default AlertsScreen;
