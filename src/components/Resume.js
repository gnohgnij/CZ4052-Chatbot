import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Line,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Times-Bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  bold: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    textAlign: "left",
  },
  italic: {
    fontSize: 12,
    fontFamily: "Times-Italic",
    textAlign: "left",
  },
  regular: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    textAlign: "left",
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Resume = () => {
  const info = {
    name: "James Bond",
    email: "007@gmail.com",
    phone: "+65 12345678",
    education: {
      school: "MI6, London, United Kingdom",
      degree: "Bachelor in Espionage",
      start: "Aug 2005",
      end: "May 2021",
      gpa: "5.00/5.00",
    },
    jobs: [
      {
        title: "Agent",
        start: "Aug 2005",
        end: "May 2021",
        company: "MI6, London, United Kingdom",
        description: [
          "Served as a field agent for the British Secret Intelligence Service",
          "Assisted in the capture of many high-profile criminals",
          "Completed advanced training in hand-to-hand combat, marksmanship, and espionage techniques",
        ],
      },
      {
        title: "Special Air Service (SAS)",
        start: "Aug 2005",
        end: "May 2021",
        company: "Royal Air Force, London, United Kingdom",
        description: [
          "Served as a reconnaissance officer, gathering intelligence on enemy positions and movements",
          "Participated in numerous high-risk missions behind enemy lines",
          "Completed advanced training in parachuting, survival skills, and close-quarters combat",
        ],
      },
    ],
    skills: [
      "Espionage",
      "Hand-to-hand combat",
      "Marksmanship",
      "Parachuting",
      "Survival skills",
      "Close-quarters combat",
    ],
  };

  const jobs = info.jobs.map((job, index) => {
    return (
      <View key={index} style={{ marginBottom: 10 }}>
        <Text style={styles.bold}>{job.title}</Text>
        <Text style={styles.regular}>{job.company}</Text>
        <Text style={styles.italic}>
          {job.start} - {job.end}
        </Text>
        <Text style={styles.regular}>
          {job.description.map((desc, j) => {
            return (
              <Text key={j}>
                • {desc}
                <Text style={{ fontSize: 10 }}>{"\n"}</Text>
              </Text>
            );
          })}
        </Text>
      </View>
    );
  });

  const skills = info.skills.map((skill, index) => {
    return (
      <Text key={index} style={styles.regular}>
        • {skill}
        <Text style={{ fontSize: 10 }}>{"\n"}</Text>
      </Text>
    );
  });

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>{info.name}</Text>
        <Text style={styles.subtitle}>Email: {info.email}</Text>
        <Text style={styles.subtitle}>Phone Number: {info.phone}</Text>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        <Text style={styles.bold}>{info.education.degree}</Text>
        <Text style={styles.regular}>{info.education.school}</Text>
        <Text style={styles.italic}>
          {info.education.start} - {info.education.end}
        </Text>
        <Text style={styles.sectionTitle}>WORK EXPERIENCES</Text>
        {jobs}
        <Text style={styles.sectionTitle}>SKILLS</Text>
        {skills}
      </Page>
    </Document>
  );
};

export default Resume;
