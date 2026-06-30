import { useEffect, useState } from "react";
import api from "../services/api";
function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get("/posts");

        const achievementPosts = res.data.filter(
          (post) => post.type === "achievement",
        );

        setAchievements(achievementPosts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAchievements();
  }, []);
  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <section id="achievements">
      <h2>Achievements</h2>
      {achievements.map((ach) => (
        <div
          key={ach._id}
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedAchievement(ach)}
        >
          <h3>{ach.title}</h3>
          {ach.image && (
            <img
              src={`https://portfolio-backend-t60l.onrender.com${ach.image}`}
              alt="achievement"
              style={{
                maxWidth: "40%",
                borderRadius: "6px",
                display: "block",
                margin: "15px auto",
              }}
            />
          )}
          <p
            style={{
              marginTop: "10px",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-line",
            }}
          >
            {" "}
            {ach.description.length > 120
              ? ach.description.slice(0, 120) + "..."
              : ach.description}
          </p>{" "}
        </div>
      ))}
      ),
      {selectedAchievement && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: "600px",
              width: "90%",
              background: "white",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedAchievement.title}</h2>

            {selectedAchievement.image && (
              <img
                src={`https://portfolio-backend-t60l.onrender.com${selectedAchievement.image}`}
                alt="achievement"
                style={{
                  width: "100%",
                  marginTop: "15px",
                  borderRadius: "6px",
                  display: "block",
                }}
              />
            )}

            <p
              style={{
                marginTop: "15px",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-line",
              }}
            >
              {" "}
              {selectedAchievement.description}
            </p>

            <button
              style={{ marginTop: "20px" }}
              onClick={() => setSelectedAchievement(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Achievements;
