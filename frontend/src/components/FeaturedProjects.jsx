import { useEffect, useState } from "react";
import api from "../services/api";

function FeaturedProjects() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/posts");

        const highlighted = res.data.filter(
          (post) => post.type === "project" && post.highlight === true,
        );

        setFeatured(highlighted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section id="featured">
      <h2>Featured Projects</h2>

      {featured.length === 0 ? (
        <p>No featured projects yet.</p>
      ) : (
        featured.map((project) => (
          <div key={project._id} className="card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

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

export default FeaturedProjects;
