import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import theme from "./Theme";
import { auth, db } from "./firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const CustomDrawerContent = ({ firstName, lastName, email, ...props }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the latest profile image from the user's subcollection
  const fetchProfileImage = async () => {
    try {
      const userId = auth.currentUser.uid; // Get the logged-in user's ID
      const imagesRef = collection(db, "users", userId, "userImages");
      const q = query(imagesRef, orderBy("uploadedAt", "desc")); // Get the most recent image
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestImage = querySnapshot.docs[0].data(); // Get the latest image document
        setProfileImage(latestImage.imagePath);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Image
              source={
                profileImage
                  ? { uri: profileImage } // Display fetched image
                  : require("./assets/userprofile.png") // Fallback image
              }
              style={styles.profileImage}
            />
          )}
          <Text style={styles.name}>{`${firstName || "User"} ${
            lastName || ""
          }`}</Text>
        </View>
        <Text style={styles.email}>{email || "user@example.com"}</Text>
        <Text style={styles.accountType}>Account Type: Patient</Text>
      </View>
      <DrawerItem
        label="Guide & Tips"
        icon={({ color, size }) => (
          <Ionicons name="book-outline" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate("GuideTipsDrawer")}
      />
      <DrawerItem
        label="Help"
        icon={({ color, size }) => (
          <Ionicons name="help-circle-outline" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate("HelpDrawer")}
      />
      <DrawerItem
        label="Settings"
        icon={({ color, size }) => (
          <Ionicons name="settings-outline" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate("SettingsDrawer")}
      />
      <DrawerItem
        label="LogOut"
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate("LogOutDrawer")}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: 0,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    marginBottom: 10,
    position: "relative",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: -12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 12,
    resizeMode: "cover",
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "white",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  accountType: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  closeButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 5,
    right: 10,
  },
});

export default CustomDrawerContent;
