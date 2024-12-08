import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import axios from "axios";

function LoadingScreen({ route, navigation }) {
  // Get the selected image URI from route parameters
  const { imageUri } = route.params;

  useEffect(() => {
    const analyzeImage = async () => {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "scan.jpg",
      });

      try {
        console.log("Starting image analysis..."); // Debugging: Log start of the request
        // Send the image to the backend for analysis
        const response = await axios.post(
          "http://192.168.18.127:5000/predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Received response:", response.data); // Debugging: Log the response data

        // Get the prediction result
        const result = response.data.prediction;

        // Navigate to DiagnosisReport with the result and image URI
        navigation.replace("DiagnosisReportStack", {
          screen: "DiagnosisReport",
          params: { result: result, imageUri: imageUri },
        });
      } catch (error) {
        console.error("Error analyzing the scan:", error); // Debugging: Log the error
        // Check if error response exists and display the error message
        if (error.response && error.response.data.error) {
          Alert.alert("Analysis Failed", error.response.data.error);
        } else {
          Alert.alert("Failed to analyze the scan. Please try again.");
        }
        navigation.goBack(); // Navigate back to ScanScreen if there's an error
      }
    };

    // Start the analysis
    analyzeImage();

    return () => {
      console.log("Cleaning up..."); // Debugging: Log cleanup
    };
  }, [imageUri, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ActivityIndicator size="large" color="#2196F3" />
      <Text style={styles.text}>Analyzing... Please wait</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    marginTop: 20,
    color: "white",
    fontSize: 18,
  },
});

export default LoadingScreen;
