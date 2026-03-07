import { useEffect, useState } from "react";
import api from "../services/api";

function EditPage() {
  const [posts, setPosts] = useState([]);
  const [password, setPassword] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  const loadPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: { password },
      });

      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/posts/${editingPost._id}`, editingPost, {
        headers: { password },
      });

      setEditingPost(null);
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="container">
      <h1>Edit Posts</h1>

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* EDIT FORM */}
      {editingPost && (
        <form onSubmit={updatePost} className="section">
          <h3>Edit Post</h3>

          {/* TYPE SELECTOR */}
          <select
            value={editingPost.type}
            onChange={(e) =>
              setEditingPost({ ...editingPost, type: e.target.value })
            }
          >
            <option value="project">Project</option>
            <option value="achievement">Achievement</option>
          </select>

          <br />
          <br />

          {/* TITLE */}
          <input
            placeholder="Title"
            value={editingPost.title}
            onChange={(e) =>
              setEditingPost({ ...editingPost, title: e.target.value })
            }
          />

          <br />
          <br />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={editingPost.description}
            onChange={(e) =>
              setEditingPost({ ...editingPost, description: e.target.value })
            }
          />

          <br />
          <br />

          {/* PROJECT FIELDS */}
          {editingPost.type === "project" && (
            <>
              <input
                placeholder="Tech Stack (comma separated)"
                value={editingPost.techStack?.join(", ") || ""}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    techStack: e.target.value.split(",").map((t) => t.trim()),
                  })
                }
              />

              <br />
              <br />

              <input
                placeholder="GitHub Link"
                value={editingPost.githubLink || ""}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    githubLink: e.target.value,
                  })
                }
              />

              <br />
              <br />

              <input
                placeholder="Live Link"
                value={editingPost.liveLink || ""}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    liveLink: e.target.value,
                  })
                }
              />

              <br />
              <br />

              <label>
                Highlight
                <input
                  type="checkbox"
                  checked={editingPost.highlight || false}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      highlight: e.target.checked,
                    })
                  }
                />
              </label>

              <br />
              <br />

              <select
                value={editingPost.status || "completed"}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    status: e.target.value,
                  })
                }
              >
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>

              <br />
              <br />
            </>
          )}

          {/* ACHIEVEMENT FIELDS */}
          {editingPost.type === "achievement" && (
            <>
              <input
                placeholder="Achievement Image URL"
                value={editingPost.image || ""}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    image: e.target.value,
                  })
                }
              />

              <br />
              <br />

              <input
                placeholder="GitHub Link (optional)"
                value={editingPost.githubLink || ""}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    githubLink: e.target.value,
                  })
                }
              />

              <br />
              <br />
            </>
          )}

          <button type="submit">Update</button>
        </form>
      )}

      {/* POSTS LIST */}
      <div className="section">
        {posts.map((post) => (
          <div key={post._id} className="card">
            <h3>{post.title}</h3>
            <p
              style={{
                marginTop: "10px",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-line",
              }}
            >
              {post.description}
            </p>

            <button onClick={() => setEditingPost(post)}>Edit</button>

            <button
              onClick={() => deletePost(post._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditPage;
