import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronRight, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [openGrade, setOpenGrade] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const gradeSubjects = {
    "Grade 9": ["Physics", "Chemistry", "Biology", "ICT", 'Maths'],
    "Grade 10": ["Physics", "Chemistry", "Biology", "ICT", 'Maths'],
    "Grade 11": ["Physics", "Chemistry", "Biology", "ICT", 'Maths', "Drawing"],
    "Grade 12": ["Physics", "Chemistry", "Biology", "ICT", 'Maths',"Drawing"],
    "Collage": ["Physics", "Chemistry", "Biology", "ICT", 'Maths',"Drawing"],
  };

  const toggleGrade = (grade) => {
    setOpenGrade(openGrade === grade ? null : grade);
  };

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <div className="mobile-header">
        <button className="menu-btn" onClick={() => setIsMobileOpen(true)}>
          <FaBars />
        </button>
        <h1 className="mobile-title">🌍 Digital Lab Ethiopia</h1>
      </div>

      <div className={`sidebar-overlay ${isMobileOpen ? "open" : ""}`} onClick={closeMobile}></div>

      <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <h2>Grades</h2>
          <button className="close-btn" onClick={closeMobile}><FaTimes /></button>
        </div>

        <nav>
          <ul className="grade-list">
            {Object.entries(gradeSubjects).map(([grade, subjects]) => (
              <li key={grade} className="grade-item">
                <button
                  className="grade-toggle"
                  onClick={() => toggleGrade(grade)}
                >
                  <span>{grade}</span>
                  {openGrade === grade ? (
                    <FaChevronDown className="chevron-icon" />
                  ) : (
                    <FaChevronRight className="chevron-icon" />
                  )}
                </button>

                <ul
                  className={`subject-list ${
                    openGrade === grade ? "open" : "collapsed"
                  }`}
                >
                  {subjects.map((subject) => (
                    <li key={subject}>
                      <NavLink
                        to={`/labs/${grade.toLowerCase().replace(" ", "")}/${subject.toLowerCase()}`}
                        className={({ isActive }) => (isActive ? "active" : "")}
                        onClick={closeMobile}
                      >
                        {subject}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
