import { useEffect, useState } from "react";
import api from "../services/api";

function TechStack() {
  const [stack, setStack] = useState({});

  useEffect(() => {
    const fetchStack = async () => {
      try {
        const res = await api.get("/site");

        if (res.data?.techStack) {
          setStack(res.data.techStack);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStack();
  }, []);

  // Hide section if empty
  if (
    !stack ||
    Object.keys(stack).length === 0 ||
    Object.values(stack).every((techs) => techs.length === 0)
  ) {
    return null;
  }

  return (
    <section className="section">
      <h2>Tech Stack</h2>

      {Object.entries(stack).map(([category, techs]) => {
        if (!techs.length) return null;

        return (
          <div key={category} style={{ marginTop: "20px" }}>
            <h3
              style={{
                marginBottom: "12px",
                fontSize: "18px",
              }}
            >
              {category}
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {techs.map((tech) => (
                <span
                  key={tech}
                  style={{
                    border: "1px solid #e9e9e9",
                    background: "#e0e0e0",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default TechStack;
