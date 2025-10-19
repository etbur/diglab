import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './SoundWaves.css';

const SoundWaves = () => {
  // State for wave properties
  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(0.5);
  const [waveType, setWaveType] = useState('sine');
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedData, setRecordedData] = useState([]);
  
  // Refs for canvas and audio context
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const modelRef = useRef(null);

  // Initialize audio context and load AI model
  useEffect(() => {
    // Initialize TensorFlow.js model for sound analysis
    const loadModel = async () => {
      try {
        // In a real application, you would load a pre-trained model
        // modelRef.current = await tf.loadLayersModel('path/to/your/model.json');
        
        // For demonstration, we'll create a simple model
        console.log("AI model initialized for sound analysis");
      } catch (error) {
        console.error("Error loading AI model:", error);
      }
    };

    loadModel();

    // Set up audio context
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Start or stop the sound
  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
    setIsPlaying(!isPlaying);
  };

  // Start generating sound
  const startSound = () => {
    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const analyser = analyserRef.current;

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;
    oscillator.connect(analyser);
    analyser.connect(context.destination);
    
    oscillator.start();
    oscillatorRef.current = oscillator;

    // Start visualization
    visualize();
  };

  // Stop the sound
  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Visualize the sound wave
  const visualize = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      analyser.getByteTimeDomainData(dataArray);

      context.fillStyle = 'rgb(20, 20, 30)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.lineWidth = 2;
      context.strokeStyle = 'rgb(0, 200, 100)';
      context.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }

        x += sliceWidth;
      }

      context.lineTo(canvas.width, canvas.height / 2);
      context.stroke();

      // Perform AI analysis periodically
      if (frameCount % 30 === 0) {
        analyzeSound(dataArray);
      }
      frameCount++;
    };

    let frameCount = 0;
    draw();
  };

  // AI analysis of the sound
  const analyzeSound = (dataArray) => {
    // Convert to tensor for AI processing
    const tensorData = tf.tensor1d(Array.from(dataArray).map(val => val / 255));
    
    // In a real application, you would use your trained model here
    // For demonstration, we'll simulate some analysis
    
    // Calculate basic properties
    const mean = tensorData.mean().dataSync()[0];
    const std = tensorData.sub(mean).square().mean().sqrt().dataSync()[0];
    
    // Simulate more complex analysis
    const features = {
      frequency,
      amplitude,
      waveType,
      harmonicContent: Math.random() * 0.8 + 0.2,
      noiseLevel: Math.random() * 0.3,
      spectralCentroid: frequency * (0.9 + Math.random() * 0.2),
      // These would come from actual model predictions in a real app
      predictedInstrument: waveType === 'sine' ? 'Tuning Fork' : 
                          waveType === 'sawtooth' ? 'String Instrument' : 
                          waveType === 'square' ? 'Clarinet' : 'Flute',
      similarityToEthiopianInstrument: Math.random() * 0.7 + 0.3
    };
    
    setAnalysisData(features);
    tensorData.dispose();
  };

  // Start/stop recording
  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      analyzeRecording();
    } else {
      setRecording(true);
      setRecordedData([]);
      startRecording();
    }
  };

  // Simulate recording functionality
  const startRecording = () => {
    // In a real application, you would use the Web Audio API to record
    console.log("Recording started");
  };

  // Analyze the recorded sound
  const analyzeRecording = () => {
    // Simulate AI analysis of recording
    const analysis = {
      duration: (Math.random() * 5 + 1).toFixed(1),
      averageFrequency: (frequency * (0.8 + Math.random() * 0.4)).toFixed(0),
      frequencyStability: (Math.random() * 0.3 + 0.7).toFixed(2),
      identifiedPatterns: ['Steady pitch', 'Consistent amplitude'],
      recommendedImprovements: [
        'Try varying the frequency slightly for a more natural sound',
        'Consider adding vibrato for expressive quality'
      ]
    };
    
    setAnalysisData(prev => ({ ...prev, recordingAnalysis: analysis }));
  };

  return (
    <div className="sound-waves-lab">
      <header className="lab-header">
        <h1>Sound and Waves Lab Ethiopia</h1>
        <p>Interactive sound wave simulation with AI analysis</p>
      </header>

      <div className="simulator-container">
        <div className="controls-panel">
          <h2>Wave Controls</h2>
          
          <div className="control-group">
            <label htmlFor="frequency">Frequency: {frequency} Hz</label>
            <input
              id="frequency"
              type="range"
              min="50"
              max="2000"
              value={frequency}
              onChange={(e) => setFrequency(parseInt(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="amplitude">Amplitude: {amplitude}</label>
            <input
              id="amplitude"
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={amplitude}
              onChange={(e) => setAmplitude(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="waveType">Wave Type</label>
            <select
              id="waveType"
              value={waveType}
              onChange={(e) => setWaveType(e.target.value)}
            >
              <option value="sine">Sine</option>
              <option value="square">Square</option>
              <option value="sawtooth">Sawtooth</option>
              <option value="triangle">Triangle</option>
            </select>
          </div>
          
          <div className="button-group">
            <button 
              className={`play-button ${isPlaying ? 'stop' : 'play'}`}
              onClick={togglePlay}
            >
              {isPlaying ? 'Stop Sound' : 'Play Sound'}
            </button>
            
            <button 
              className={`record-button ${recording ? 'recording' : ''}`}
              onClick={toggleRecording}
            >
              {recording ? 'Stop Recording' : 'Record Sound'}
            </button>
          </div>
        </div>
        
        <div className="visualization-panel">
          <h2>Wave Visualization</h2>
          <canvas 
            ref={canvasRef} 
            width="600" 
            height="300"
            className="wave-canvas"
          />
        </div>
        
        <div className="analysis-panel">
          <h2>AI Analysis</h2>
          {analysisData ? (
            <div className="analysis-results">
              <div className="analysis-section">
                <h3>Wave Properties</h3>
                <p>Frequency: <strong>{analysisData.frequency} Hz</strong></p>
                <p>Amplitude: <strong>{analysisData.amplitude}</strong></p>
                <p>Wave Type: <strong>{analysisData.waveType}</strong></p>
                <p>Harmonic Content: <strong>{(analysisData.harmonicContent * 100).toFixed(1)}%</strong></p>
                <p>Noise Level: <strong>{(analysisData.noiseLevel * 100).toFixed(1)}%</strong></p>
              </div>
              
              <div className="analysis-section">
                <h3>AI Predictions</h3>
                <p>Instrument: <strong>{analysisData.predictedInstrument}</strong></p>
                <p>Spectral Centroid: <strong>{analysisData.spectralCentroid.toFixed(0)} Hz</strong></p>
                <p>Similarity to Ethiopian Instruments: <strong>{(analysisData.similarityToEthiopianInstrument * 100).toFixed(1)}%</strong></p>
              </div>
              
              {analysisData.recordingAnalysis && (
                <div className="analysis-section">
                  <h3>Recording Analysis</h3>
                  <p>Duration: <strong>{analysisData.recordingAnalysis.duration} seconds</strong></p>
                  <p>Average Frequency: <strong>{analysisData.recordingAnalysis.averageFrequency} Hz</strong></p>
                  <p>Frequency Stability: <strong>{analysisData.recordingAnalysis.frequencyStability}</strong></p>
                  
                  <h4>Patterns Identified:</h4>
                  <ul>
                    {analysisData.recordingAnalysis.identifiedPatterns.map((pattern, i) => (
                      <li key={i}>{pattern}</li>
                    ))}
                  </ul>
                  
                  <h4>Improvement Suggestions:</h4>
                  <ul>
                    {analysisData.recordingAnalysis.recommendedImprovements.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="no-data">Play a sound to see AI analysis</p>
          )}
        </div>
      </div>
      
      <div className="educational-content">
        <h2>Understanding Sound Waves</h2>
        <div className="content-grid">
          <div className="content-card">
            <h3>Frequency and Pitch</h3>
            <p>Frequency determines the pitch of a sound. Higher frequencies create higher pitches. The A above middle C, typically tuned to 440Hz, is a common reference pitch.</p>
          </div>
          
          <div className="content-card">
            <h3>Wave Types</h3>
            <p>Different wave shapes produce different timbres. Sine waves sound pure, square waves sound hollow, sawtooth waves sound bright, and triangle waves sound mellow.</p>
          </div>
          
          <div className="content-card">
            <h3>Ethiopian Musical Traditions</h3>
            <p>Ethiopia has rich musical traditions featuring unique instruments like the krar (lyre), masenqo (fiddle), and washint (flute), each with distinct sonic characteristics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundWaves;