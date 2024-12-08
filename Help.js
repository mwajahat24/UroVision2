import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTopic, setExpandedTopic] = useState(null); // Tracks which topic is expanded

  const helpTopics = [
    {
      id: 1,
      title: "How to use the app",
      description: "Learn how to navigate and use all the features of the app.",
      details:
        "To use the app, navigate through the menu to access various features such as tracking symptoms, scanning reports, and scheduling consultations. Ensure you are logged in to save your data.",
    },
    {
      id: 2,
      title: "Account settings",
      description: "Manage your account settings and preferences.",
      details:
        "In the account settings, you can update your profile, change your password, and manage your notification preferences.",
    },
    {
      id: 3,
      title: "Privacy and security",
      description:
        "Understand our privacy policies and how we secure your data.",
      details:
        "Your data is encrypted and stored securely. We do not share your information with third parties without your consent. Review the Privacy Policy in the settings for more details.",
    },
    {
      id: 4,
      title: "Troubleshooting",
      description: "Find solutions to common issues and problems.",
      details:
        "If you encounter issues, try restarting the app, checking your internet connection, or clearing the app cache. For persistent issues, contact support.",
    },
    {
      id: 5,
      title: "Contact support",
      description: "How to get in touch with our support team.",
      details:
        "You can contact our support team through the 'Contact Us' section in the app or email us at support@example.com. Response times are typically within 24 hours.",
    },
  ];

  const filteredTopics = helpTopics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTopic = (id) => {
    setExpandedTopic((prevId) => (prevId === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search help topics"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={styles.topicsContainer}>
        {filteredTopics.map((topic) => (
          <View key={topic.id} style={styles.topic}>
            <TouchableOpacity
              style={styles.topicHeader}
              onPress={() => toggleTopic(topic.id)}
            >
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicDescription}>{topic.description}</Text>
            </TouchableOpacity>
            {expandedTopic === topic.id && (
              <View style={styles.topicDetails}>
                <Text style={styles.detailsText}>{topic.details}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  topicsContainer: {
    flex: 1,
  },
  topic: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  topicHeader: {
    padding: 15,
    borderRadius: 10,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topicDescription: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  topicDetails: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Help;
