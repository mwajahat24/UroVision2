import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import DynamicWidthText from "./DynamicWidthText";
import theme from "./Theme";
import * as Print from "expo-print"; // Import expo-print
import * as Sharing from "expo-sharing"; // Import expo-sharing
import * as FileSystem from "expo-file-system";

function DiagnosisReport({ route, navigation }) {
  const { result, imageUri, numStones, stoneInfo, confidence } = route.params;

  const calculateAverageStoneSize = (stones) => {
    if (!stones || stones.length === 0) return "N/A";
    let totalWidth = 0;
    let totalHeight = 0;
    stones.forEach((stone) => {
      const [width, height] = stone.size
        .split("x")
        .map((dim) => parseFloat(dim.trim()));
      totalWidth += width;
      totalHeight += height;
    });
    const averageWidth = totalWidth / stones.length;
    const averageHeight = totalHeight / stones.length;
    return `${averageWidth.toFixed(1)} mm x ${averageHeight.toFixed(1)} mm`;
  };

  const getMostSevereStoneInfo = (stones) => {
    if (!stones || stones.length === 0)
      return { severity: "N/A", recommendation: "N/A" };
    const severityOrder = { Mild: 1, Moderate: 2, Severe: 3 };
    const mostSevereStone = stones.reduce((prev, current) => {
      const prevSeverityValue = severityOrder[prev.severity] || 0;
      const currentSeverityValue = severityOrder[current.severity] || 0;
      return currentSeverityValue > prevSeverityValue ? current : prev;
    });
    return {
      severity: mostSevereStone.severity || "N/A",
      recommendation: mostSevereStone.recommendation || "N/A",
    };
  };

  const averageStoneSize = calculateAverageStoneSize(stoneInfo);
  const { severity, recommendation } = getMostSevereStoneInfo(stoneInfo);

  // Function to generate and share PDF

  const generatePDF = async () => {
    const base64Image =
      "data:image/png;base64,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";

    const htmlContent = `
      <html>
  <head>
    <style>
      body {
        font-family: "Poppins", sans-serif;
        color: #333;
        background-color: #f0f8ff;
        padding: 20px;
      }
      .container {
        max-width: 750px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        font-size: 14px;
      }
      .header {
        background: linear-gradient(135deg, #4682b4, #5f9ea0);
        padding: 30px;
        color: #fff;
        text-align: center;
      }
      .header h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 0;
      }
      .header p {
        margin-top: 5px;
        font-style: italic;
      }
      .info-section {
        background: #e6f2ff;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px; /* Space between each info-box */
      }
      .info-box {
        flex: 1;
        min-width: 150px;
      }
      .info-box h3 {
        color: #4682b4;
        font-size: 16px;
        margin: 0;
        padding-bottom: 5px; /* Vertical space between label and value */
        text-align: center;
      }
      .info-box p {
        font-weight: bold;
        margin: 0;
        color: #333;
        text-align: center;
      }
      .report-section {
        background: #f5fafd;
        padding: 25px;
        text-align: left;
      }
      .report-title {
        color: #5f9ea0;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: center;
      }
      .report-detail {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
      }
      .report-detail span {
        display: block;
        color: #555;
      }
      .report-detail .label {
        font-weight: bold;
        color: #4682b4;
      }
      .recommendation-text {
        margin-top: 10px;
        padding: 10px;
        background: #e0f7fa;
        border-radius: 5px;
        color: #333;
      }
      .recommendations-section {
        padding: 25px;
        background: #d7f0fa;
        text-align: left;
      }
      .recommendations-section h3 {
        font-size: 18px;
        margin-bottom: 15px;
        color: #4682b4;
        text-align: center;
      }
      .recommendations-list {
        list-style-type: none;
        padding: 0;
        font-weight: bold;
        color: #333;
      }
      .recommendations-list li {
        padding: 5px 0;
      }
      .footer {
        background-color: #4682b4;
        color: #fff;
        text-align: center;
        padding: 15px;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header Section -->
      <div class="header">
        <h1>CT Scan Analysis Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>

      <!-- Patient Information Section in Single Row with Central Alignment and Spacing -->
      <div class="info-section">
        <div class="info-box">
          <h3>Patient Name</h3>
          <p>Obaidullah</p>
        </div>
        <div class="info-box">
          <h3>Contact</h3>
          <p>0321-5679904</p>
        </div>
        <div class="info-box">
          <h3>City</h3>
          <p>Multan</p>
        </div>
        <div class="info-box">
          <h3>Age</h3>
          <p>24</p>
        </div>
      </div>

      <!-- Diagnosis Summary Section -->
      <div class="report-section">
        <h2 class="report-title">Diagnosis Summary</h2>
        <div class="report-detail">
          <span class="label">Predicted Condition:</span><span>${result}</span>
        </div>
        <div class="report-detail">
          <span class="label">Confidence Level:</span
          ><span>${Math.round(confidence * 100)}%</span>
        </div>
        <div class="report-detail">
          <span class="label">Number of Stones:</span
          ><span>${numStones || "N/A"}</span>
        </div>
        <div class="report-detail">
          <span class="label">Average Stone Size:</span
          ><span>${averageStoneSize}</span>
        </div>
        <div class="report-detail">
          <span class="label">Severity:</span><span>${severity}</span>
        </div>
        <div class="report-detail">
          <span class="label">Recommendation:</span>
        </div>
        <div class="recommendation-text">${recommendation}</div>
      </div>

      <!-- Recommendations Section -->
      <div class="recommendations-section">
        <h3>Recommendations</h3>
        <ul class="recommendations-list">
          <li>🔹 Hydration: Drink 6-8 glasses of water daily</li>
          <li>
            🔹 Dietary Changes: Reduce intake of protein, sodium, and oxalate
          </li>
        </ul>
      </div>

      <!-- Footer Section -->
      <div class="footer">
        <p>For more information, contact your healthcare provider.</p>
        <p>
          &copy; ${new Date().getFullYear()} Health Institute. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>


    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(
          "Sharing not available",
          "Your device does not support sharing."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };
  // const generatePDF = async () => {
  //   const htmlContent = `
  //     <html>
  //       <head>
  //         <style>
  //           body {
  //             font-family: Arial, sans-serif;
  //             padding: 20px;
  //             color: #333;
  //           }
  //           .header {
  //             text-align: center;
  //             border-bottom: 2px solid #007acc;
  //             padding-bottom: 10px;
  //             margin-bottom: 20px;
  //           }
  //           .header-logo {
  //             height: 50px;
  //             margin-bottom: 10px;
  //           }
  //           h1 {
  //             color: #007acc;
  //             font-size: 24px;
  //             margin-bottom: 5px;
  //           }
  //           .section-title {
  //             font-size: 18px;
  //             font-weight: bold;
  //             margin-top: 20px;
  //             border-bottom: 1px solid #ddd;
  //             padding-bottom: 5px;
  //             color: #555;
  //           }
  //           .text-bold {
  //             font-weight: bold;
  //             color: #007acc;
  //           }
  //           .table {
  //             width: 100%;
  //             border-collapse: collapse;
  //             margin-top: 10px;
  //           }
  //           .table th, .table td {
  //             padding: 8px 12px;
  //             border: 1px solid #ddd;
  //           }
  //           .table th {
  //             background-color: #f2f2f2;
  //             font-weight: bold;
  //             color: #333;
  //           }
  //           .table-row {
  //             display: flex;
  //             justify-content: space-between;
  //             margin-bottom: 8px;
  //           }
  //           .footer {
  //             margin-top: 30px;
  //             font-size: 12px;
  //             text-align: center;
  //             color: #999;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="header">
  //           <img src="assets/kidney.png" alt="Hospital Logo" class="header-logo" />
  //           <h1>CT Scan Report</h1>
  //           <p>Generated on ${new Date().toLocaleDateString()}</p>
  //         </div>

  //         <div class="section-title">Patient Information</div>
  //         <table class="table">
  //           <tr><th>Name</th><td>Obaidullah</td></tr>
  //           <tr><th>Phone</th><td>0321-5679904</td></tr>
  //           <tr><th>Gender</th><td>Male</td></tr>
  //           <tr><th>City</th><td>Multan</td></tr>
  //           <tr><th>Age</th><td>24</td></tr>
  //         </table>

  //         <div class="section-title">Diagnosis Report</div>
  //         <table class="table">
  //           <tr><th>Predicted Condition</th><td class="text-bold">${result}</td></tr>
  //           <tr><th>Confidence</th><td>${Math.round(
  //             confidence * 100
  //           )}%</td></tr>
  //           <tr><th>Number of Stones</th><td>${numStones || "N/A"}</td></tr>
  //           <tr><th>Average Stone Size</th><td>${averageStoneSize}</td></tr>
  //           <tr><th>Severity</th><td>${severity}</td></tr>
  //           <tr><th>Recommendation</th><td>${recommendation}</td></tr>
  //         </table>

  //         <div class="section-title">Recommendations</div>
  //         <ul>
  //           <li><span class="text-bold">Hydration:</span> Drink 6-8 glasses of water every day after 2 hours.</li>
  //           <li><span class="text-bold">Dietary Changes:</span> Reduce intake of protein, sodium, and oxalate.</li>
  //         </ul>

  //         <div class="footer">
  //           <p>For further consultation, please contact your healthcare provider.</p>
  //           <p>&copy; ${new Date().getFullYear()} Hospital Name. All rights reserved.</p>
  //         </div>
  //       </body>
  //     </html>
  //   `;

  //   try {
  //     const { uri } = await Print.printToFileAsync({ html: htmlContent });
  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(uri);
  //     } else {
  //       Alert.alert(
  //         "Sharing not available",
  //         "Your device does not support sharing."
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert("Error", "Failed to generate PDF.");
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CT Scan Report</Text>

        {/* Display the predicted result */}
        <Text style={styles.predictionResult}>
          Predicted Condition:{" "}
          <Text style={{ fontWeight: "bold", color: "red" }}>{result}</Text>
        </Text>

        {/* Display the confidence */}
        <Text style={styles.predictionResult}>
          Confidence: {Math.round(confidence * 100)}%
        </Text>

        <Text style={styles.subtitle}>
          Report generated based on the provided CT scan images. This report
          details the current kidney condition, including kidney stone
          specifics. Consultation with a doctor is recommended upon receiving
          the report.
        </Text>

        {/* Display the selected image */}
        {imageUri && (
          <Image
            source={{ uri: imageUri }} // Display the image passed from ScanScreen
            style={styles.scanImage}
          />
        )}

        <View style={styles.section}>
          <DynamicWidthText
            text="Patient Information"
            style={styles.sectionTitle}
          />
          <View style={styles.reportContainer}>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Name :</Text>
              <Text style={[styles.reportValue]}>Obaidullah</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Phone :</Text>
              <Text style={[styles.reportValue]}>0321-5679904</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Gender :</Text>
              <Text style={[styles.reportValue]}>Male</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>City :</Text>
              <Text style={[styles.reportValue]}>Multan</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Age :</Text>
              <Text style={[styles.reportValue]}>24</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <DynamicWidthText text="Current Report" style={styles.sectionTitle} />
          <View style={styles.reportContainer}>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Number of Stones :</Text>
              <Text style={[styles.reportValue, { color: "red" }]}>
                {numStones || "N/A"}
              </Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Average Stone Size :</Text>
              <Text style={[styles.reportValue, { color: "red" }]}>
                {averageStoneSize}
              </Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Severity :</Text>
              <Text style={[styles.reportValue, { color: "red" }]}>
                {severity}
              </Text>
            </View>
            <View
              style={[
                styles.reportRow,
                { flexDirection: "column", alignItems: "flex-start" },
              ]}
            >
              <Text style={styles.reportLabel}>Recommendation :</Text>
              <Text style={[styles.reportValue]}>{recommendation}</Text>
            </View>
            <View style={styles.reportRow}>
              <Text style={styles.reportLabel}>Report Date :</Text>
              <Text style={[styles.reportValue, { color: "red" }]}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <DynamicWidthText
            text="Recommendations"
            style={styles.sectionTitle}
          />
          <View style={styles.recommendationContainer}>
            <Ionicons
              name="water-outline"
              size={24}
              color="black"
              style={styles.recommendationIcon}
            />
            <View style={styles.recommendationTextContainer}>
              <Text style={styles.recommendationTitle}>Hydration</Text>
              <Text style={styles.recommendationText}>
                Drink 6-8 glasses of water every day after 2 hours.
              </Text>
            </View>
          </View>
          <View style={styles.recommendationContainer}>
            <Ionicons
              name="nutrition-outline"
              size={24}
              color="black"
              style={styles.recommendationIcon}
            />
            <View style={styles.recommendationTextContainer}>
              <Text style={styles.recommendationTitle}>Dietary Changes</Text>
              <Text style={styles.recommendationText}>
                Reduce intake of protein, sodium, and oxalate.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.downloadButton]}
            onPress={generatePDF}
          >
            <Text style={[styles.buttonText, styles.downloadButtonText]}>
              Download PDF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Share Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  header: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingTop: Constants.statusBarHeight - 15,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: "contain",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  predictionResult: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  subtitle: {
    textAlign: "justify",
    fontSize: 14,
    color: "#777777",
    marginBottom: 20,
  },
  scanImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  section: {
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
    backgroundColor: theme.colors.primary,
    color: "white",
    marginBottom: 20,
    position: "relative",
  },
  reportContainer: {
    backgroundColor: "#EEF5F8",
    padding: 10,
    borderRadius: 10,
  },
  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  reportLabel: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 34,
  },
  reportValue: {
    fontSize: 14,
  },
  recommendationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  recommendationIcon: {
    marginRight: 10,
    padding: 10,
  },
  recommendationTextContainer: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recommendationText: {
    fontSize: 14,
    color: "grey",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  downloadButton: {
    backgroundColor: "white",
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  downloadButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "400",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DiagnosisReport;
