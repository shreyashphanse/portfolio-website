import { useState } from "react";
import api from "../services/api";

function PostPage() {
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    type: "project",
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    highlight: false,
    status: "completed",
    image: null,
  });
  const handleImage = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data;

      if (form.type === "achievement") {
        data = new FormData();

        data.append("type", form.type);
        data.append("title", form.title);
        data.append("description", form.description);
        data.append("githubLink", form.githubLink || "");

        if (form.image) {
          data.append("image", form.image);
        }
      } else {
        data = { ...form };
        data.techStack = form.techStack.split(",");
      }
      if (form.type === "project") {
        data.techStack = form.techStack.split(",");
      } else {
        delete data.techStack;
        delete data.githubLink;
        delete data.liveLink;
        delete data.status;
      }

      await api.post("/posts", data, {
        headers: {
          password: password,
        },
      });

      alert("Post created successfully");

      setForm({
        type: "project",
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
        highlight: false,
        status: "completed",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="container">
      <h1>Create Post</h1>

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="section">
        <br />

        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="project"
              checked={form.type === "project"}
              onChange={handleChange}
            />
            Project
          </label>

          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="type"
              value="achievement"
              checked={form.type === "achievement"}
              onChange={handleChange}
            />
            Achievement
          </label>
        </div>

        <br />

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <br />

        {form.type === "project" && (
          <>
            <input
              name="techStack"
              placeholder="Tech stack (comma separated)"
              value={form.techStack}
              onChange={handleChange}
            />

            <br />

            <input
              name="githubLink"
              placeholder="GitHub Link"
              value={form.githubLink}
              onChange={handleChange}
            />

            <br />

            <input
              name="liveLink"
              placeholder="Live Link"
              value={form.liveLink}
              onChange={handleChange}
            />

            <br />

            <label>
              Highlight
              <input
                type="checkbox"
                name="highlight"
                checked={form.highlight}
                onChange={handleChange}
              />
            </label>

            <br />

            <select name="status" value={form.status} onChange={handleChange}>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
            </select>

            <br />
          </>
        )}

        {form.type === "achievement" && (
          <>
            <input
              style={{ background: "#fff" }}
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            <br />

            <input
              name="githubLink"
              placeholder="GitHub Link (optional)"
              value={form.githubLink}
              onChange={handleChange}
            />

            <br />
          </>
        )}

        <br />
        <br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default PostPage;
