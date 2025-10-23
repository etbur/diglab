import React, { useState } from "react";

const CustomWork = () => {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("advanced_calculus");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("advanced");
  const [projects, setProjects] = useState([]);

  const projectTypes = {
    advanced_calculus: "Advanced Calculus Project",
    linear_algebra: "Linear Algebra Project",
    discrete_mathematics: "Discrete Mathematics Project",
    mathematical_modeling: "Mathematical Modeling Project",
    statistics_research: "Statistics Research Project"
  };

  const difficulties = {
    advanced: "Advanced (Grade 12 level)",
    expert: "Expert (University level)"
  };

  const createProject = () => {
    if (projectName.trim() && description.trim()) {
      const newProject = {
        id: Date.now(),
        name: projectName,
        type: projectTypes[projectType],
        description,
        difficulty: difficulties[difficulty],
        status: "planning",
        createdAt: new Date().toISOString(),
        progress: 0,
        tasks: [],
        grade: "Grade 12",
        deliverables: [],
        standards: [],
        mathematical_tools: []
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

  const addMathematicalTool = (projectId, tool) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, mathematical_tools: [...project.mathematical_tools, tool] }
        : project
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "planning": return "#ffa500";
      case "research": return "#007bff";
      case "development": return "#28a745";
      case "analysis": return "#ffc107";
      case "presentation": return "#dc3545";
      case "completed": return "#28a745";
      default: return "#6c757d";
    }
  };

  const projectTemplates = [
    {
      type: "advanced_calculus",
      title: "Optimization in Real World",
      description: "Apply advanced calculus techniques to solve real-world optimization problems"
    },
    {
      type: "linear_algebra",
      title: "Matrix Applications in Data Science",
      description: "Explore how linear algebra powers modern data science and machine learning"
    },
    {
      type: "discrete_mathematics",
      title: "Graph Theory in Networks",
      description: "Apply graph theory concepts to analyze network structures and algorithms"
    },
    {
      type: "mathematical_modeling",
      title: "Epidemic Modeling",
      description: "Create and analyze mathematical models of disease spread and containment"
    },
    {
      type: "statistics_research",
      title: "Statistical Analysis of Social Data",
      description: "Conduct comprehensive statistical analysis of real-world social science data"
    }
  ];

  const advancedTopics = [
    {
      subject: "Pure Mathematics",
      topics: ["Abstract algebra", "Real analysis", "Complex analysis", "Topology"]
    },
    {
      subject: "Applied Mathematics",
      topics: ["Numerical analysis", "Operations research", "Mathematical physics", "Financial mathematics"]
    },
    {
      subject: "Statistics & Probability",
      topics: ["Statistical inference", "Stochastic processes", "Time series analysis", "Bayesian statistics"]
    },
    {
      subject: "Computational Mathematics",
      topics: ["Algorithm complexity", "Cryptography", "Computational geometry", "Symbolic computation"]
    }
  ];

  return (
    <div className="custom-work-grade12">
      <h1>🎓 Advanced Mathematics Research</h1>
      <p>Create and manage advanced mathematical research projects for Grade 12 professional work.</p>

      <div className="advanced-topics">
        <h2>University-Level Mathematical Topics</h2>
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

      <div className="project-templates">
        <h2>Research Project Templates</h2>
        <div className="templates-grid">
          {projectTemplates.map((template, index) => (
            <div key={index} className="template-card" onClick={() => {
              setProjectType(template.type);
              setProjectName(template.title);
              setDescription(template.description);
            }}>
              <h4>{template.title}</h4>
              <p>{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="project-form">
        <h2>Create New Research Project</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Project Title"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
            {Object.entries(projectTypes).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            {Object.entries(difficulties).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Research Objectives and Methodology"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <button onClick={createProject} className="create-btn">Create Research Project</button>
      </div>

      <div className="projects-list">
        <h2>Your Research Projects</h2>
        {projects.length === 0 ? (
          <p>No research projects created yet. Start by creating your first advanced mathematical research project!</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <div className="project-info">
                <p><strong>Type:</strong> {project.type}</p>
                <p><strong>Difficulty:</strong> {project.difficulty}</p>
                <p><strong>Description:</strong> {project.description}</p>
              </div>

              <div className="project-tools">
                <h4>Mathematical Tools & Software</h4>
                <div className="add-tool">
                  <input
                    type="text"
                    placeholder="Add mathematical tool (e.g., MATLAB, Mathematica, Python, R)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        addMathematicalTool(project.id, e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <div className="tools-list">
                  {project.mathematical_tools.map((tool, index) => (
                    <span key={index} className="tool-tag">{tool}</span>
                  ))}
                </div>
              </div>

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

              <div className="project-deliverables">
                <h4>Research Deliverables</h4>
                <div className="add-deliverable">
                  <input
                    type="text"
                    placeholder="Add deliverable (e.g., Research paper, Mathematical proof, Data analysis, Presentation)"
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
                <h4>Research Tasks & Milestones</h4>
                <div className="add-task">
                  <input
                    type="text"
                    placeholder="Add research task or milestone"
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
                  <option value="planning">Planning</option>
                  <option value="research">Research</option>
                  <option value="development">Development</option>
                  <option value="analysis">Analysis</option>
                  <option value="presentation">Presentation</option>
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
          ))
        )}
      </div>

      <div className="career-pathways">
        <h2>Career Pathways in Advanced Mathematics</h2>
        <div className="careers-grid">
          <div className="career">
            <h4>Mathematician</h4>
            <p>Pure mathematical research and theory development</p>
            <ul>
              <li>Abstract mathematics</li>
              <li>Research publications</li>
              <li>Academic positions</li>
            </ul>
          </div>
          <div className="career">
            <h4>Data Scientist</h4>
            <p>Statistical analysis and machine learning</p>
            <ul>
              <li>Big data analytics</li>
              <li>Predictive modeling</li>
              <li>Algorithm development</li>
            </ul>
          </div>
          <div className="career">
            <h4>Actuary</h4>
            <p>Risk assessment and financial mathematics</p>
            <ul>
              <li>Insurance mathematics</li>
              <li>Financial modeling</li>
              <li>Risk analysis</li>
            </ul>
          </div>
          <div className="career">
            <h4>Operations Research Analyst</h4>
            <p>Optimization and decision analysis</p>
            <ul>
              <li>Linear programming</li>
              <li>Simulation modeling</li>
              <li>Decision support</li>
            </ul>
          </div>
          <div className="career">
            <h4>Quantitative Analyst</h4>
            <p>Financial engineering and quantitative trading</p>
            <ul>
              <li>Derivatives pricing</li>
              <li>Risk management</li>
              <li>Algorithmic trading</li>
            </ul>
          </div>
          <div className="career">
            <h4>Research Scientist</h4>
            <p>Applied mathematics in scientific research</p>
            <ul>
              <li>Computational modeling</li>
              <li>Scientific computing</li>
              <li>Interdisciplinary research</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomWork;