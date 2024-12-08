import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Header from "./Header"; // Ensure the path is correct
import DynamicWidthText from "./DynamicWidthText"; // Adjust the path as necessary
import theme from "./Theme";

function PatientHistory({ navigation }) {
  const [showMoreHistory, setShowMoreHistory] = useState(false);
  const [showMoreAppointmentHistory, setShowMoreAppointmentHistory] =
    useState(false);

  const handleToggleHistory = () => {
    setShowMoreHistory(!showMoreHistory);
  };

  const handleToggleAppointmentHistory = () => {
    setShowMoreAppointmentHistory(!showMoreAppointmentHistory);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("./assets/userprofile.png")} // Replace with your profile image URI
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Obaid</Text>
        <View style={styles.profileDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Gender</Text>
            <Text style={styles.detailValue}>Male</Text>
          </View>
          <View style={styles.seperatorLine} />
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Age</Text>
            <Text style={styles.detailValue}>22</Text>
          </View>
          <View style={styles.seperatorLine} />
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Weight</Text>
            <Text style={styles.detailValue}>63</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <DynamicWidthText text="Medical History" style={styles.sectionTitle} />
        <View style={styles.historyItem}>
          <View style={styles.dateContainer}>
            <Text style={styles.historyDate}>Dec. 12, 2023</Text>
            <View style={styles.dateLineSeperator}></View>
          </View>
          <View style={styles.historyDetail}>
            <Text style={styles.historyDetailTitle}>Stone Status:</Text>
            <Text style={[styles.historyDetailValue, { color: "red" }]}>
              Found
            </Text>
          </View>
          <View style={styles.historyDetail}>
            <Text style={styles.historyDetailTitle}>Number of Stones:</Text>
            <Text style={styles.historyDetailValue}>01</Text>
          </View>
          <View style={styles.historyDetail}>
            <Text style={styles.historyDetailTitle}>Stone Shape:</Text>
            <Text style={styles.historyDetailValue}>Oval</Text>
          </View>
          <View style={styles.historyDetail}>
            <Text style={styles.historyDetailTitle}>Location:</Text>
            <Text style={styles.historyDetailValue}>Right Kidney</Text>
          </View>
          <View style={styles.historyDetail}>
            <Text style={styles.historyDetailTitle}>Stone Size:</Text>
            <Text style={styles.historyDetailValue}>2.3mm</Text>
          </View>
          <View style={styles.historyDetail}>
            <Text style={styles.historyDetailTitle}>Symptoms:</Text>
            <Text style={styles.historyDetailValue}>Pain in Lower Back</Text>
          </View>
          <View style={styles.historyDetail}>
            <Text style={styles.historyDetailTitle}>Medication:</Text>
            <Text style={styles.historyDetailValue}>
              Allopurinol, Thiazide diuretics
            </Text>
          </View>
          <View style={styles.historyDetail}>
            <Text style={styles.historyDetailTitle}>Treatment Outcome:</Text>
            <Text style={styles.historyDetailValue}>Decrease in Size</Text>
          </View>
        </View>

        {showMoreHistory && (
          <View style={styles.historyItem}>
            <View style={styles.dateContainer}>
              <Text style={styles.historyDate}>Nov. 15, 2023</Text>
              <View style={styles.dateLineSeperator}></View>
            </View>
            <View style={styles.historyDetail}>
              <Text style={styles.historyDetailTitle}>Stone Status:</Text>
              <Text style={[styles.historyDetailValue, { color: "red" }]}>
                Found
              </Text>
            </View>
            <View style={styles.historyDetail}>
              <Text style={styles.historyDetailTitle}>Number of Stones:</Text>
              <Text style={styles.historyDetailValue}>01</Text>
            </View>
            <View style={styles.historyDetail}>
              <Text style={styles.historyDetailTitle}>Stone Shape:</Text>
              <Text style={styles.historyDetailValue}>Oval</Text>
            </View>
            <View style={styles.historyDetail}>
              <Text style={styles.historyDetailTitle}>Location:</Text>
              <Text style={styles.historyDetailValue}>Right Kidney</Text>
            </View>
            <View style={styles.historyDetail}>
              <Text style={styles.historyDetailTitle}>Stone Size:</Text>
              <Text style={styles.historyDetailValue}>1.3mm</Text>
            </View>
            <View style={styles.historyDetail}>
              <Text style={styles.historyDetailTitle}>Symptoms:</Text>
              <Text style={styles.historyDetailValue}>Pain in Upper Back</Text>
            </View>
            <View style={styles.historyDetail}>
              <Text style={styles.historyDetailTitle}>Medication:</Text>
              <Text style={styles.historyDetailValue}>
                Allopurinol, Thiazide diuretics
              </Text>
            </View>
            <View style={styles.historyDetail}>
              <Text style={styles.historyDetailTitle}>Treatment Outcome:</Text>
              <Text style={styles.historyDetailValue}>Decrease in Size</Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleToggleHistory}
        >
          <View style={styles.arrowButtonContent}>
            <Ionicons
              style={styles.arrowUpDownIcons}
              name={showMoreHistory ? "chevron-up" : "chevron-down"}
              size={24}
              color="black"
            />
            <Text style={styles.viewMoreLessTexts}>
              {showMoreHistory ? "View Less" : "View More"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <DynamicWidthText
          text="Appointment History"
          style={styles.sectionTitle}
        />
        <View style={styles.appointmentItem}>
          <View style={styles.dateContainer}>
            <Text style={styles.appointmentDate}>Nov. 15, 2023</Text>
            <View style={styles.dateLineSeperator}></View>
          </View>
          <View style={styles.appointmentDetail}>
            <Ionicons
              name="ellipse"
              size={16}
              color="lightgreen"
              style={styles.appointmentIcon}
            />
            <Text style={styles.appointmentTime}>8:30am - 9:00am</Text>
          </View>
          <Text style={styles.appointmentTopic}>Report Discussion</Text>
          <Text style={styles.appointmentDoctor}>Dr Anayat Ullah Kazmi</Text>
        </View>

        {showMoreAppointmentHistory && (
          <View style={styles.appointmentItem}>
            <View style={styles.dateContainer}>
              <Text style={styles.appointmentDate}>Oct. 10, 2023</Text>
              <View style={styles.dateLineSeperator}></View>
            </View>
            <View style={styles.appointmentDetail}>
              <Ionicons
                name="ellipse"
                size={16}
                color="lightgreen"
                style={styles.appointmentIcon}
              />
              <Text style={styles.appointmentTime}>9:00am - 9:30am</Text>
            </View>
            <Text style={styles.appointmentTopic}>
              Medication and Treatment
            </Text>
            <Text style={styles.appointmentDoctor}>Dr Anayat Ullah Kazmi</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleToggleAppointmentHistory}
        >
          <View style={styles.arrowButtonContent}>
            <Ionicons
              style={styles.arrowUpDownIcons}
              name={showMoreAppointmentHistory ? "chevron-up" : "chevron-down"}
              size={24}
              color="black"
            />
            <Text style={styles.viewMoreLessTexts}>
              {showMoreAppointmentHistory ? "View Less" : "View More"}
            </Text>
          </View>
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
  profileContainer: {
    alignItems: "center",
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 30,
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  seperatorLine: {
    width: 1,
    backgroundColor: "#ccc",
  },
  detailTitle: {
    fontSize: 14,
    color: "grey",
    lineHeight: 24,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
  },
  section: {
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: theme.colors.primary,
    padding: 5,
    color: "white",
    marginBottom: 30,
    position: "relative",
  },
  dateContainer: {
    position: "relative",
  },
  historyItem: {
    // marginTop: 20,
    marginBottom: 20,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: "#51ACFF",
    // padding: 30,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 15,
  },
  dateLineSeperator: {
    position: "absolute",
    top: 16,
    left: 105,
    height: 1,
    width: "70%",
    backgroundColor: theme.colors.primary,
  },
  historyDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  historyDetailTitle: {
    fontSize: 14,
    color: "grey",
    lineHeight: 40,
  },
  historyDetailValue: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 24,
  },
  arrowButton: {
    alignItems: "center",
    marginVertical: 10,
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
  viewMoreButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    marginTop: 10,
    width: 60,
  },
  viewMoreText: {
    color: "white",
    fontSize: 14,
  },
  appointmentItem: {
    marginBottom: 20,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 5,
  },
  appointmentDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  appointmentIcon: {
    marginRight: 10,
  },
  appointmentTime: {
    fontSize: 14,
  },
  appointmentTopic: {
    color: theme.colors.primary,
    lineHeight: 25,
  },
  appointmentDoctor: {
    fontSize: 14,
    lineHeight: 25,
    color: "grey",
  },
});

export default PatientHistory;
