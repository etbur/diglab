import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaAtom,
  FaRocket,
  FaMagnet,
  FaSun,
  FaWater,
  FaWind,
  FaBolt,
  FaEye,
  FaMicroscope,
  FaSpaceShuttle,
  FaMeteor,
  FaSatellite,
  FaRadiation,
  FaTachometerAlt,
  FaBalanceScale,
  FaCompressAlt,
  FaFire,
  FaSnowflake,
  FaWaveSquare,
  FaVolumeUp,
  FaLightbulb,
  FaSearch,
  FaGamepad,
  FaFlask,
  FaCogs,
  FaChartLine,
  FaUserAstronaut,
  FaShieldAlt,
  FaRobot,
  FaBrain,
  FaPuzzlePiece,
  FaTrophy,
  FaStopwatch,
  FaUsers,
  FaGlobeAmericas,
  FaMoon,
  FaStar,
  FaCloud,
  FaMountain,
  FaTree,
  FaCity,
  FaCar,
  FaPlane,
  FaShip,
  FaSubway,
  FaMobileAlt,
  FaWifi,
  FaSatelliteDish,
  FaVideo,
  FaMusic,  
  FaCamera,
  FaPlusCircle, 
  FaMicrochip,
  FaRunning,
  FaMedal
} from "react-icons/fa";

const PhysicsGameBoard = () => {
  const [hoveredGame, setHoveredGame] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GIF URLs for each physics game
  const physicsGameGifs = {
    // 🔬 Mechanics & Motion
    "newton-laws-lab": "https://media.giphy.com/media/l41YlKQnCxNqhFkqA/giphy.gif",
    "gravity-simulator": "https://media.giphy.com/media/xULW8N9O5WDQYg63i8/giphy.gif",
    "projectile-motion": "https://media.giphy.com/media/3o72FfM5HJydzafgUE/giphy.gif",
    "momentum-master": "https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif",
    "friction-world": "https://media.giphy.com/media/3o7TKSha51ATTx9KzC/giphy.gif",
    "centripetal-force": "https://media.giphy.com/media/l41lSsxM0va2w2BvW/giphy.gif",
    
    // ⚡ Electricity & Magnetism
    "circuit-builder": "https://media.giphy.com/media/3o7aD2saVJx3sHIRI4/giphy.gif",
    "magnetic-fields": "https://media.giphy.com/media/3o7TKz2eMXxVdzYtY4/giphy.gif",
    "static-electricity": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "electromagnet-lab": "https://media.giphy.com/media/3o7TKrWJ2p3U7Jg8Ba/giphy.gif",
    "voltage-current": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🌊 Waves & Sound
    "wave-simulator": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "sound-waves-lab": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "doppler-effect": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "resonance-chamber": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "light-waves": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🔥 Thermodynamics
    "heat-transfer": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "gas-laws-sim": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "entropy-playground": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "phase-changes": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🌌 Modern Physics
    "quantum-world": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "relativity-lab": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "nuclear-physics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "particle-detector": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🪐 Astronomy & Space
    "solar-system": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "black-hole-sim": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "orbit-simulator": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "space-exploration": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 👁️ Optics
    "lens-lab": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "laser-maze": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "prism-playground": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "telescope-builder": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🎮 Interactive Labs
    "physics-escape-room": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "virtual-physics-lab": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "physics-mystery": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "experiment-designer": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🏆 Real-World Physics
    "sports-physics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "engineering-challenges": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "vehicle-dynamics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "architecture-physics": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🎵 Physics of Music
    "music-physics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "instrument-designer": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "acoustics-lab": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 📡 Technology Physics
    "electronics-lab": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "wireless-physics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "optical-fiber": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "semiconductor-lab": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🏃‍♂️ Biomechanics
    "human-physics": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "sports-biomechanics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "animal-locomotion": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🌍 Environmental Physics
    "weather-physics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "climate-simulator": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "ocean-physics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🧩 Puzzle Games
    "physics-puzzles": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "quantum-puzzles": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "relativity-riddles": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // ⚔️ Competitive Physics
    "physics-olympics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "speed-physics": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "physics-tournament": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "team-physics-battle": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif"
  };

  const getGamePath = (path) => {
    return path.split('/').pop();
  };

  const PhysicsGameCard = ({ to, icon: Icon, children, category }) => {
    const gameId = getGamePath(to);
    const gifUrl = physicsGameGifs[gameId];
    
    return (
      <NavLink 
        to={to} 
        className={`physics-btn-card ${category}`}
        onMouseEnter={() => setHoveredGame(gameId)}
        onMouseLeave={() => setHoveredGame(null)}
        style={{
          backgroundImage: gifUrl ? `url(${gifUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="physics-card-overlay"></div>
        <div className="physics-card-content">
          <Icon />
          <span>{children}</span>
        </div>
      </NavLink>
    );
  };

  if (!mounted) {
    return <div className="physics-game-board loading">Loading Physics Games...</div>;
  }

  return (
    <div className="physics-game-board">
      <div className="physics-board-container">
        <header className="physics-board-header">
          <h1>⚛️ PhysicsGameBoard - Interactive Physics Laboratory</h1>
          <div className="physics-custom-work-btn-container">
            <NavLink to="/physics/custom-experiment" className="physics-custom-work-btn">
              <FaPlusCircle style={{ marginRight: "5px" }} />
              Custom Experiment
            </NavLink>
          </div>
        </header>

        <div className="physics-game-list">
          {/* 🔬 Mechanics & Motion Games */}
          <PhysicsGameCard to="/physics/games/newton-laws-lab" icon={FaAtom} category="mechanics">
            Newton's Laws Lab
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/gravity-simulator" icon={FaGlobeAmericas} category="mechanics">
            Gravity Simulator
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/projectile-motion" icon={FaRocket} category="mechanics">
            Projectile Motion
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/momentum-master" icon={FaTachometerAlt} category="mechanics">
            Momentum Master
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/friction-world" icon={FaCompressAlt} category="mechanics">
            Friction World
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/centripetal-force" icon={FaBalanceScale} category="mechanics">
            Centripetal Force
          </PhysicsGameCard>

          {/* ⚡ Electricity & Magnetism Games */}
          <PhysicsGameCard to="/physics/games/circuit-builder" icon={FaBolt} category="electricity">
            Circuit Builder
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/magnetic-fields" icon={FaMagnet} category="electricity">
            Magnetic Fields
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/static-electricity" icon={FaRadiation} category="electricity">
            Static Electricity
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/electromagnet-lab" icon={FaCogs} category="electricity">
            Electromagnet Lab
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/voltage-current" icon={FaChartLine} category="electricity">
            Voltage & Current
          </PhysicsGameCard>

          {/* 🌊 Waves & Sound Games */}
          <PhysicsGameCard to="/physics/games/wave-simulator" icon={FaWaveSquare} category="waves">
            Wave Simulator
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/sound-waves-lab" icon={FaVolumeUp} category="waves">
            Sound Waves Lab
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/doppler-effect" icon={FaCar} category="waves">
            Doppler Effect
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/resonance-chamber" icon={FaMusic} category="waves">
            Resonance Chamber
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/light-waves" icon={FaLightbulb} category="waves">
            Light Waves
          </PhysicsGameCard>

          {/* 🔥 Thermodynamics Games */}
          <PhysicsGameCard to="/physics/games/heat-transfer" icon={FaFire} category="thermo">
            Heat Transfer
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/gas-laws-sim" icon={FaWind} category="thermo">
            Gas Laws Simulator
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/entropy-playground" icon={FaSnowflake} category="thermo">
            Entropy Playground
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/phase-changes" icon={FaWater} category="thermo">
            Phase Changes
          </PhysicsGameCard>

          {/* 🌌 Modern Physics Games */}
          <PhysicsGameCard to="/physics/games/quantum-world" icon={FaAtom} category="modern">
            Quantum World
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/relativity-lab" icon={FaSpaceShuttle} category="modern">
            Relativity Lab
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/nuclear-physics" icon={FaRadiation} category="modern">
            Nuclear Physics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/particle-detector" icon={FaMicroscope} category="modern">
            Particle Detector
          </PhysicsGameCard>

          {/* 🪐 Astronomy & Space Games */}
          <PhysicsGameCard to="/physics/games/solar-system" icon={FaSun} category="space">
            Solar System Explorer
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/black-hole-sim" icon={FaMeteor} category="space">
            Black Hole Simulator
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/orbit-simulator" icon={FaSatellite} category="space">
            Orbit Simulator
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/space-exploration" icon={FaUserAstronaut} category="space">
            Space Exploration
          </PhysicsGameCard>

          {/* 👁️ Optics Games */}
          <PhysicsGameCard to="/physics/games/lens-lab" icon={FaEye} category="optics">
            Lens Laboratory
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/laser-maze" icon={FaBolt} category="optics">
            Laser Maze
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/prism-playground" icon={FaSun} category="optics">
            Prism Playground
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/telescope-builder" icon={FaSearch} category="optics">
            Telescope Builder
          </PhysicsGameCard>

          {/* 🎮 Interactive Physics Labs */}
          <PhysicsGameCard to="/physics/games/physics-escape-room" icon={FaPuzzlePiece} category="interactive">
            Physics Escape Room
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/virtual-physics-lab" icon={FaFlask} category="interactive">
            Virtual Physics Lab
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/physics-mystery" icon={FaSearch} category="interactive">
            Physics Mystery
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/experiment-designer" icon={FaCogs} category="interactive">
            Experiment Designer
          </PhysicsGameCard>

          {/* 🏆 Real-World Physics Games */}
          <PhysicsGameCard to="/physics/games/sports-physics" icon={FaTrophy} category="real-world">
            Sports Physics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/engineering-challenges" icon={FaRobot} category="real-world">
            Engineering Challenges
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/vehicle-dynamics" icon={FaCar} category="real-world">
            Vehicle Dynamics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/architecture-physics" icon={FaCity} category="real-world">
            Architecture Physics
          </PhysicsGameCard>

          {/* 🎵 Physics of Music Games */}
          <PhysicsGameCard to="/physics/games/music-physics" icon={FaMusic} category="music">
            Music Physics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/instrument-designer" icon={FaVolumeUp} category="music">
            Instrument Designer
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/acoustics-lab" icon={FaWaveSquare} category="music">
            Acoustics Lab
          </PhysicsGameCard>

          {/* 📡 Technology Physics Games */}
          <PhysicsGameCard to="/physics/games/electronics-lab" icon={FaMobileAlt} category="tech">
            Electronics Lab
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/wireless-physics" icon={FaWifi} category="tech">
            Wireless Physics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/optical-fiber" icon={FaSatelliteDish} category="tech">
            Optical Fiber
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/semiconductor-lab" icon={FaMicrochip} category="tech">
            Semiconductor Lab
          </PhysicsGameCard>

          {/* 🏃‍♂️ Biomechanics Games */}
          <PhysicsGameCard to="/physics/games/human-physics" icon={FaBrain} category="bio">
            Human Physics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/sports-biomechanics" icon={FaRunning} category="bio">
            Sports Biomechanics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/animal-locomotion" icon={FaTree} category="bio">
            Animal Locomotion
          </PhysicsGameCard>

          {/* 🌍 Environmental Physics Games */}
          <PhysicsGameCard to="/physics/games/weather-physics" icon={FaCloud} category="environment">
            Weather Physics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/climate-simulator" icon={FaGlobeAmericas} category="environment">
            Climate Simulator
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/ocean-physics" icon={FaWater} category="environment">
            Ocean Physics
          </PhysicsGameCard>

          {/* 🧩 Physics Puzzle Games */}
          <PhysicsGameCard to="/physics/games/physics-puzzles" icon={FaPuzzlePiece} category="puzzles">
            Physics Puzzles
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/quantum-puzzles" icon={FaAtom} category="puzzles">
            Quantum Puzzles
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/relativity-riddles" icon={FaSpaceShuttle} category="puzzles">
            Relativity Riddles
          </PhysicsGameCard>

          {/* ⚔️ Competitive Physics Games */}
          <PhysicsGameCard to="/physics/games/physics-olympics" icon={FaMedal} category="competitive">
            Physics Olympics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/speed-physics" icon={FaStopwatch} category="competitive">
            Speed Physics
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/physics-tournament" icon={FaTrophy} category="competitive">
            Physics Tournament
          </PhysicsGameCard>
          <PhysicsGameCard to="/physics/games/team-physics-battle" icon={FaUsers} category="competitive">
            Team Physics Battle
          </PhysicsGameCard>
        </div>
      </div>

      <style jsx>{`
        .physics-game-board {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f3460 0%, #533483 100%);
          padding: 20px;
        }

        .physics-game-board.loading {
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 1.5rem;
        }

        .physics-board-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .physics-board-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding: 25px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .physics-board-header h1 {
          color: white;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          margin: 0;
        }

        .physics-custom-work-btn {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          background: linear-gradient(45deg, #e94560, #f05);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
        }

        .physics-custom-work-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(233, 69, 96, 0.6);
        }

        .physics-game-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .physics-btn-card {
          position: relative;
          display: flex;
          align-items: center;
          padding: 25px 20px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          text-decoration: none;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          min-height: 100px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .physics-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          transition: background 0.3s ease;
        }

        .physics-btn-card:hover .physics-card-overlay {
          background: rgba(0, 0, 0, 0.2);
        }

        .physics-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .physics-btn-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .physics-btn-card:hover::before {
          left: 100%;
        }

        .physics-btn-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .physics-btn-card svg {
          margin-right: 15px;
          font-size: 1.8rem;
          flex-shrink: 0;
          filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
        }

        /* Physics Category-specific colors */
        .mechanics {
          border-left: 5px solid #4ecdc4;
        }
        .mechanics:hover {
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);
        }

        .electricity {
          border-left: 5px solid #ffd166;
        }
        .electricity:hover {
          box-shadow: 0 8px 25px rgba(255, 209, 102, 0.3);
        }

        .waves {
          border-left: 5px solid #118ab2;
        }
        .waves:hover {
          box-shadow: 0 8px 25px rgba(17, 138, 178, 0.3);
        }

        .thermo {
          border-left: 5px solid #ef476f;
        }
        .thermo:hover {
          box-shadow: 0 8px 25px rgba(239, 71, 111, 0.3);
        }

        .modern {
          border-left: 5px solid #7209b7;
        }
        .modern:hover {
          box-shadow: 0 8px 25px rgba(114, 9, 183, 0.3);
        }

        .space {
          border-left: 5px solid #06d6a0;
        }
        .space:hover {
          box-shadow: 0 8px 25px rgba(6, 214, 160, 0.3);
        }

        .optics {
          border-left: 5px solid #f3722c;
        }
        .optics:hover {
          box-shadow: 0 8px 25px rgba(243, 114, 44, 0.3);
        }

        .interactive {
          border-left: 5px solid #43aa8b;
        }
        .interactive:hover {
          box-shadow: 0 8px 25px rgba(67, 170, 139, 0.3);
        }

        .real-world {
          border-left: 5px solid #577590;
        }
        .real-world:hover {
          box-shadow: 0 8px 25px rgba(87, 117, 144, 0.3);
        }

        .music {
          border-left: 5px solid #f8961e;
        }
        .music:hover {
          box-shadow: 0 8px 25px rgba(248, 150, 30, 0.3);
        }

        .tech {
          border-left: 5px solid #277da1;
        }
        .tech:hover {
          box-shadow: 0 8px 25px rgba(39, 125, 161, 0.3);
        }

        .bio {
          border-left: 5px solid #90be6d;
        }
        .bio:hover {
          box-shadow: 0 8px 25px rgba(144, 190, 109, 0.3);
        }

        .environment {
          border-left: 5px solid #577590;
        }
        .environment:hover {
          box-shadow: 0 8px 25px rgba(87, 117, 144, 0.3);
        }

        .puzzles {
          border-left: 5px solid #f94144;
        }
        .puzzles:hover {
          box-shadow: 0 8px 25px rgba(249, 65, 68, 0.3);
        }

        .competitive {
          border-left: 5px solid #f72585;
        }
        .competitive:hover {
          box-shadow: 0 8px 25px rgba(247, 37, 133, 0.3);
        }

        /* Responsive design */
        @media (max-width: 1200px) {
          .physics-game-list {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .physics-board-header {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .physics-board-header h1 {
            font-size: 2rem;
          }

          .physics-game-list {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .physics-game-list {
            grid-template-columns: 1fr;
          }
          
          .physics-board-header h1 {
            font-size: 1.5rem;
          }

          .physics-game-board {
            padding: 10px;
          }

          .physics-btn-card {
            padding: 20px 15px;
            min-height: 80px;
          }

          .physics-btn-card svg {
            font-size: 1.5rem;
            margin-right: 12px;
          }
        }

        /* Loading animation for GIFs */
        @keyframes physics-pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { opacity: 0.6; }
        }

        .physics-btn-card:not([style*="background-image"]) {
          animation: physics-pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default PhysicsGameBoard;