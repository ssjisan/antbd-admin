import Preview from "./Preview";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import PropTypes from "prop-types";
// import DownloadCertificate from "./DownloadCertificate";

export default function Certificate({
  name,
  course,
  signatureUrl,
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
}) {
  return (
    <>
      {/* <div style={{ margin: "20px 0" }}>
        <PDFDownloadLink
          document={
            <DownloadCertificate
              name={name}
              course={course}
              backgroundUrl={backgroundUrl}
              asRole={asRole}
              date={date}
              location={location}
              firstSignature={firstSignature}
              firstSignatureName={firstSignatureName}
              firstSignatureDesignation={firstSignatureDesignation}
              secondSignature={secondSignature}
              secondSignatureName={secondSignatureName}
              secondSignatureDesignation={secondSignatureDesignation}
            />
          }
          fileName={`${name.replace(/\s+/g, "_")}_certificate.pdf`}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          {({ loading }) =>
            loading ? (
              <button disabled>Preparing PDF...</button>
            ) : (
              <button>Download Certificate</button>
            )
          }
        </PDFDownloadLink>
      </div> */}

      <Preview
        name={name}
        course={course}
        signatureUrl={signatureUrl}
        backgroundUrl={backgroundUrl}
        asRole={asRole}
        date={date}
        location={location}
        firstSignature={firstSignature}
        firstSignatureName={firstSignatureName}
        firstSignatureDesignation={firstSignatureDesignation}
        secondSignature={secondSignature}
        secondSignatureName={secondSignatureName}
        secondSignatureDesignation={secondSignatureDesignation}
      />
    </>
  );
}

Certificate.propTypes = {
  name: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  signatureUrl: PropTypes.string,
  backgroundUrl: PropTypes.string.isRequired,
  asRole: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  firstSignature: PropTypes.string,
  firstSignatureName: PropTypes.string,
  firstSignatureDesignation: PropTypes.string,
  secondSignature: PropTypes.string,
  secondSignatureName: PropTypes.string,
  secondSignatureDesignation: PropTypes.string,
};
