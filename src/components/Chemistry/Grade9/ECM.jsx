// src/ECM.js
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Animated sphere component
function AnimatedSphere({ position, color }) {
  const meshRef = React.useRef();
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    meshRef.current.rotation.y = elapsed;
    meshRef.current.position.y = position[1] + Math.sin(elapsed) * 0.2;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const ECM = () => {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: 30,
          borderBottom: "1px solid #ddd",
          paddingBottom: 20,
        }}
      >
        <h1>Elements, Compounds, and Mixtures Lab Ethiopia</h1>
      </header>

      <main style={{ lineHeight: 1.6 }}>
        <section style={{ marginBottom: 30 }}>
          <h2>Welcome to Our Chemistry Lab</h2>
          <p>
            Explore the fascinating world of elements, compounds, and mixtures
            through our research and educational resources based in Ethiopia.
          </p>
        </section>

        <section style={{ marginBottom: 30 }}>
          <h2>Elements</h2>
          <p>Information and research about chemical elements found in nature.</p>
        </section>

        <section style={{ marginBottom: 30 }}>
          <h2>Compounds</h2>
          <p>Details on chemical compounds, their properties, and applications.</p>
        </section>

        <section style={{ marginBottom: 30 }}>
          <h2>Mixtures</h2>
          <p>Learn about mixtures, their types, and how they differ from compounds.</p>
        </section>

        <section style={{ marginBottom: 30 }}>
          <h2>About Us</h2>
          <p>
            The Lab Ethiopia Chemistry division is dedicated to advancing chemical
            sciences through education and research.
          </p>
        </section>

        <section style={{ marginBottom: 30 }}>
          <h2>Contact</h2>
          <p>Email: info@labethiopia.com</p>
          <p>Phone: +251 123 456 789</p>
          <p>Address: Addis Ababa, Ethiopia</p>
        </section>

        {/* 3D Simulation Section */}
        <section
          style={{
            height: 400,
            border: "1px solid #ccc",
            borderRadius: 8,
            marginTop: 40,
          }}
        >
          <h2 style={{ textAlign: "center" }}>3D Lab Simulation</h2>
          <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} />
            <AnimatedSphere position={[-1.5, 0, 0]} color="tomato" />
            <AnimatedSphere position={[0, 0, 0]} color="skyblue" />
            <AnimatedSphere position={[1.5, 0, 0]} color="limegreen" />
            <OrbitControls />
          </Canvas>
          <p style={{ textAlign: "center", marginTop: 10 }}>
            Red sphere = Element | Blue sphere = Compound | Green sphere = Mixture
          </p>
        </section>
      </main>

      <footer
        style={{
          textAlign: "center",
          marginTop: 40,
          borderTop: "1px solid #ddd",
          paddingTop: 10,
          color: "#666",
        }}
      >
        <p>© {new Date().getFullYear()} Elements, Compounds, and Mixtures Lab Ethiopia</p>
      </footer>
    </div>
  );
};

export default ECM;
