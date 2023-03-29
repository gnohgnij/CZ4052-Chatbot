import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Line,
  Svg,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    margin: 40,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    display: "block",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    display: "block",
    marginBottom: 20,
  },
  sectionTitle: {
    textAlign: "left",
    fontSize: 25,
    display: "block",
    fontWeight: "bold",
    marginLeft: 20,
  },
});

const Resume = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>Chong Jing Hong</Text>
        </View>
        <View style={styles.subtitle}>
          <Text>congjinghong@gmail.com | +65 90482091</Text>
        </View>
        <Svg height="210" width="500">
          <Line
            x1="0"
            y1="200"
            x2="200"
            y2="200"
            strokeWidth={2}
            stroke="rgb(255,0,0)"
          />
        </Svg>
        <View style={styles.sectionTitle}>
          <Text>Education</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Resume;
