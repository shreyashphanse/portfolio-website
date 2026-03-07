import { useEffect, useState } from "react";
import api from "../services/api";

function SettingsPage() {
  const [password, setPassword] = useState("");
  const [newTech, setNewTech] = useState("");
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

  const addTech = () => {
    if (!newTech.trim()) return;

    const updated = [
      ...site.techStack.split(", ").filter(Boolean),
      newTech.trim(),
    ];

    setSite({
      ...site,
      techStack: updated.join(", "),
    });

    setNewTech("");
  };

  const removeTech = () => {
    if (!newTech.trim()) return;

    const updated = site.techStack
      .split(", ")
      .filter((t) => t.toLowerCase() !== newTech.trim().toLowerCase());

    setSite({
      ...site,
      techStack: updated.join(", "),
    });

    setNewTech("");
  };

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const res = await api.get("/site");

        if (res.data) {
          setSite({
            ...res.data,
            techStack: res.data.techStack?.join(", ") || "",
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
        techStack: site.techStack.split(",").map((t) => t.trim()),
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

        <input
          placeholder="Tech name (React, Node, etc)"
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <button type="button" onClick={addTech}>
            Add
          </button>

          <button
            type="button"
            onClick={removeTech}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
        </div>

        <p style={{ marginTop: "10px", color: "#555" }}>
          Current: {site.techStack}
        </p>

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

        <button type="submit">Update Site</button>
      </form>
    </div>
  );
}

export default SettingsPage;
