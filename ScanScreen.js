import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Header from "./Header"; // Ensure the path is correct
import theme from "./Theme";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; // Import axios for making HTTP requests

function ScanScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission to access camera is required!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const capturedImageUri = result.assets[0].uri;
        setSelectedImage(capturedImageUri);
      } else {
        Alert.alert("Failed to capture an image. Please try again.");
      }
    } catch (error) {
      console.error("Error opening camera:", error);
      Alert.alert("Error", "Failed to open the camera. Please try again.");
    }
  };

  const openImageLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      setSelectedImage(selectedUri);
    }
  };

  const selectImage = () => {
    Alert.alert(
      "Upload Image",
      "Choose an option",
      [
        { text: "Take Photo", onPress: openCamera },
        { text: "Choose from Library", onPress: openImageLibrary },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const analyzeScan = async () => {
    if (!selectedImage) {
      Alert.alert("Please select an image first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: selectedImage,
        name: "scan.jpg",
        type: "image/jpeg",
      });

      const response = await axios.post(
        // "http://192.168.18.127:5000/predict",
        // "http://192.168.18.141:5000/predict",
        "http://192.168.18.141:8000/predict",
        // "http://localhost:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from backend:", response.data); // Log the response for debugging

      const { prediction, num_stones, stone_info, confidence } = response.data;

      // Log the extracted values for debugging
      console.log("Number of Stones:", num_stones);
      console.log("Stone Info:", stone_info);

      // Pass the data to DiagnosisReportStack
      navigation.navigate("DiagnosisReportStack", {
        screen: "DiagnosisReport", // Specify the screen inside the stack
        params: {
          imageUri: selectedImage,
          result: prediction,
          numStones: num_stones || 0,
          stoneInfo: stone_info || [],
          confidence: confidence || 0,
        },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to analyze the image. Please try again.");
      console.error("Error during analysis:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Upload CT scan</Text>
        <Text style={styles.subtitle}>
          Upload a clear image of the CT scan of your kidney and we will analyze
          it for you.
        </Text>

        <TouchableOpacity style={styles.uploadContainer} onPress={selectImage}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={64} color="grey" />
              <Text style={styles.uploadText}>Upload Image</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Privacy text and container */}
        <View style={styles.privacyContainer}>
          <Ionicons name="lock-closed-outline" size={30} color="grey" />
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyText}>
              By uploading I agree to the{" "}
              <Text style={styles.privacyLink}>Privacy Policy</Text>
            </Text>
            <Text style={styles.privacyText}>
              Your personal data is protected and will never be shared with
              anyone.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={analyzeScan}>
          <Text style={styles.buttonText}>Analyze Scan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "grey",
    textAlign: "left",
    marginBottom: 20,
  },
  uploadContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 16,
    color: "grey",
    marginTop: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
  },
  privacyTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  privacyText: {
    fontSize: 14,
    color: "grey",
    textAlign: "left",
  },
  privacyLink: {
    color: "#2196F3",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScanScreen;

/*
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "grey",
    textAlign: "left",
    marginBottom: 20,
  },
  uploadContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 16,
    color: "grey",
    marginTop: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
  },
  privacyTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  privacyText: {
    fontSize: 14,
    color: "grey",
    textAlign: "left",
  },
  privacyLink: {
    color: "#2196F3",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
*/
