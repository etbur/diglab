import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaDraftingCompass,
  FaShapes,
  FaRulerCombined,
  FaPlusCircle,
  FaVectorSquare,
  FaProjectDiagram,
  FaCalculator,
  FaPuzzlePiece,
  FaChartLine,
  FaBrain,
  FaInfinity,
  FaCube,
  FaDice,
  FaClock,
  FaRunning,
  FaSearch,
  FaBalanceScale,
  FaCode,
  FaListOl,
  FaChartBar,
  FaTable,
  FaCrown,
  FaPlus,
  FaMinus,
  FaTimes,
  FaDivide,
  FaShoppingCart,
  FaCity,
  FaMedal,
  FaStopwatch,
  FaTrophy,
  FaUsers,
  FaFlagCheckered,
  FaAngleRight,
  FaSync,
  FaDoorOpen,
  FaRocket,
  FaGlobe,
  FaMoneyBillWave,
  FaHeart,
  FaMusic,
  FaPalette,
  FaQuestion,
  FaBolt,
  FaTh,
  FaMapMarkerAlt
} from "react-icons/fa";

const MathsGameBoard = () => {
  const [hoveredGame, setHoveredGame] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GIF URLs for each game (using placeholder GIFs - replace with your actual GIFs)
  const gameGifs = {
    // 🎯 Elementary Math Games
    "counting-kingdom": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "adventure-addition": "https://media.giphy.com/media/3o7abldj0b3RxrVGx2/giphy.gif",
    "subtraction-safari": "https://media.giphy.com/media/xULW8N9O5WDQYg63i8/giphy.gif",
    "multiplication-mountain": "https://media.giphy.com/media/3o72FfM5HJydzafgUE/giphy.gif",
    "division-quest": "https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif",
    "fraction-fun-park": "https://media.giphy.com/media/3o7TKSha51ATTx9KzC/giphy.gif",
    
    // 🔢 Number Sense Games
    "number-race": "https://media.giphy.com/media/l41lSsxM0va2w2BvW/giphy.gif",
    "math-bingo": "https://media.giphy.com/media/3o7aD2saVJx3sHIRI4/giphy.gif",
    "prime-number-hunt": "https://media.giphy.com/media/3o7TKz2eMXxVdzYtY4/giphy.gif",
    "decimal-dash": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 📐 Geometry Games
    "shape-sorter": "https://media.giphy.com/media/3o7TKrWJ2p3U7Jg8Ba/giphy.gif",
    "angle-adventure": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "symmetry-master": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "area-perimeter-quest": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "3d-shape-explorer": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "transformation-trainer": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🧮 Middle School Math
    "ratio-rally": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "integer-island": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "algebra-adventure": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "equation-balancer": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "coordinate-capture": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 📊 Data & Statistics Games
    "graph-guru": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "probability-playground": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "mean-median-mode": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "data-detective": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🎓 High School Math
    "calculus-quest": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "trigonometry-trek": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "geometry-genius": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "derivative-duel": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "matrix-mission": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🧠 Logic & Puzzle Games
    "sudoku-solver": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "logic-grid-puzzles": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "brain-teasers": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "math-riddles": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🎮 Interactive Adventure Games
    "math-maze": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "treasure-hunt": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "escape-room": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "space-explorer": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🌍 Real-World Math Games
    "math-market": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "city-planner": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "budget-boss": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "sports-statistics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🏆 Competitive Math Games
    "math-olympics": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "speed-math": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "math-tournament": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "team-math-battle": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    
    // 🎵 Creative Math Games
    "math-music": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "pattern-artist": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "fibonacci-fun": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    
    // 🔧 Engineering Drawing
    "engineering-drawing-basics": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "orthographic-projections": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "isometric-drawing": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "sectional-views": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "threads-and-fasteners": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif",
    "scale-drawing": "https://media.giphy.com/media/3o7TKsQ7XUQ1Q7Q7X2/giphy.gif",
    "assembly-drawings": "https://media.giphy.com/media/l41lUJ1Uzqlz2v0O4/giphy.gif"
  };

  const getGamePath = (path) => {
    return path.split('/').pop();
  };

  const GameCard = ({ to, icon: Icon, children, category }) => {
    const gameId = getGamePath(to);
    const gifUrl = gameGifs[gameId];
    
    return (
      <NavLink 
        to={to} 
        className={`btn-card ${category}`}
        onMouseEnter={() => setHoveredGame(gameId)}
        onMouseLeave={() => setHoveredGame(null)}
        style={{
          backgroundImage: gifUrl ? `url(${gifUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="card-overlay"></div>
        <div className="card-content">
          <Icon />
          <span>{children}</span>
        </div>
      </NavLink>
    );
  };

  if (!mounted) {
    return <div className="math-game-board loading">Loading Math Games...</div>;
  }

  return (
    <div className="math-game-board">
      <div className="game-board-container">
        <header className="game-board-header">
          <h1>🌍 MathsGameBoard - All Grade Levels Game Library</h1>
          <div className="custom-work-btn-container">
            <NavLink to="/drawing/grade11/custom-work" className="custom-work-btn">
              <FaPlusCircle style={{ marginRight: "5px" }} />
              Custom Work
            </NavLink>
          </div>
        </header>

        <div className="categories-container">
          {/* 🎯 Elementary Math Games */}
          <section className="game-category">
            <h2>🎯 Elementary Math Games (Grades 1-5)</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/counting-kingdom" icon={FaCrown} category="elementary">
                Counting Kingdom
              </GameCard>
              <GameCard to="/math/games/adventure-addition" icon={FaPlus} category="elementary">
                Adventure Addition
              </GameCard>
              <GameCard to="/math/games/subtraction-safari" icon={FaMinus} category="elementary">
                Subtraction Safari
              </GameCard>
              <GameCard to="/math/games/multiplication-mountain" icon={FaTimes} category="elementary">
                Multiplication Mountain
              </GameCard>
              <GameCard to="/math/games/division-quest" icon={FaDivide} category="elementary">
                Division Quest
              </GameCard>
              <GameCard to="/math/games/fraction-fun-park" icon={FaPuzzlePiece} category="elementary">
                Fraction Fun Park
              </GameCard>
            </div>
          </section>

          {/* 🔢 Number Sense Games */}
          <section className="game-category">
            <h2>🔢 Number Sense Games</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/number-race" icon={FaFlagCheckered} category="number-sense">
                Number Race
              </GameCard>
              <GameCard to="/math/games/math-bingo" icon={FaTable} category="number-sense">
                Math Bingo
              </GameCard>
              <GameCard to="/math/games/prime-number-hunt" icon={FaSearch} category="number-sense">
                Prime Number Hunt
              </GameCard>
              <GameCard to="/math/games/decimal-dash" icon={FaRunning} category="number-sense">
                Decimal Dash
              </GameCard>
            </div>
          </section>

          {/* 📐 Geometry Games */}
          <section className="game-category">
            <h2>📐 Geometry Games</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/shape-sorter" icon={FaShapes} category="geometry">
                Shape Sorter
              </GameCard>
              <GameCard to="/math/games/angle-adventure" icon={FaAngleRight} category="geometry">
                Angle Adventure
              </GameCard>
              <GameCard to="/math/games/symmetry-master" icon={FaBalanceScale} category="geometry">
                Symmetry Master
              </GameCard>
              <GameCard to="/math/games/area-perimeter-quest" icon={FaVectorSquare} category="geometry">
                Area & Perimeter Quest
              </GameCard>
              <GameCard to="/math/games/3d-shape-explorer" icon={FaCube} category="geometry">
                3D Shape Explorer
              </GameCard>
              <GameCard to="/math/games/transformation-trainer" icon={FaSync} category="geometry">
                Transformation Trainer
              </GameCard>
            </div>
          </section>

          {/* 🧮 Middle School Math */}
          <section className="game-category">
            <h2>🧮 Middle School Math (Grades 6-8)</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/ratio-rally" icon={FaChartLine} category="middle-school">
                Ratio Rally
              </GameCard>
              <GameCard to="/math/games/integer-island" icon={FaGlobe} category="middle-school">
                Integer Island
              </GameCard>
              <GameCard to="/math/games/algebra-adventure" icon={FaCode} category="middle-school">
                Algebra Adventure
              </GameCard>
              <GameCard to="/math/games/equation-balancer" icon={FaBalanceScale} category="middle-school">
                Equation Balancer
              </GameCard>
              <GameCard to="/math/games/coordinate-capture" icon={FaMapMarkerAlt} category="middle-school">
                Coordinate Capture
              </GameCard>
            </div>
          </section>

          {/* 📊 Data & Statistics Games */}
          <section className="game-category">
            <h2>📊 Data & Statistics Games</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/graph-guru" icon={FaChartBar} category="statistics">
                Graph Guru
              </GameCard>
              <GameCard to="/math/games/probability-playground" icon={FaDice} category="statistics">
                Probability Playground
              </GameCard>
              <GameCard to="/math/games/mean-median-mode" icon={FaCalculator} category="statistics">
                Mean, Median, Mode
              </GameCard>
              <GameCard to="/math/games/data-detective" icon={FaSearch} category="statistics">
                Data Detective
              </GameCard>
            </div>
          </section>

          {/* 🎓 High School Math */}
          <section className="game-category">
            <h2>🎓 High School Math (Grades 9-12)</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/calculus-quest" icon={FaInfinity} category="high-school">
                Calculus Quest
              </GameCard>
              <GameCard to="/math/games/trigonometry-trek" icon={FaProjectDiagram} category="high-school">
                Trigonometry Trek
              </GameCard>
              <GameCard to="/math/games/geometry-genius" icon={FaRulerCombined} category="high-school">
                Geometry Genius
              </GameCard>
              <GameCard to="/math/games/derivative-duel" icon={FaBolt} category="high-school">
                Derivative Duel
              </GameCard>
              <GameCard to="/math/games/matrix-mission" icon={FaTable} category="high-school">
                Matrix Mission
              </GameCard>
            </div>
          </section>

          {/* 🧠 Logic & Puzzle Games */}
          <section className="game-category">
            <h2>🧠 Logic & Puzzle Games</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/sudoku-solver" icon={FaPuzzlePiece} category="logic">
                Math Sudoku
              </GameCard>
              <GameCard to="/math/games/logic-grid-puzzles" icon={FaTh} category="logic">
                Logic Grid Puzzles
              </GameCard>
              <GameCard to="/math/games/brain-teasers" icon={FaBrain} category="logic">
                Math Brain Teasers
              </GameCard>
              <GameCard to="/math/games/math-riddles" icon={FaQuestion} category="logic">
                Math Riddles
              </GameCard>
            </div>
          </section>

          {/* 🎮 Interactive Adventure Games */}
          <section className="game-category">
            <h2>🎮 Interactive Adventure Games</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/math-maze" icon={FaPuzzlePiece} category="adventure">
                Math Maze Runner
              </GameCard>
              <GameCard to="/math/games/treasure-hunt" icon={FaSearch} category="adventure">
                Math Treasure Hunt
              </GameCard>
              <GameCard to="/math/games/escape-room" icon={FaDoorOpen} category="adventure">
                Math Escape Room
              </GameCard>
              <GameCard to="/math/games/space-explorer" icon={FaRocket} category="adventure">
                Space Math Explorer
              </GameCard>
            </div>
          </section>

          {/* 🌍 Real-World Math Games */}
          <section className="game-category">
            <h2>🌍 Real-World Math Games</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/math-market" icon={FaShoppingCart} category="real-world">
                Math Market
              </GameCard>
              <GameCard to="/math/games/city-planner" icon={FaCity} category="real-world">
                City Planner Math
              </GameCard>
              <GameCard to="/math/games/budget-boss" icon={FaMoneyBillWave} category="real-world">
                Budget Boss
              </GameCard>
              <GameCard to="/math/games/sports-statistics" icon={FaTrophy} category="real-world">
                Sports Statistics
              </GameCard>
            </div>
          </section>

          {/* 🏆 Competitive Math Games */}
          <section className="game-category">
            <h2>🏆 Competitive Math Games</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/math-olympics" icon={FaMedal} category="competitive">
                Math Olympics
              </GameCard>
              <GameCard to="/math/games/speed-math" icon={FaStopwatch} category="competitive">
                Speed Math Challenge
              </GameCard>
              <GameCard to="/math/games/math-tournament" icon={FaTrophy} category="competitive">
                Math Tournament
              </GameCard>
              <GameCard to="/math/games/team-math-battle" icon={FaUsers} category="competitive">
                Team Math Battle
              </GameCard>
            </div>
          </section>

          {/* 🎵 Creative Math Games */}
          <section className="game-category">
            <h2>🎵 Creative Math Games</h2>
            <div className="simulation-grid">
              <GameCard to="/math/games/math-music" icon={FaMusic} category="creative">
                Math & Music
              </GameCard>
              <GameCard to="/math/games/pattern-artist" icon={FaPalette} category="creative">
                Pattern Artist
              </GameCard>
              <GameCard to="/math/games/fibonacci-fun" icon={FaHeart} category="creative">
                Fibonacci Fun
              </GameCard>
            </div>
          </section>

          {/* 🔧 Engineering Drawing Section */}
          <section className="game-category">
            <h2>🔧 Engineering Drawing Section</h2>
            <div className="simulation-grid">
              <GameCard to="/drawing/grade11/engineering-drawing-basics" icon={FaDraftingCompass} category="engineering">
                Engineering Drawing Basics
              </GameCard>
              <GameCard to="/drawing/grade11/orthographic-projections" icon={FaRulerCombined} category="engineering">
                Orthographic Projections
              </GameCard>
              <GameCard to="/drawing/grade11/isometric-drawing" icon={FaShapes} category="engineering">
                Isometric Drawing
              </GameCard>
              <GameCard to="/drawing/grade11/sectional-views" icon={FaProjectDiagram} category="engineering">
                Sectional Views
              </GameCard>
              <GameCard to="/drawing/grade11/threads-and-fasteners" icon={FaVectorSquare} category="engineering">
                Threads and Fasteners
              </GameCard>
              <GameCard to="/drawing/grade11/scale-drawing" icon={FaDraftingCompass} category="engineering">
                Scale Drawing
              </GameCard>
              <GameCard to="/drawing/grade11/assembly-drawings" icon={FaProjectDiagram} category="engineering">
                Assembly Drawings
              </GameCard>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .math-game-board {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .math-game-board.loading {
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 1.5rem;
        }

        .game-board-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .game-board-header {
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

        .game-board-header h1 {
          color: white;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          margin: 0;
        }

        .custom-work-btn {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          background: linear-gradient(45deg, #f72585, #b5179e);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(247, 37, 133, 0.4);
        }

        .custom-work-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(247, 37, 133, 0.6);
        }

        .categories-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .game-category h2 {
          color: white;
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          padding-left: 15px;
          border-left: 4px solid rgba(255, 255, 255, 0.5);
        }

        .simulation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 10px;
        }

        .btn-card {
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

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          transition: background 0.3s ease;
        }

        .btn-card:hover .card-overlay {
          background: rgba(0, 0, 0, 0.2);
        }

        .card-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .btn-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .btn-card:hover::before {
          left: 100%;
        }

        .btn-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-card svg {
          margin-right: 15px;
          font-size: 1.8rem;
          flex-shrink: 0;
          filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
        }

        /* Category-specific colors and animations */
        .elementary {
          border-left: 5px solid #4ecdc4;
        }

        .elementary:hover {
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);
        }

        .number-sense {
          border-left: 5px solid #ffd166;
        }

        .number-sense:hover {
          box-shadow: 0 8px 25px rgba(255, 209, 102, 0.3);
        }

        .geometry {
          border-left: 5px solid #06d6a0;
        }

        .geometry:hover {
          box-shadow: 0 8px 25px rgba(6, 214, 160, 0.3);
        }

        .middle-school {
          border-left: 5px solid #118ab2;
        }

        .middle-school:hover {
          box-shadow: 0 8px 25px rgba(17, 138, 178, 0.3);
        }

        .statistics {
          border-left: 5px solid #ef476f;
        }

        .statistics:hover {
          box-shadow: 0 8px 25px rgba(239, 71, 111, 0.3);
        }

        .high-school {
          border-left: 5px solid #7209b7;
        }

        .high-school:hover {
          box-shadow: 0 8px 25px rgba(114, 9, 183, 0.3);
        }

        .logic {
          border-left: 5px solid #f3722c;
        }

        .logic:hover {
          box-shadow: 0 8px 25px rgba(243, 114, 44, 0.3);
        }

        .adventure {
          border-left: 5px solid #43aa8b;
        }

        .adventure:hover {
          box-shadow: 0 8px 25px rgba(67, 170, 139, 0.3);
        }

        .real-world {
          border-left: 5px solid #577590;
        }

        .real-world:hover {
          box-shadow: 0 8px 25px rgba(87, 117, 144, 0.3);
        }

        .competitive {
          border-left: 5px solid #f94144;
        }

        .competitive:hover {
          box-shadow: 0 8px 25px rgba(249, 65, 68, 0.3);
        }

        .creative {
          border-left: 5px solid #f8961e;
        }

        .creative:hover {
          box-shadow: 0 8px 25px rgba(248, 150, 30, 0.3);
        }

        .engineering {
          border-left: 5px solid #277da1;
        }

        .engineering:hover {
          box-shadow: 0 8px 25px rgba(39, 125, 161, 0.3);
        }

        /* Responsive design */
        @media (max-width: 1200px) {
          .simulation-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .game-board-header {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .game-board-header h1 {
            font-size: 2rem;
          }

          .simulation-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          .categories-container {
            gap: 30px;
          }

          .game-category h2 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .simulation-grid {
            grid-template-columns: 1fr;
          }
          
          .game-board-header h1 {
            font-size: 1.5rem;
          }

          .math-game-board {
            padding: 10px;
          }

          .btn-card {
            padding: 20px 15px;
            min-height: 80px;
          }

          .btn-card svg {
            font-size: 1.5rem;
            margin-right: 12px;
          }
        }

        /* Loading animation for GIFs */
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { opacity: 0.6; }
        }

        .btn-card:not([style*="background-image"]) {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default MathsGameBoard;