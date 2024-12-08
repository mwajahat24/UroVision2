import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "./firebaseConfig"; // Import Firestore configuration
import theme from "./Theme";

const SymptomTracker = ({ navigation }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [visibleSymptomsCount, setVisibleSymptomsCount] = useState(2);
  const [loading, setLoading] = useState(true); // State for loading animation

  const fetchSymptoms = async () => {
    try {
      setLoading(true); // Start loading
      const userId = auth.currentUser.uid; // Get current user's UID
      const symptomsRef = collection(db, "users", userId, "symptoms");
      const q = query(symptomsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedSymptoms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSymptoms(fetchedSymptoms);
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSymptoms();
    }, [])
  );

  const formatDate = (date) => {
    return date.toDate().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleShowMore = () => {
    setVisibleSymptomsCount((prev) => Math.min(prev + 2, symptoms.length));
  };

  const handleShowLess = () => {
    setVisibleSymptomsCount((prev) => Math.max(prev - 2, 2));
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          <Text style={styles.title}>Symptom Tracker</Text>
          {symptoms.length > 0 ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("SymptomTracker2")}
              >
                <Text style={styles.buttonText}>Record Symptoms</Text>
              </TouchableOpacity>
              {symptoms.slice(0, visibleSymptomsCount).map((symptom) => (
                <View key={symptom.id} style={styles.symptomItem}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.date}>
                      {formatDate(symptom.createdAt)}
                    </Text>
                    <View style={styles.dateLineSeperator}></View>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Pain Level:</Text>
                    <Text style={styles.value}>{symptom.painLevel}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Pain in Side:</Text>
                    <Text style={styles.value}>{symptom.painInSide}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Frequent Urination:</Text>
                    <Text style={styles.value}>
                      {symptom.frequentUrination}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Urgency:</Text>
                    <Text style={styles.value}>{symptom.urgency}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Pain While Urination:</Text>
                    <Text style={styles.value}>
                      {symptom.painWhileUrination}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Blood in Urine:</Text>
                    <Text style={styles.value}>{symptom.bloodInUrine}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Nausea:</Text>
                    <Text style={styles.value}>{symptom.nausea}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Other Symptoms:</Text>
                    <Text style={styles.value}>{symptom.otherSymptoms}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Duration:</Text>
                    <Text style={styles.value}>{symptom.duration}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.arrowButtonContainer}>
                {symptoms.length > visibleSymptomsCount && (
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={handleShowMore}
                  >
                    <View style={styles.arrowButtonContent}>
                      <Ionicons
                        style={styles.arrowUpDownIcons}
                        name="chevron-down"
                        size={24}
                        color={theme.colors.primary}
                      />
                      <Text style={styles.viewMoreLessTexts}>View More</Text>
                    </View>
                  </TouchableOpacity>
                )}
                {visibleSymptomsCount > 2 && (
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={handleShowLess}
                  >
                    <View style={styles.arrowButtonContent}>
                      <Ionicons
                        style={styles.arrowUpDownIcons}
                        name="chevron-up"
                        size={24}
                        color={theme.colors.primary}
                      />
                      <Text style={styles.viewMoreLessTexts}>View Less</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <View style={styles.noSymptomsContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="clipboard-outline" size={64} color="grey" />
                <Text style={styles.subtitle}>No symptoms logged</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("SymptomTracker2")}
              >
                <Text style={styles.buttonText}>Log Symptoms</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      {/* Loading Modal */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#51ACFF" />
            <Text style={styles.modalText}>Loading...</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "white",
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
  symptomItem: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 5,
  },
  dateContainer: {
    position: "relative",
    marginBottom: 10,
  },
  dateLineSeperator: {
    position: "absolute",
    top: 16,
    left: 185,
    height: 1,
    width: "46%",
    backgroundColor: "#51ACFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    lineHeight: 35,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "grey",
  },
  noSymptomsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 180,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "grey",
    marginTop: 10,
  },
  button: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 25,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  arrowButtonContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  arrowButton: {
    alignItems: "center",
    padding: 10,
  },
  arrowButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowUpDownIcons: {
    color: theme.colors.primary,
    marginRight: 5,
  },
  viewMoreLessTexts: {
    color: theme.colors.primary,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  modalText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#51ACFF",
    textAlign: "center",
  },
});

export default SymptomTracker;
