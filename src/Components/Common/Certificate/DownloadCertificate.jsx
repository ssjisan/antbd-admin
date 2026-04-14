import {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        position: "relative",
        width: 842, // A4 landscape width
        height: 595, // A4 landscape height
      },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  name: {
    position: "absolute",
    top: 248,
    left: 96,
    fontSize: 40,
    fontWeight: "bold",
  },
  course: {
    position: "absolute",
    top: 360,
    left: 96,
    fontSize: 20,
  },
  asRole: {
    position: "absolute",
    top: 430,
    left: 120,
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    position: "absolute",
    top: 518,
    left: 96,
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    position: "absolute",
    top: 518,
    left: 300,
    fontSize: 16,
    fontWeight: "bold",
  },
  signature: {
    position: "absolute",
    bottom: 140,
    width: 120,
    height: 50,
  },
  signatureText: {
    position: "absolute",
    top: 654,
    fontSize: 12,
    fontWeight: "bold",
  },
});

const DownloadCertificate = ({
  name,
  course,
  backgroundUrl,
  asRole,
  date,
  location,
  firstSignature,
  firstSignatureName,
  firstSignatureDesignation,
  secondSignature,
  secondSignatureName,
  secondSignatureDesignation,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Image src={backgroundUrl} style={styles.background} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.course}>{course}</Text>
      <Text style={styles.asRole}>{asRole}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.location}>{location}</Text>

      <Image src={firstSignature} style={{ ...styles.signature, left: 482 }} />
      <View style={{ ...styles.signatureText, left: 482 }}>
        <Text style={{ fontSize: 13 }}>{firstSignatureName}</Text>
        <Text style={{ fontSize: 12, fontWeight: "normal" }}>
          {firstSignatureDesignation}
        </Text>
      </View>

      <Image src={secondSignature} style={{ ...styles.signature, left: 700 }} />
      <View style={{ ...styles.signatureText, left: 700 }}>
        <Text style={{ fontSize: 13 }}>{secondSignatureName}</Text>
        <Text style={{ fontSize: 12, fontWeight: "normal" }}>
          {secondSignatureDesignation}
        </Text>
      </View>
    </Page>
  </Document>
);

export default DownloadCertificate;
