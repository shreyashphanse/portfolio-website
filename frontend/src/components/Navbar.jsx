function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 0",
        borderBottom: "1px solid #eee",
        marginBottom: "40px",
      }}
    >
      <strong>
        {" "}
        <span></span>
      </strong>

      <div style={{ display: "flex", gap: "10px" }}>
        <a href="#projects" className="btn">
          Projects
        </a>

        <a href="#achievements" className="btn">
          Achievements
        </a>

        <a href="#contact" className="btn">
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
