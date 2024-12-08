import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig"; // Firebase config file
import Header from "./Header";
import theme from "./Theme";

function ProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert("Error", "User not authenticated.");
        setLoading(false);
        return;
      }

      // Fetch non-editable data from "users" collection
      const userDoc = doc(db, "users", userId);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
      } else {
        Alert.alert("Error", "User profile not found.");
      }

      // Fetch editable data from "userProfile" collection
      const userProfileDoc = doc(db, "userProfile", userId);
      const profileSnapshot = await getDoc(userProfileDoc);
      if (profileSnapshot.exists()) {
        const profileData = profileSnapshot.data();
        setAge(profileData.age?.toString() || "");
        setGender(profileData.gender || "");
        setBloodGroup(profileData.bloodGroup || "");
        setMedicalHistory(profileData.medicalHistory || "");
      } else {
        // Initialize a new profile document if it doesn't exist
        await setDoc(userProfileDoc, {
          age: "",
          gender: "",
          bloodGroup: "",
          medicalHistory: "",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      Alert.alert("Error", "Failed to fetch user profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert("Error", "User not authenticated.");
        setIsUpdating(false);
        return;
      }

      // Update editable fields in "userProfile" collection
      const userProfileDoc = doc(db, "userProfile", userId);
      await updateDoc(userProfileDoc, {
        age: parseInt(age, 10) || null,
        gender,
        bloodGroup,
        medicalHistory,
      });

      Alert.alert("Success", "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.profileTitle}>Edit Medical Profile</Text>
        <View style={styles.hrline}></View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={firstName}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={lastName}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={email}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            editable={isEditing}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender:</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            editable={isEditing}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Blood Group:</Text>
          <TextInput
            style={styles.input}
            value={bloodGroup}
            onChangeText={setBloodGroup}
            editable={isEditing}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Medical History:</Text>
          <TextInput
            style={styles.input}
            value={medicalHistory}
            onChangeText={setMedicalHistory}
            editable={isEditing}
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="create-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isUpdating && (
        <Modal transparent visible={isUpdating} animationType="fade">
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Updating Profile...</Text>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  hrline: {
    height: 1,
    width: "100%",
    backgroundColor: "#D2D2D2",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "grey",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#f5f5f5",
    color: "grey",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.primary,
  },
});

export default ProfileScreen;
