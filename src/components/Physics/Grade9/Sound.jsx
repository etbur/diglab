import React, { useState, useEffect, useRef } from "react";

const Sound = () => {
  const [frequency, setFrequency] = useState(440); // Hz (A4 pitch)
  const [amplitude, setAmplitude] = useState(0.5); // Volume (0 to 1)
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const phaseRef = useRef(0);

  // Start or stop sound
  useEffect(() => {
    if (isPlaying) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      oscillatorRef.current = audioCtxRef.current.createOscillator();
      gainNodeRef.current = audioCtxRef.current.createGain();

      oscillatorRef.current.type = "sine";
      oscillatorRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.setValueAtTime(amplitude, audioCtxRef.current.currentTime);

      oscillatorRef.current.connect(gainNodeRef.current).connect(audioCtxRef.current.destination);
      oscillatorRef.current.start();

      return () => {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        gainNodeRef.current.disconnect();
        audioCtxRef.current.close();
      };
    }
  }, [isPlaying]);

  // Update frequency and amplitude in real time
  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(amplitude, audioCtxRef.current.currentTime);
    }
  }, [frequency, amplitude]);

  // Wave visualization on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#1565c0";

      const samples = width;
      for (let x = 0; x < samples; x++) {
        // Map x to time
        const t = x / samples;
        // Calculate sine wave value at time t with frequency and amplitude
        const y =
          height / 2 -
          Math.sin(2 * Math.PI * frequency * t + phaseRef.current) * (amplitude * height) / 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phaseRef.current += 0.1;

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationRef.current);
  }, [frequency, amplitude]);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0d47a1" }}>Sound Lab Ethiopia</h1>

      <section
        style={{
          padding: 20,
          backgroundColor: "#e3f2fd",
          borderRadius: 12,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          marginBottom: 30,
        }}
      >
        <h2 style={{ color: "#1976d2" }}>Sound Wave Controls</h2>

        <label style={{ display: "block", marginBottom: 15 }}>
          Frequency (Pitch): {frequency} Hz
          <input
            type="range"
            min={20}
            max={2000}
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            style={{ width: "100%", marginTop: 8 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 15 }}>
          Amplitude (Volume): {(amplitude * 100).toFixed(0)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            style={{ width: "100%", marginTop: 8 }}
          />
        </label>

        <button
          onClick={() => setIsPlaying((p) => !p)}
          style={{
            padding: "10px 25px",
            fontSize: 16,
            fontWeight: "bold",
            backgroundColor: isPlaying ? "#d32f2f" : "#388e3c",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
          aria-pressed={isPlaying}
        >
          {isPlaying ? "Stop Sound" : "Play Sound"}
        </button>
      </section>

      <section
        style={{
          padding: 20,
          backgroundColor: "#bbdefb",
          borderRadius: 12,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#0d47a1" }}>Sound Wave Visualization</h2>
        <canvas
          ref={canvasRef}
          width={700}
          height={150}
          style={{ width: "100%", borderRadius: 8, backgroundColor: "#e3f2fd" }}
          aria-label="Sound wave visualization"
        />
        <p style={{ marginTop: 15, fontSize: 14 }}>
          Adjust the frequency to change the pitch of the sound. Adjust amplitude to change the volume.
          The waveform above updates in real-time to show the sound wave shape.
        </p>
      </section>
    </div>
  );
};

export default Sound;
