import PropTypes from "prop-types";

export default function Preview({
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
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "1123px", // A4 Landscape: 1123x794 @ 96dpi
        height: "794px",
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "248px",
          left: "96px",
          fontSize: "40px",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {name}
      </div>
      <div
        style={{
          position: "absolute",
          top: "360px",
          left: "96px",
          fontSize: "20px",
          color: "#000",
        }}
      >
        {course}
      </div>
      <div
        style={{
          position: "absolute",
          top: "430px",
          left: "120px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#000",
        }}
      >
        {asRole}
      </div>
      <div
        style={{
          position: "absolute",
          top: "518px",
          left: "96px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#000",
        }}
      >
        {date}
      </div>
      <div
        style={{
          position: "absolute",
          top: "518px",
          left: "300px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#000",
        }}
      >
        {location}
      </div>
      <img
        src={firstSignature}
        alt="Signature"
        style={{
          position: "absolute",
          bottom: "140px",
          left: "482px",
          width: "120px",
          height: "50px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "654px", // adjust this as needed
          left: "482px", // align with signature1
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          fontWeight: "700",
          fontSize: "14px",
          color: "#000",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: "700" }}>
          {firstSignatureName}
        </div>
        <div style={{ fontSize: "12px", fontWeight: "500" }}>
          {firstSignatureDesignation}
        </div>
      </div>
      <img
        src={secondSignature}
        alt="Signature"
        style={{
          position: "absolute",
          bottom: "140px",
          left: "700px",
          width: "120px",
          height: "50px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "654px", // adjust this as needed
          left: "700px", // align with signature1
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: "700" }}>
          {secondSignatureName}
        </div>
        <div style={{ fontSize: "12px", fontWeight: "500" }}>
          {secondSignatureDesignation}
        </div>
      </div>
    </div>
  );
}

Preview.propTypes = {
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
