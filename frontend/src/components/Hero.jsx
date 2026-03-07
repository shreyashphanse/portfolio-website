import { useEffect, useState } from "react";
import api from "../services/api";

function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get("/site");
        setHero(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHero();
  }, []);

  if (!hero) return null;

  return (
    <section className="section">
      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
        {hero.heroTitle}
      </h1>

      <p style={{ fontSize: "18px", color: "#555" }}>{hero.heroSubtitle}</p>

      <p style={{ maxWidth: "600px", marginTop: "10px", color: "#666" }}>
        {hero.heroDescription}
      </p>

      <div style={{ marginTop: "20px" }}>
        {hero.github && (
          <a href={hero.github} target="_blank" rel="noreferrer">
            <button>GitHub</button>
          </a>
        )}

        {hero.linkedin && (
          <a
            href={hero.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: "10px" }}
          >
            <button>LinkedIn</button>
          </a>
        )}
      </div>
    </section>
  );
}

export default Hero;
