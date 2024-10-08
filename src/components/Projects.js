import React from 'react';
import projectsData from '../data/projects.json';

function Projects() {
  if (projectsData.length === 0) {
    return null;
  }
  return (
    <section id="projects">
      <h2>Projects</h2>
      {projectsData.map((project, index) => (
        <div className="entry" key={index}>
          <div className="entry-content">
            <h3 className="entry-title">{project.name}</h3>
            {project.description && <p className="entry-description">{project.description}</p>}
            {project.technologies && <p className="entry-subtitle">Technologies: {project.technologies}</p>}
            {project.link && (
              <p className="entry-description">
                <strong>Website:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link.replace(/^https?:\/\//, '')}</a>
              </p>
            )}
            {project.code && (
              <p className="entry-description">
                <strong>Source code:</strong> <a href={project.code} target="_blank" rel="noopener noreferrer">{project.code.replace(/^https?:\/\//, '')}</a>
              </p>
            )}
          </div>

        </div>
      ))}
    </section>
  );
}

export default Projects;