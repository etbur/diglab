import React, { useState } from "react";

const CustomWork = () => {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("web_development");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [projects, setProjects] = useState([]);

  const projectTypes = {
    web_development: "Web Development Project",
    mobile_app: "Mobile App Development Project",
    database_design: "Database Design Project",
    network_setup: "Network Infrastructure Project",
    cybersecurity_audit: "Cybersecurity Audit Project"
  };

  const difficulties = {
    intermediate: "Intermediate (Grade 11 level)",
    advanced: "Advanced (Complex systems)"
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
        grade: "Grade 11",
        deliverables: [],
        standards: [],
        technologies: []
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

  const addTechnology = (projectId, technology) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, technologies: [...project.technologies, technology] }
        : project
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "planning": return "#ffa500";
      case "design": return "#007bff";
      case "development": return "#28a745";
      case "testing": return "#ffc107";
      case "deployment": return "#dc3545";
      case "completed": return "#28a745";
      default: return "#6c757d";
    }
  };

  const projectTemplates = [
    {
      type: "web_development",
      title: "E-commerce Website",
      description: "Build a full-stack e-commerce platform with user authentication and payment integration"
    },
    {
      type: "mobile_app",
      title: "Task Management App",
      description: "Develop a cross-platform mobile app for personal task and project management"
    },
    {
      type: "database_design",
      title: "School Management System",
      description: "Design and implement a comprehensive database system for school administration"
    },
    {
      type: "network_setup",
      title: "Home Network Infrastructure",
      description: "Design and configure a secure home network with multiple devices and services"
    },
    {
      type: "cybersecurity_audit",
      title: "Network Security Assessment",
      description: "Conduct a comprehensive security audit of a computer network and provide recommendations"
    }
  ];

  const advancedTopics = [
    {
      subject: "Full-Stack Development",
      topics: ["Frontend frameworks", "Backend APIs", "Database integration", "Deployment strategies"]
    },
    {
      subject: "System Administration",
      topics: ["Server management", "Network configuration", "Security hardening", "Performance optimization"]
    },
    {
      subject: "Software Engineering",
      topics: ["Version control", "Testing methodologies", "Code review", "Documentation"]
    },
    {
      subject: "Emerging Technologies",
      topics: ["Cloud computing", "IoT integration", "Machine learning basics", "Blockchain concepts"]
    }
  ];

  return (
    <div className="custom-work-grade11">
      <h1>💻 Advanced ICT Custom Work</h1>
      <p>Create and manage advanced ICT projects for Grade 11 professional development.</p>

      <div className="advanced-topics">
        <h2>Advanced ICT Topics</h2>
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
        <h2>Project Templates</h2>
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
        <h2>Create New Project</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Project Name"
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
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <button onClick={createProject} className="create-btn">Create Project</button>
      </div>

      <div className="projects-list">
        <h2>Your Projects</h2>
        {projects.length === 0 ? (
          <p>No projects created yet. Start by creating your first advanced ICT project!</p>
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

              <div className="project-technologies">
                <h4>Technologies & Tools</h4>
                <div className="add-technology">
                  <input
                    type="text"
                    placeholder="Add technology (e.g., React, Node.js, MySQL, AWS)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        addTechnology(project.id, e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <div className="technologies-list">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
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
                <h4>Project Deliverables</h4>
                <div className="add-deliverable">
                  <input
                    type="text"
                    placeholder="Add deliverable (e.g., Source code, Documentation, Demo video)"
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
                <h4>Development Tasks & Milestones</h4>
                <div className="add-task">
                  <input
                    type="text"
                    placeholder="Add development task or milestone"
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
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="testing">Testing</option>
                  <option value="deployment">Deployment</option>
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
        <h2>Career Pathways in ICT</h2>
        <div className="careers-grid">
          <div className="career">
            <h4>Software Developer</h4>
            <p>Full-stack web and mobile application development</p>
            <ul>
              <li>Programming languages</li>
              <li>Framework expertise</li>
              <li>Version control</li>
            </ul>
          </div>
          <div className="career">
            <h4>Network Administrator</h4>
            <p>Network infrastructure design and management</p>
            <ul>
              <li>System administration</li>
              <li>Security implementation</li>
              <li>Troubleshooting</li>
            </ul>
          </div>
          <div className="career">
            <h4>Data Analyst</h4>
            <p>Data processing and business intelligence</p>
            <ul>
              <li>Database management</li>
              <li>Data visualization</li>
              <li>Statistical analysis</li>
            </ul>
          </div>
          <div className="career">
            <h4>Cybersecurity Specialist</h4>
            <p>Information security and threat protection</p>
            <ul>
              <li>Security protocols</li>
              <li>Risk assessment</li>
              <li>Incident response</li>
            </ul>
          </div>
          <div className="career">
            <h4>Cloud Architect</h4>
            <p>Cloud infrastructure design and deployment</p>
            <ul>
              <li>Cloud platforms</li>
              <li>Scalability design</li>
              <li>Cost optimization</li>
            </ul>
          </div>
          <div className="career">
            <h4>AI/ML Engineer</h4>
            <p>Artificial intelligence and machine learning</p>
            <ul>
              <li>Algorithm development</li>
              <li>Data processing</li>
              <li>Model deployment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomWork;