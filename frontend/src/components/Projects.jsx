import { useEffect, useState } from "react";
import api from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/posts");

        const projectPosts = res.data.filter(
          (post) => post.type === "project" && post.highlight !== true,
        );

        setProjects(projectPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects">
      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        projects.map((project) => (
          <div key={project._id} className="card">
            {" "}
            <h3>{project.title}</h3>
            <p
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-line",
              }}
            >
              {project.description}
            </p>{" "}
            <div style={{ marginTop: "10px" }}>
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer">
                  <button>GitHub</button>
                </a>
              )}

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: "10px" }}
                >
                  <button>Live</button>
                </a>
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default Projects;
