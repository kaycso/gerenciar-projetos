import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Button from "../components/ui/Button";
import { Link, useLocation } from "react-router";
import Notification from "../components/Notification";
import Loading from "../components/Loading";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const [notification, setNotification] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.notification) {
      setNotification(location.state.notification);
      setTimeout(() => setNotification(null), 5000);
    }
  }, [location.state]);

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id));
        setNotification("Projeto Removido com Sucesso!");
        setTimeout(() => setNotification(null), 5000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {notification && <Notification msg={notification} />}
      <section className="mx-12 flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Meus Projetos</h1>
          <Link to="/newproject">
            <Button>Criar Projeto</Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 rounded">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category}
                handleRemove={removeProject}
              />
            ))
          ) : (
            <p>Não há nenhum projeto cadastrado</p>
          )}
          {!removeLoading && <Loading />}
        </div>
      </section>
    </>
  );
};

export default Projects;
