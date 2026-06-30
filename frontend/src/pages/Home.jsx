import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";

function Home() {
  return (
    <div className="container">
      <Navbar />
      <Hero />
      <About />
      <TechStack />

      <div style={{ marginTop: "50px" }}>
        <Projects />
      </div>
      <div style={{ marginTop: "50px" }}>
        <Achievements />
      </div>
      <div style={{ marginTop: "50px" }}>
        <Contact />
      </div>
    </div>
  );
}

export default Home;
