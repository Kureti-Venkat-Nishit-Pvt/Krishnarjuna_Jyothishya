import React from "react";

export default function App() {
  const services = [
    "Ask Any Questions (With or Without Date of Birth)",
    "Job Time, Suitable Field, Job Change Time",
    "Government Job Yoga",
    "Business Yoga, Income, Profit or Loss",
    "Money Problems & Remedies",
    "Prosperity, Good & Bad Time in Life",
    "Marriage Time & Matching",
    "Love or Arranged Marriage",
    "Property / Vehicle / Own House Yoga",
    "Foreign Settlement Yoga",
    "Palmistry & Numerology",
    "Suitable Gemstone & Ring Guidance",
  ];

  return (
    <div style={{
      background: "linear-gradient(to bottom, #2b0000, #000)",
      color: "#fff8dc",
      minHeight: "100vh",
      fontFamily: "serif",
      padding: "20px"
    }}>
      <div style={{maxWidth: "1200px", margin: "0 auto"}}>
        <h1 style={{
          color: "#ffd700",
          fontSize: "60px",
          fontWeight: "bold",
          textAlign: "center"
        }}>
          KRISHNARJUNA JYOTHISHA
        </h1>

        <p style={{
          textAlign: "center",
          fontSize: "24px",
          marginTop: "20px"
        }}>
          “Based on previous birth karma, destiny is decided before birth.
          We are the master of our destiny!”
        </p>

        <div style={{
          marginTop: "40px",
          background: "#3d0909",
          padding: "30px",
          borderRadius: "20px",
          border: "2px solid gold"
        }}>
          <h2 style={{color: "#ffd700"}}>WE PREDICT PAST THEN FUTURE</h2>

          <p style={{fontSize: "18px", lineHeight: "1.8"}}>
            My friend Shreyas Abhimanya has studied astrology for 5 years and
            earned a Master's Degree in Astrology. His predictions have guided
            many people with nearly 90% accurate results.
          </p>
        </div>

        <h2 style={{
          color: "#ffd700",
          marginTop: "60px",
          fontSize: "40px",
          textAlign: "center"
        }}>
          Astrology Services
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px"
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: "#4b0000",
              padding: "20px",
              borderRadius: "20px",
              border: "1px solid gold"
            }}>
              ✨ {service}
            </div>
          ))}
        </div>

        <h2 style={{
          color: "#ffd700",
          marginTop: "60px",
          fontSize: "40px",
          textAlign: "center"
        }}>
          Consultation Fees
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          marginTop: "30px"
        }}>
          {[
            ["20 Min", "₹250"],
            ["30 Min", "₹350"],
            ["40 Min", "₹500"],
            ["50 Min", "₹600"],
            ["1 Hour", "₹700"],
          ].map((item, i) => (
            <div key={i} style={{
              background: "#1a1a1a",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              border: "2px solid gold"
            }}>
              <h3>{item[0]}</h3>
              <h1 style={{color: "#ffd700"}}>{item[1]}</h1>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: "60px",
          background: "#2b0000",
          padding: "30px",
          borderRadius: "20px",
          border: "2px solid gold"
        }}>
          <h2 style={{color: "#ffd700"}}>Payment Details</h2>

          <p><b>PhonePe No:</b> 8147457441</p>
          <p><b>Account Name:</b> SHREYAS YN</p>
          <p><b>WhatsApp:</b> 9449708568</p>

          <a
            href="https://wa.me/919449708568"
            style={{
              display: "inline-block",
              marginTop: "20px",
              background: "#ffd700",
              color: "#000",
              padding: "15px 25px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Message on WhatsApp
          </a>
        </div>

        <div style={{
          textAlign: "center",
          marginTop: "60px",
          color: "#ffd700",
          fontSize: "28px",
          fontWeight: "bold"
        }}>
          🙏 ಶ್ರೀ ಕೃಷ್ಣಾರ್ಪಣಮಸ್ತು 🙏
          <br />
          🙏 Sri Krishnarpanamasthu 🙏
        </div>
      </div>
    </div>
  );
}
