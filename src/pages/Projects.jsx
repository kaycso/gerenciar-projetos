import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Button from "../components/ui/Button";
import { Link } from "react-router";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="mx-12 flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Meus Projetos</h1>
        <Link to="/newproject">
          <Button>Criar Projeto</Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 rounded">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            budget={project.budget}
            category={project.category}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
