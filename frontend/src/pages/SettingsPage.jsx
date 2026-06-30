import { useEffect, useState } from "react";
import api from "../services/api";

function SettingsPage() {
  const [password, setPassword] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newTech, setNewTech] = useState({});
  const [resume, setResume] = useState(null);
  const [site, setSite] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    aboutText: "",
    techStack: "",
    email: "",
    github: "",
    linkedin: "",
  });

  const uploadResume = async () => {
    if (!resume) return;

    const formData = new FormData();

    formData.append("resume", resume);

    await api.post("/site/resume", formData, {
      headers: {
        password,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Resume uploaded");
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;

    if (site.techStack[newCategory]) return;

    setSite({
      ...site,
      techStack: {
        ...site.techStack,
        [newCategory]: [],
      },
    });

    setNewCategory("");
  };

  const deleteCategory = (category) => {
    const updated = { ...site.techStack };

    delete updated[category];

    setSite({
      ...site,
      techStack: updated,
    });
  };

  const addTechnology = (category, tech) => {
    if (!tech.trim()) return;

    setSite({
      ...site,
      techStack: {
        ...site.techStack,
        [category]: [...site.techStack[category], tech],
      },
    });

    setNewTech({
      ...newTech,
      [category]: "",
    });
  };

  const removeTechnology = (category, tech) => {
    setSite({
      ...site,
      techStack: {
        ...site.techStack,
        [category]: site.techStack[category].filter((t) => t !== tech),
      },
    });
  };

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const res = await api.get("/site");

        if (res.data) {
          setSite({
            ...res.data,
            techStack: res.data.techStack || {
              Frontend: [],
              Backend: [],
              Database: [],
              Languages: [],
              Tools: [],
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSite();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...site,
        techStack: site.techStack,
      };

      await api.put("/site", data, {
        headers: { password },
      });

      alert("Site updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="container">
      <h1>Site Settings</h1>

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="section">
        <h3>Hero Section</h3>

        <input
          placeholder="Hero Title"
          value={site.heroTitle}
          onChange={(e) => setSite({ ...site, heroTitle: e.target.value })}
        />

        <br />
        <br />

        <input
          placeholder="Hero Subtitle"
          value={site.heroSubtitle}
          onChange={(e) => setSite({ ...site, heroSubtitle: e.target.value })}
        />

        <br />
        <br />

        <textarea
          placeholder="Hero Description"
          value={site.heroDescription}
          onChange={(e) =>
            setSite({ ...site, heroDescription: e.target.value })
          }
        />

        <br />
        <br />

        <h3>About</h3>

        <textarea
          placeholder="About Text"
          value={site.aboutText}
          onChange={(e) => setSite({ ...site, aboutText: e.target.value })}
        />

        <br />
        <br />

        <h3>Tech Stack</h3>

        {Object.entries(site.techStack).map(([category, techs]) => (
          <div
            key={category}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4>{category}</h4>

              <button
                type="button"
                onClick={() => deleteCategory(category)}
                style={{ background: "#c0392b" }}
              >
                Delete Category
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {techs.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: "#e5e5e5",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {tech}

                  <button
                    type="button"
                    onClick={() => removeTechnology(category, tech)}
                    style={{
                      background: "transparent",
                      color: "red",
                      padding: 0,
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <input
              placeholder="New Technology"
              value={newTech[category] || ""}
              onChange={(e) =>
                setNewTech({
                  ...newTech,
                  [category]: e.target.value,
                })
              }
            />

            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={() => addTechnology(category, newTech[category] || "")}
            >
              Add
            </button>
          </div>
        ))}

        <div
          style={{
            border: "1px dashed #999",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Add Category</h4>

          <input
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <button
            type="button"
            style={{ marginLeft: "10px" }}
            onClick={addCategory}
          >
            Add Category
          </button>
        </div>

        <br />
        <br />

        <h3>Contact</h3>

        <input
          placeholder="Email"
          value={site.email}
          onChange={(e) => setSite({ ...site, email: e.target.value })}
        />

        <br />
        <br />

        <input
          placeholder="GitHub URL"
          value={site.github}
          onChange={(e) => setSite({ ...site, github: e.target.value })}
        />

        <br />
        <br />

        <input
          placeholder="LinkedIn URL"
          value={site.linkedin}
          onChange={(e) => setSite({ ...site, linkedin: e.target.value })}
        />

        <br />
        <br />

        <h3>Resume</h3>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <br />
        <br />

        <button type="button" onClick={uploadResume}>
          Upload Resume
        </button>
        <button type="submit">Update Site</button>
      </form>
    </div>
  );
}

export default SettingsPage;
