import React, { useState, useEffect } from "react";

const Indicators = () => {
  // Inline styles
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      paddingBottom: "20px",
      borderBottom: "1px solid #eee"
    },
    content: {
      lineHeight: "1.6",
      marginBottom: "30px"
    },
    featuresSection: {
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "20px"
    },
    featuresList: {
      listStyleType: "disc",
      paddingLeft: "20px"
    },
    section: {
      marginTop: "30px"
    },
    simulationContainer: {
      marginTop: "40px",
      textAlign: "center"
    },
    colorBox: {
      width: "150px",
      height: "150px",
      margin: "0 auto 20px",
      borderRadius: "12px",
      boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      transition: "background-color 1s ease"
    },
    phValue: {
      fontSize: "24px",
      fontWeight: "bold"
    }
  };

  // State for pH value
  const [phValue, setPhValue] = useState(7);

  // Simulate real-time pH changes every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newPh = parseFloat((Math.random() * 14).toFixed(2));
      setPhValue(newPh);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to get color by pH (red to green to blue)
  const getColorByPh = (ph) => {
    if (ph < 7) {
      // Red to yellow gradient (acidic)
      const t = ph / 7;
      const r = 255;
      const g = Math.round(255 * t);
      const b = 0;
      return `rgb(${r},${g},${b})`;
    } else if (ph === 7) {
      // Pure green neutral
      return "rgb(0,255,0)";
    } else {
      // Green to blue gradient (basic)
      const t = (ph - 7) / 7;
      const r = 0;
      const g = Math.round(255 * (1 - t));
      const b = 255;
      return `rgb(${r},${g},${b})`;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Indicators (Litmus, Universal) Lab Ethiopia</h1>
      </header>
      
      <main>
        <section style={styles.content}>
          <p>
            Welcome to the Indicators Lab section. Here you can find information about 
            various chemical indicators including litmus and universal indicators 
            used in our laboratory.
          </p>
        </section>
        
        <section style={styles.featuresSection}>
          <h2>Available Resources</h2>
          <ul style={styles.featuresList}>
            <li>Indicator specifications and properties</li>
            <li>Usage guidelines and best practices</li>
            <li>Safety information and handling procedures</li>
            <li>Experimental protocols and methodologies</li>
            <li>pH range charts and color change data</li>
            <li>Storage and shelf-life information</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2>About Our Lab</h2>
          <p>
            The Lab Ethiopia Indicators Division specializes in the research and 
            application of chemical indicators for various scientific and industrial 
            applications. Our team of experts ensures the highest quality standards 
            for all our indicator products.
          </p>
        </section>

        {/* Real-time simulation */}
        <section style={styles.simulationContainer}>
          <h2>Real-Time pH Indicator Simulation</h2>
          <div
            style={{
              ...styles.colorBox,
              backgroundColor: getColorByPh(phValue)
            }}
          />
          <div style={styles.phValue}>Simulated pH Value: {phValue}</div>
          <p>
            The color above simulates the color change of litmus/universal indicators in real time.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Indicators;
