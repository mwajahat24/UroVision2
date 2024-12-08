import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import Header from "./Header"; // Ensure the path is correct
import { db } from "./firebaseConfig"; // Firebase config
import { collection, getDocs } from "firebase/firestore";
import theme from "./Theme";

function Home({ navigation, route }) {
  const { firstName } = route.params || {};
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const quotesRef = collection(db, "quotes"); // Reference to the "quotes" collection
      const quotesSnapshot = await getDocs(quotesRef);
      const quotes = quotesSnapshot.docs.map((doc) => doc.data());

      if (quotes.length > 0) {
        // Pick a random quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex].successQuote || "Keep pushing forward!");
      } else {
        setQuote("No quotes found. Please add some in the database.");
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuote("Failed to load the quote. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading Quotes...</Text>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>
              Welcome, {firstName ? `${firstName}` : "Guest"}!
            </Text>
            <Text style={styles.welcomeSubtitle}>
              We're here to help you learn about kidney stones and how to manage
              them.
            </Text>
          </View>
          <Image
            source={require("./assets/kidneylogo.png")}
            style={styles.welcomeIcon}
          />
        </View>
        <Text style={styles.sectionTitle}>Motivational Quote of the Day</Text>
        <View style={styles.motivationalContainer}>
          <Text style={styles.motivationalText}>{`"${quote}"`}</Text>
        </View>
        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionCard, styles.trackSymptomsCard]}
            onPress={() => navigation.navigate("SymptomTracker")}
          >
            <Image
              source={require("./assets/tracksymptoms.png")}
              style={[styles.profileImage, styles.tracksymptomsimage]}
            />
            <Text style={[styles.optionTitle, styles.trackSymptomsText]}>
              Track Symptoms
            </Text>
            <Text style={[styles.optionSubtitle]}>
              Log and track your symptoms over time.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionCard, styles.findDoctorCard]}
            onPress={() => navigation.navigate("FindDoctorStack")}
          >
            <Image
              source={require("./assets/findadoctor.png")}
              style={[styles.profileImage, styles.findadoctorimage]}
            />
            <Text style={[styles.optionTitle, styles.findDoctorText]}>
              Find a Doctor
            </Text>
            <Text style={[styles.optionSubtitle]}>
              Connect with kidney stone experts.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  welcomeCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  welcomeTextContainer: {
    flex: 0.9,
    marginRight: 10,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  welcomeSubtitle: {
    color: "white",
    fontSize: 13,
    textAlign: "justify",
  },
  welcomeIcon: {
    width: 78,
    height: 78,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    color: "#333",
  },
  motivationalContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  motivationalText: {
    fontSize: 22,
    fontStyle: "italic",
    color: "white",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 22,
  },
  optionCard: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "48%",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    height: 70,
    width: 70,
    marginBottom: 10,
  },
  tracksymptomsimage: {
    resizeMode: "contain",
    transform: "rotate(-10deg)",
  },
  findadoctorimage: {
    resizeMode: "contain",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 5,
  },
  optionSubtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#000000",
    flexWrap: "wrap",
  },
  trackSymptomsText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000000",
  },
  findDoctorText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000000",
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

export default Home;
