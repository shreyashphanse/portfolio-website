import { useEffect, useState } from "react";
import api from "../services/api";

function TechStack() {
  const [stack, setStack] = useState([]);

  useEffect(() => {
    const fetchStack = async () => {
      try {
        const res = await api.get("/site");

        if (res.data && res.data.techStack) {
          setStack(res.data.techStack);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStack();
  }, []);

  return (
    <section className="section">
      <h2>Tech Stack</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        {stack.map((tech, index) => (
          <span
            key={index}
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
    </section>
  );
}

export default TechStack;
