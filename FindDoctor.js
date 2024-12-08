import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "./Theme";

const FindDoctor = ({ navigation }) => {
  const [nameQuery, setNameQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [countryQuery, setCountryQuery] = useState("");

  const doctors = [
    {
      id: "1",
      name: "Dr. Anayat Ullah Kazmi",
      city: "Islamabad, Pakistan",
      profilePic: require("./assets/userprofile.png"),
    },
    {
      id: "2",
      name: "Dr. Ayesha Khan",
      city: "Lahore, Pakistan",
      profilePic: require("./assets/userprofile.png"),
    },
    {
      id: "3",
      name: "Dr. Farhan Ali",
      city: "Karachi, Pakistan",
      profilePic: require("./assets/userprofile.png"),
    },
    {
      id: "4",
      name: "Dr. John Doe",
      city: "New York, USA",
      profilePic: require("./assets/userprofile.png"),
    },
  ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
      doctor.city.toLowerCase().includes(cityQuery.toLowerCase()) &&
      doctor.city.toLowerCase().includes(countryQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Doctor</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        value={nameQuery}
        onChangeText={(text) => setNameQuery(text)}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search by city"
        value={cityQuery}
        onChangeText={(text) => setCityQuery(text)}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search by country"
        value={countryQuery}
        onChangeText={(text) => setCountryQuery(text)}
      />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.profilePic} style={styles.profilePic} />
            <View style={styles.cardContent}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.doctorCity}>{item.city}</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No doctors found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  doctorCity: {
    fontSize: 14,
    color: "#777",
  },
  noResultsText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },
});

export default FindDoctor;
