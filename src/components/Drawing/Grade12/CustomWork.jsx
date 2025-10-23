import React, { useState } from "react";

const CustomWork = () => {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("advanced_technical_drawing");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("expert");
  const [projects, setProjects] = useState([]);

  const projectTypes = {
    advanced_technical_drawing: "Advanced Technical Drawing Project",
    cad_modeling: "CAD Modeling & Analysis Project",
    manufacturing_drawing: "Manufacturing Drawing Project",
    design_engineering: "Design Engineering Project"
  };

  const difficulties = {
    advanced: "Advanced (Complex drawings with GD&T)",
    expert: "Expert (Professional engineering drawings)"
  };

  const createProject = () => {
    if (projectName.trim() && description.trim()) {
      const newProject = {
        id: Date.now(),
        name: projectName,
        type: projectTypes[projectType],
        description,
        difficulty: difficulties[difficulty],
        status: "conceptual_design",
        createdAt: new Date().toISOString(),
        progress: 0,
        tasks: [],
        grade: "Grade 12",
        deliverables: [],
        standards: []
      };

      setProjects(prev => [...prev, newProject]);
      // Reset form
      setProjectName("");
      setDescription("");
    }
  };

  const updateProjectStatus = (projectId, status) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId ? { ...project, status } : project
    ));
  };

  const updateProgress = (projectId, progress) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId ? { ...project, progress: Math.max(0, Math.min(100, progress)) } : project
    ));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const addTask = (projectId, taskName) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, tasks: [...project.tasks, { id: Date.now(), name: taskName, completed: false }] }
        : project
    ));
  };

  const toggleTask = (projectId, taskId) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : project
    ));
  };

  const addDeliverable = (projectId, deliverable) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, deliverables: [...project.deliverables, deliverable] }
        : project
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "conceptual_design": return "#ffa500";
      case "detailed_design": return "#007bff";
      case "analysis": return "#28a745";
      case "documentation": return "#ffc107";
      case "review": return "#dc3545";
      case "completed": return "#28a745";
      default: return "#6c757d";
    }
  };

  const projectTemplates = [
    {
      type: "advanced_technical_drawing",
      title: "Complete Machine Design Project",
      description: "Design a complete machine with detailed drawings, GD&T, and manufacturing specifications"
    },
    {
      type: "cad_modeling",
      title: "Advanced CAD Assembly",
      description: "Create complex parametric assembly with motion analysis and interference checking"
    },
    {
      type: "manufacturing_drawing",
      title: "Production Drawing Set",
      description: "Create complete manufacturing documentation including all views, sections, and specifications"
    },
    {
      type: "design_engineering",
      title: "Engineering Design Challenge",
      description: "Solve real engineering problem with complete design documentation and analysis"
    }
  ];

  const advancedTopics = [
    {
      subject: "Geometric Dimensioning & Tolerancing",
      topics: ["Feature control frames", "Datum references", "Material condition modifiers"]
    },
    {
      subject: "Advanced CAD Techniques",
      topics: ["Parametric modeling", "Top-down design", "Design automation", "PLM integration"]
    },
    {
      subject: "Manufacturing Processes",
      topics: ["CNC machining", "Sheet metal forming", "Welding symbols", "Surface finish specifications"]
    },
    {
      subject: "Engineering Analysis",
      topics: ["FEA simulation", "Tolerance stack-up", "Design optimization", "Reliability analysis"]
    },
    {
      subject: "Industry Standards",
      topics: ["ASME Y14.5", "ISO 2768", "GD&T standards", "Drawing format standards"]
    }
  ];

  const professionalSkills = [
    {
      skill: "Technical Communication",
      description: "Clear documentation and presentation of design intent",
      development: "Practice creating professional drawings and documentation"
    },
    {
      skill: "Design for Manufacturability",
      description: "Designing parts that can be efficiently manufactured",
      development: "Study manufacturing processes and design guidelines"
    },
    {
      skill: "Standards Compliance",
      description: "Following industry standards and best practices",
      development: "Learn ASME, ISO, and other engineering standards"
    },
    {
      skill: "Problem Solving",
      description: "Analytical approach to engineering challenges",
      development: "Work on real design problems and case studies"
    },
    {
      skill: "Project Management",
      description: "Planning and executing engineering projects",
      development: "Learn project management methodologies and tools"
    }
  ];

  return (
    <div className="custom-work-grade12">
      <h1>🌍 Expert Technical Drawing Custom Work</h1>
      <p>Create and manage expert-level technical drawing projects for Grade 12 professional work.</p>

      <div className="advanced-topics">
        <h2>Advanced Engineering Topics</h2>
        <div className="topics-grid">
          {advancedTopics.map((subject, index) => (
            <div key={index} className="subject-card">
              <h4>{subject.subject}</h4>
              <ul>
                {subject.topics.map((topic, idx) => (
                  <li key={idx}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="professional-skills">
        <h2>Professional Engineering Skills</h2>
        <div className="skills-grid">
          {professionalSkills.map((skill, index) => (
            <div key={index} className="skill-card">
              <h3>{skill.skill}</h3>
              <p>{skill.description}</p>
              <p><strong>Development:</strong> {skill.development}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="project-templates">
        <h2>Expert Project Templates</h2>
        <div className="templates-grid">
          {projectTemplates.map((template, index) => (
            <div key={index} className="template-card">
              <h4>{template.title}</h4>
              <p>{template.description}</p>
              <button onClick={() => {
                setProjectName(template.title);
                setProjectType(template.type);
                setDescription(template.description);
              }}>
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="project-creator">
        <h2>Create Expert Drawing Project</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Project Name:</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter expert technical drawing project name"
            />
          </div>

          <div className="form-group">
            <label>Project Type:</label>
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
              {Object.entries(projectTypes).map(([key, type]) => (
                <option key={key} value={key}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Difficulty Level:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {Object.entries(difficulties).map(([key, level]) => (
                <option key={key} value={key}>{level}</option>
              ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your expert engineering project in detail, including objectives, constraints, and deliverables"
              rows="4"
            />
          </div>
        </div>

        <button onClick={createProject} className="create-btn">
          Create Expert Engineering Project
        </button>
      </div>

      <div className="projects-list">
        <h2>Your Expert Engineering Projects</h2>
        {projects.length === 0 ? (
          <p>No expert projects created yet. Start by creating your first Grade 12 engineering project above!</p>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card expert">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <div className="project-meta">
                    <span className="grade-badge">{project.grade}</span>
                    <span
                      className="status"
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    >
                      {project.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="project-details">
                  <p><strong>Type:</strong> {project.type}</p>
                  <p><strong>Difficulty:</strong> {project.difficulty}</p>
                  <p><strong>Description:</strong> {project.description}</p>
                  <p><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>

                  <div className="progress-section">
                    <label>Progress: {project.progress}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={project.progress}
                      onChange={(e) => updateProgress(project.id, parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="project-deliverables">
                  <h4>Project Deliverables</h4>
                  <div className="add-deliverable">
                    <input
                      type="text"
                      placeholder="Add deliverable (e.g., 3D CAD model, Detail drawings, BOM)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          addDeliverable(project.id, e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                  <ul className="deliverables-list">
                    {project.deliverables.map((deliverable, index) => (
                      <li key={index}>{deliverable}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tasks">
                  <h4>Engineering Tasks & Milestones</h4>
                  <div className="add-task">
                    <input
                      type="text"
                      placeholder="Add engineering task or milestone"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          addTask(project.id, e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                  <ul className="task-list">
                    {project.tasks.map(task => (
                      <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(project.id, task.id)}
                        />
                        {task.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-actions">
                  <select
                    value={project.status}
                    onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                  >
                    <option value="conceptual_design">Conceptual Design</option>
                    <option value="detailed_design">Detailed Design</option>
                    <option value="analysis">Analysis</option>
                    <option value="documentation">Documentation</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="career-pathways">
        <h2>Career Pathways in Technical Drawing</h2>
        <div className="careers-grid">
          <div className="career">
            <h4>CAD Engineer</h4>
            <p>Specialize in 3D modeling and parametric design for manufacturing</p>
            <ul>
              <li>Advanced CAD software proficiency</li>
              <li>Design automation</li>
              <li>PLM system integration</li>
            </ul>
          </div>
          <div className="career">
            <h4>Design Engineer</h4>
            <p>Complete product design from concept to manufacturing</p>
            <ul>
              <li>Engineering analysis</li>
              <li>GD&T expertise</li>
              <li>Manufacturing knowledge</li>
            </ul>
          </div>
          <div className="career">
            <h4>Technical Illustrator</h4>
            <p>Create technical documentation and manuals</p>
            <ul>
              <li>Advanced drawing techniques</li>
              <li>Animation and simulation</li>
              <li>Publication design</li>
            </ul>
          </div>
          <div className="career">
            <h4>Manufacturing Engineer</h4>
            <p>Bridge design and manufacturing processes</p>
            <ul>
              <li>Process planning</li>
              <li>Tool design</li>
              <li>Quality engineering</li>
            </ul>
          </div>
          <div className="career">
            <h4>Product Engineer</h4>
            <p>Manage product development lifecycle</p>
            <ul>
              <li>Cross-functional coordination</li>
              <li>Supplier management</li>
              <li>Cost optimization</li>
            </ul>
          </div>
          <div className="career">
            <h4>Research & Development</h4>
            <p>Innovate new products and technologies</p>
            <ul>
              <li>Advanced materials</li>
              <li>Emerging technologies</li>
              <li>Patent development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomWork;